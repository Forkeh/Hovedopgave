namespace Hovedopgave.Features.Campaigns.Models;

public class MapPin
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public double PositionX { get; set; }
    public double PositionY { get; set; }
    public string Icon { get; set; } = "";

    // nav properties
    public required string CampaignId { get; set; }
    public Campaign Campaign { get; set; } = null!;
}