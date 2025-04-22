using Hovedopgave.Features.Campaign.DTOs;
using Hovedopgave.Features.Photos.Models;

public class CampaignDto
{
    public required string Id { get; set; }
    public required string Name { get; set; }
    public Photo? Photo { get; set; }
    public required CampaignUserDto DungeonMaster { get; set; }

    // navigation properties
    public ICollection<CampaignUserDto> Players { get; set; } = [];
}