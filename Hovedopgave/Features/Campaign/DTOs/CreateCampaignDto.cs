namespace Hovedopgave.Features.Campaign.DTOs;

public class CreateCampaignDto
{
    public required string DungeonMasterId { get; set; }
    public required string Name { get; set; }
    public string? MapUrl { get; set; }
}