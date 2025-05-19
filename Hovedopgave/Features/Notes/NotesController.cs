using Hovedopgave.Core.Controllers;
using Hovedopgave.Features.Notes.DTOs;
using Hovedopgave.Features.Notes.Services;
using Microsoft.AspNetCore.Mvc;

namespace Hovedopgave.Features.Notes;

public class NotesController(INotesService notesService) : BaseApiController
{
    [HttpGet("{campaignId}")]
    public async Task<ActionResult<NoteDto>> GetCampaignNotesForUser(string campaignId)
    {
        var result = await notesService.GetCampaignNotesForUser(campaignId);

        if (!result.IsSuccess)
        {
            return BadRequest(result.Error);
        }

        return Ok(result.Value);
    }

    [HttpPut]
    public async Task<ActionResult<NoteDto>> UpdateCampaignNotesForUser(NoteDto notesDto)
    {
        var result = await notesService.UpdateCampaignNotesForUser(notesDto);

        if (!result.IsSuccess)
        {
            return BadRequest(result.Error);
        }

        return Ok(result.Value);
    }
}