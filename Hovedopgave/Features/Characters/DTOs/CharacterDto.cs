using Hovedopgave.Features.Characters.Models;
using Hovedopgave.Features.Photos.Models;

namespace Hovedopgave.Features.Characters.DTOs;

public class CharacterDto
{
    public required string Id { get; set; }
    public required string Name { get; set; }
    public required CharacterRace Race { get; set; }
    public required CharacterClass Class { get; set; }
    public required string Backstory { get; set; }
    public required bool IsRetired { get; set; }
    public required string CampaignId { get; set; }
    public required string UserId { get; set; }

    public string? PhotoId { get; set; }
    public Photo? Photo { get; set; }
}