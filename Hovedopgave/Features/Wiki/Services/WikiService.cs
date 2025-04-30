using AutoMapper;
using Ganss.Xss;
using Hovedopgave.Core.Data;
using Hovedopgave.Core.Results;
using Hovedopgave.Core.Services;
using Hovedopgave.Features.Wiki.DTOs;
using Hovedopgave.Features.Wiki.Models;
using Microsoft.EntityFrameworkCore;

namespace Hovedopgave.Features.Wiki.Services;

public class WikiService(
    AppDbContext context,
    IUserAccessor userAccessor,
    IMapper mapper) : IWikiService
{
    public async Task<Result<string>> CreateWikiEntry(CreateWikiEntryDto wikiEntryDto)
    {
        var user = await userAccessor.GetUserAsync();

        var campaign = await context.Campaigns
            .Where(x => x.Id == wikiEntryDto.CampaignId && x.DungeonMaster.Id == user.Id)
            .Include(x => x.Users)
            .FirstOrDefaultAsync();

        if (campaign == null)
        {
            return Result<string>.Failure("Failed to find campaign with id or you are not the DM", 400);
        }


        var sanitizer = new HtmlSanitizer();
        wikiEntryDto.Content = sanitizer.Sanitize(wikiEntryDto.Content);

        var entry = mapper.Map<WikiEntry>(wikiEntryDto);

        entry.Campaign = campaign;

        if (!string.IsNullOrEmpty(wikiEntryDto.PhotoId))
        {
            var photo = await context.Photos
                .Where(x => x.Id == wikiEntryDto.PhotoId)
                .FirstOrDefaultAsync();
            if (photo != null)
            {
                entry.Photo = photo;
            }
        }

        await context.WikiEntries.AddAsync(entry);

        var result = await context.SaveChangesAsync() > 0;

        return !result
            ? Result<string>.Failure("Failed to create wiki entry", 400)
            : Result<string>.Success(entry.Id);
    }

    public async Task<Result<List<WikiEntryDto>>> GetWikiEntriesForCampaign(string campaignId)
    {
        var user = await userAccessor.GetUserAsync();

        var campaign = await context.Campaigns
            .Where(x => x.Id == campaignId)
            .FirstOrDefaultAsync();

        if (campaign == null)
        {
            return Result<List<WikiEntryDto>>.Failure($"Failed to find campaign with id: {campaignId}", 404);
        }

        var wikiEntries = await context.WikiEntries
            .Where(x => x.CampaignId == campaignId)
            .Include(x => x.Photo)
            .ToListAsync();

        return Result<List<WikiEntryDto>>.Success(mapper.Map<List<WikiEntryDto>>(wikiEntries));
    }

    public async Task<Result<string>> DeleteWikiEntry(string wikiEntryId)
    {
        var user = await userAccessor.GetUserAsync();

        var entry = await context.WikiEntries
            .Include(x => x.Campaign.DungeonMaster)
            .Where(x => x.Id == wikiEntryId)
            .FirstOrDefaultAsync();

        if (entry == null)
        {
            return Result<string>.Failure("Failed to find wiki entry", 404);
        }

        if (entry.Campaign.DungeonMaster.Id != user.Id)
        {
            return Result<string>.Failure("Only the DM can delete wiki entries", 403);
        }

        context.WikiEntries.Remove(entry);

        var result = await context.SaveChangesAsync() > 0;

        return !result
            ? Result<string>.Failure("Failed to delete wiki entry", 400)
            : Result<string>.Success(entry.Id);
    }
}