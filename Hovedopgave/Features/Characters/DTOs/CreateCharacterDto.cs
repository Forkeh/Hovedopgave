using Hovedopgave.Features.Characters.Models;

namespace Hovedopgave.Features.Characters.DTOs;

public class CreateCharacterDto
{
    public required string Name { get; set; }
    public required CharacterRace Race { get; set; }
    public required CharacterClass Class { get; set; }
    public required string Backstory { get; set; }
    public required string CampaignId { get; set; }
    public string? PhotoId { get; set; }
}