using Hovedopgave.Core.Results;
using Hovedopgave.Features.Characters.DTOs;

namespace Hovedopgave.Features.Characters.Services;

public interface ICharactersService
{
    Task<Result<string>> CreateCharacter(CreateCharacterDto createCharacterDto);
}