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

        var campaigns = await context.Campaigns
            .Where(x => x.DungeonMasterId == user.Id)
            .ProjectTo<CampaignDto>(mapper.ConfigurationProvider)
            .ToListAsync();

        return campaigns;
    }
}