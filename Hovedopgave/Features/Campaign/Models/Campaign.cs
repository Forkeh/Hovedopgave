namespace Hovedopgave.Features.Campaign.Models;

public class Campaign
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string DungeonMasterId { get; set; }
    public required string Name { get; set; }
    public string? MapUrl { get; set; }
}