﻿using Hovedopgave.Core.Controllers;
using Hovedopgave.Features.Wiki.DTOs;
using Hovedopgave.Features.Wiki.Services;
using Microsoft.AspNetCore.Mvc;

namespace Hovedopgave.Features.Wiki;

public class WikiController(IWikiService wikiService) : BaseApiController
{
    [HttpPost]
    public async Task<ActionResult<string>> CreateWikiEntry([FromBody] CreateWikiEntryDto wikiEntryDto)
    {
        var result = await wikiService.CreateWikiEntry(wikiEntryDto);

        if (!result.IsSuccess)
        {
            return BadRequest(result.Error);
        }

        return Ok(result.Value);
    }

    [HttpGet("campaign/{campaignId}")]
    public async Task<ActionResult<List<WikiEntryDto>>> GetWikiEntriesForCampaign(string campaignId)
    {
        var result = await wikiService.GetWikiEntriesForCampaign(campaignId);

        if (!result.IsSuccess)
        {
            return BadRequest(result.Error);
        }

        return Ok(result.Value);
    }

    [HttpDelete("{wikiEntryId}")]
    public async Task<ActionResult<string>> DeleteWikiEntry(string wikiEntryId)
    {
        var result = await wikiService.DeleteWikiEntry(wikiEntryId);

        if (!result.IsSuccess)
        {
            return BadRequest(result.Error);
        }

        return Ok(result.Value);
    }
}