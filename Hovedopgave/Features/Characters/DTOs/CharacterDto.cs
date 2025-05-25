using Hovedopgave.Features.Characters.Models;
using Hovedopgave.Features.Photos.Models;

namespace Hovedopgave.Features.Characters.DTOs;

public record CharacterDto
{
    public required string Id { get; init; }
    public required string Name { get; init; }
    public required CharacterRace Race { get; init; }
    public required CharacterClass Class { get; init; }
    public required string Backstory { get; init; }
    public required bool IsRetired { get; init; }
    public required string CampaignId { get; init; }
    public required string UserId { get; init; }

    public string? PhotoId { get; init; }
    public Photo? Photo { get; init; }
}