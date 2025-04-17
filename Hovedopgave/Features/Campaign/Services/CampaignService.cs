using AutoMapper;
using AutoMapper.QueryableExtensions;
using Hovedopgave.Core.Data;
using Hovedopgave.Core.Results;
using Hovedopgave.Core.Services;
using Hovedopgave.Features.Campaign.DTOs;
using Microsoft.EntityFrameworkCore;

namespace Hovedopgave.Features.Campaign.Services;

public class CampaignService(AppDbContext context, IUserAccessor userAccessor, IMapper mapper) : ICampaignService
{
    public async Task<List<CampaignDto>> GetUserCampaigns()
    {
        var user = await userAccessor.GetUserAsync();

        var campaigns = await context.Campaigns
            .Where(x => x.DungeonMaster.Id == user.Id || x.Users.Any(u => u.Id == user.Id))
            .ProjectTo<CampaignDto>(mapper.ConfigurationProvider)
            .ToListAsync();

        return campaigns;
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
}