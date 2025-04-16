
using Hovedopgave.Features.Campaign.DTOs;

public class CampaignDto
{
    public required string Id { get; set; }
    public required CampaignUserDto DungeonMaster { get; set; }
    public required string Name { get; set; }
    public string? MapUrl { get; set; }
    
    // navigation properties
    public ICollection<CampaignUserDto> Players { get; set; } = [];
}