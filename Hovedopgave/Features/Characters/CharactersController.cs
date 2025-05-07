using Hovedopgave.Core.Controllers;
using Hovedopgave.Features.Characters.DTOs;
using Hovedopgave.Features.Characters.Services;
using Microsoft.AspNetCore.Mvc;

namespace Hovedopgave.Features.Characters;

public class CharactersController(ICharactersService charactersService) : BaseApiController
{
    [HttpPost]
    public async Task<ActionResult<string>> CreateCharacter([FromBody] CreateCharacterDto createCharacterDto)
    {
        var result = await charactersService.CreateCharacter(createCharacterDto);

        if (!result.IsSuccess)
        {
            return BadRequest(result.Error);
        }

        return Ok(result.Value);
    }

    [HttpGet("campaign/{campaignId}")]
    public async Task<ActionResult<List<CharacterDto>>> GetCharactersForCampaign(string campaignId)
    {
        var result = await charactersService.GetCharactersForCampaign(campaignId);

        if (!result.IsSuccess)
        {
            return BadRequest(result.Error);
        }

        return Ok(result.Value);
    }

    [HttpPut]
    public async Task<ActionResult<string>> UpdateCharacter([FromBody] CharacterDto characterDto)
    {
        var result = await charactersService.UpdateCharacter(characterDto);

        if (!result.IsSuccess)
        {
            return BadRequest(result.Error);
        }

        return Ok(result.Value);
    }

    [HttpDelete("{characterId}")]
    public async Task<ActionResult<string>> DeleteCharacter(string characterId)
    {
        var result = await charactersService.DeleteCharacter(characterId);

        if (!result.IsSuccess)
        {
            return BadRequest(result.Error);
        }

        return Ok(result.Value);
    }
}