using Hovedopgave.Core.Controllers;
using Hovedopgave.Features.Campaign.DTOs;
using Hovedopgave.Features.Campaign.Services;
using Microsoft.AspNetCore.Mvc;

namespace Hovedopgave.Features.Campaign;

public class CampaignsController(ICampaignService campaignService) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<CampaignDto>>> GetAllUserCampaigns()
    {
        var campaigns = await campaignService.GetAllUserCampaigns();

        if (campaigns.Count == 0)
        {
            return NoContent();
        }

        return Ok(campaigns);
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<CampaignDto>> GetCampaign(string id)
    {
        var result = await campaignService.GetCampaign(id);

        if (!result.IsSuccess)
        {
            return NotFound(result.Error);
        }

        return Ok(result.Value);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<string>> DeleteCampaign(string id)
    {
        var result = await campaignService.DeleteCampaign(id);

        if (!result.IsSuccess)
        {
            return NotFound(result.Error);
        }

        return Ok(result.Value);
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

    [HttpPost("{id}/pins")]
    public async Task<IActionResult> SetCampaignMapPins(string id, [FromBody] List<MapPinDto> pins)
    {
        var result = await campaignService.SetCampaignMapPins(id, pins);

        if (!result.IsSuccess)
        {
            return NotFound(result.Error);
        }

        return Ok(result.Value);
    }

    [HttpPost("{campaignId}/add-player")]
    public async Task<ActionResult<string>> AddPlayerToCampaign(string campaignId,
        [FromBody] AddPlayerToCampaignDto player)
    {
        var result = await campaignService.AddPlayerToCampaign(campaignId, player);

        if (!result.IsSuccess)
        {
            return NotFound(result.Error);
        }

        return Ok(result.Value);
    }
}