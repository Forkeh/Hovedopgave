using Hovedopgave.Core.Controllers;
using Hovedopgave.Features.Campaign.Services;
using Microsoft.AspNetCore.Mvc;

namespace Hovedopgave.Features.Campaign;

public class CampaignsController(ICampaignService campaignService) : BaseApiController
{
    [HttpGet]
    public async Task<IActionResult> GetUserCampaigns()
    {
        var campaigns = await campaignService.GetUserCampaigns();

        if (campaigns.Count == 0)
        {
            return NoContent();
        }
        
        return Ok(campaigns);
    }
}