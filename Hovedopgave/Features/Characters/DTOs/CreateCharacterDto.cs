using Hovedopgave.Features.Characters.Models;

namespace Hovedopgave.Features.Characters.DTOs;

public record CreateCharacterDto
{
    public required string Name { get; init; }
    public required CharacterRace Race { get; init; }
    public required CharacterClass Class { get; init; }
    public required string Backstory { get; init; }
    public required string UserId { get; init; }
    public required string CampaignId { get; init; }
    public string? PhotoId { get; init; }
}