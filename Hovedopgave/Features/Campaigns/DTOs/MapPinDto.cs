namespace Hovedopgave.Features.Campaigns.DTOs;

public class MapPinDto
{
    public required string Id { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public required double PositionX { get; set; }
    public required double PositionY { get; set; }
    public required string Icon { get; set; }

    public string? CampaignId { get; set; }
}