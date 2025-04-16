using AutoMapper;
using AutoMapper.QueryableExtensions;
using Hovedopgave.Core.Data;
using Hovedopgave.Core.Services;
using Microsoft.EntityFrameworkCore;

namespace Hovedopgave.Features.Campaign.Services;

public class CampaignService(AppDbContext context, IUserAccessor userAccessor, IMapper mapper) : ICampaignService
{
    public async Task<List<CampaignDto>> GetUserCampaigns()
    {
        var user = await userAccessor.GetUserAsync();
        
        // First check if any campaigns exist at all
        var allCampaigns = await context.Campaigns.ToListAsync();
        Console.WriteLine($"Total campaigns: {allCampaigns.Count}");

// Then check if your DungeonMaster relationship is working correctly
        var dmCampaigns = await context.Campaigns
            .Include(x => x.DungeonMaster)
            .ToListAsync();

        foreach (var campaign in dmCampaigns)
        {
            Console.WriteLine($"Campaign: {campaign.Name}, DM: {campaign.DungeonMaster?.Id ?? "null"}");
        }

        var campaigns = await context.Campaigns
            .Where(x => x.DungeonMaster.Id == user.Id)
            .ProjectTo<CampaignDto>(mapper.ConfigurationProvider)
            .ToListAsync();

        return campaigns;
    }
}