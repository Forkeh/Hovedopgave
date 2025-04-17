using Hovedopgave.Core.Controllers;
using Hovedopgave.Features.Campaign.DTOs;
using Hovedopgave.Features.Campaign.Services;
using Microsoft.AspNetCore.Mvc;

namespace Hovedopgave.Features.Campaign;

public class CampaignsController(ICampaignService campaignService) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<CampaignDto>>> GetUserCampaigns()
    {
        var campaigns = await campaignService.GetUserCampaigns();

        if (campaigns.Count == 0)
        {
            return NoContent();
        }

        return Ok(campaigns);
    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateCampaign([FromBody] CreateCampaignDto campaign)
    {
        var result = await campaignService.CreateCampaign(campaign);

        if (!result.IsSuccess)
        {
            return BadRequest(result.Error);
        }

        return Ok(result.Value);
    }
}