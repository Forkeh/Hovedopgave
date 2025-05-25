using Hovedopgave.Features.Campaigns.DTOs;
using Hovedopgave.Features.Photos.Models;

public record CampaignDto
{
    public required string Id { get; init; }
    public required string Name { get; init; }
    public Photo? Photo { get; init; }
    public required CampaignUserDto DungeonMaster { get; init; }

    // navigation properties
    public ICollection<CampaignUserDto> Players { get; init; } = [];
    public ICollection<MapPinDto> MapPins { get; init; } = [];
}