using AutoMapper;
using AutoMapper.QueryableExtensions;
using Hovedopgave.Core.Data;
using Hovedopgave.Core.Results;
using Hovedopgave.Core.Services;
using Hovedopgave.Features.Campaign.DTOs;
using Hovedopgave.Features.Campaign.Models;
using Microsoft.EntityFrameworkCore;

namespace Hovedopgave.Features.Campaign.Services;

public class CampaignService(AppDbContext context, IUserAccessor userAccessor, IMapper mapper) : ICampaignService
{
    public async Task<List<CampaignDto>> GetAllUserCampaigns()
    {
        var user = await userAccessor.GetUserAsync();

        var campaigns = await context.Campaigns
            .Where(x => x.DungeonMaster.Id == user.Id || x.Users.Any(u => u.Id == user.Id))
            .ProjectTo<CampaignDto>(mapper.ConfigurationProvider)
            .ToListAsync();

        return campaigns;
    }

    public async Task<Result<CampaignDto>> GetCampaign(string id)
    {
        var user = await userAccessor.GetUserAsync();

        var result = await context.Campaigns
            .Where(x => x.Id == id && (x.DungeonMaster.Id == user.Id || x.Users.Any(u => u.Id == user.Id)))
            .ProjectTo<CampaignDto>(mapper.ConfigurationProvider)
            .FirstOrDefaultAsync();

        return result == null
            ? Result<CampaignDto>.Failure($"Failed to find campaign with id: {id} (or you are not DM/player)", 400)
            : Result<CampaignDto>.Success(result);
    }

    public async Task<Result<string>> CreateCampaign(CreateCampaignDto campaign)
    {
        var user = await userAccessor.GetUserAsync();

        var newCampaign = mapper.Map<Models.Campaign>(campaign);
        newCampaign.DungeonMaster = user;

        await context.Campaigns.AddAsync(newCampaign);

        var result = await context.SaveChangesAsync() > 0;

        return !result
            ? Result<string>.Failure("Failed to create the campaign", 400)
            : Result<string>.Success($"New campaign Id: {newCampaign.Id}, DM: {newCampaign.DungeonMaster.DisplayName}");
    }


    public async Task<Result<string>> SetCampaignMapPins(string campaignId, List<MapPinDto> pins)
    {
        var user = await userAccessor.GetUserAsync();

        var campaign = await context.Campaigns
            .Where(x => x.Id == campaignId && x.DungeonMaster.Id == user.Id)
            .FirstOrDefaultAsync();

        if (campaign == null)
        {
            return Result<string>.Failure("Failed to find campaign with id or you are not the DM: " + campaignId,
                400);
        }

        var existingPins = await context.MapPins
            .Where(x => x.CampaignId == campaignId)
            .ToListAsync();

        foreach (var pin in pins)
        {
            var existingPin = existingPins.FirstOrDefault(x => x.Id == pin.Id);
            if (existingPin != null)
            {
                existingPin.Title = pin.Title;
                existingPin.Description = pin.Description;
                existingPin.PositionX = pin.PositionX;
                existingPin.PositionY = pin.PositionY;
            }
            else
            {
                var newPin = mapper.Map<MapPin>(pin);
                newPin.CampaignId = campaignId;
                await context.MapPins.AddAsync(newPin);
            }
        }

        foreach (var pin in existingPins)
        {
            if (pins.All(x => x.Id != pin.Id))
            {
                context.MapPins.Remove(pin);
            }
        }

        var result = await context.SaveChangesAsync() > 0;

        if (!result)
        {
            return Result<string>.Failure("Failed to save map pins", 400);
        }


        return Result<string>.Success("Map pins saved successfully");
    }
}