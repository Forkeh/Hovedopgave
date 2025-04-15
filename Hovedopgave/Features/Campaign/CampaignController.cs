using Hovedopgave.Core.Controllers;
using Hovedopgave.Features.Campaign.Services;
using Microsoft.AspNetCore.Mvc;

namespace Hovedopgave.Features.Campaign;

public class CampaignController(ICampaignService campaignService) : BaseApiController
{
    private readonly ICampaignService _campaignService = campaignService;

    [HttpGet("user")]
    public async Task<IActionResult> GetUserCampaigns()
    {
        var campaigns = await _campaignService.GetUserCampaigns();

        if (campaigns.Count == 0)
        {
            return NoContent();
        }
        
        return Ok(campaigns);
    }
}