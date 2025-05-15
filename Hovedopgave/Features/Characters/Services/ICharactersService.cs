using Hovedopgave.Core.Results;
using Hovedopgave.Features.Characters.DTOs;

namespace Hovedopgave.Features.Characters.Services;

public interface ICharactersService
{
    Task<Result<string>> CreateCharacter(CreateCharacterDto createCharacterDto);
    Task<Result<List<CharacterDto>>> GetCharactersForCampaign(string campaignId);
    Task<Result<string>> UpdateCharacter(CharacterDto characterDto);
    Task<Result<string>> DeleteCharacter(string characterId);
    Task<Result<string>> RetireCharacter(string characterId);
}