namespace Hovedopgave.Features.Campaigns.DTOs;

public record MapPinDto
{
    public required string Id { get; init; }
    public required string Title { get; init; }
    public required string Description { get; init; }
    public required double PositionX { get; init; }
    public required double PositionY { get; init; }
    public required string Icon { get; init; }

    public string? CampaignId { get; init; }
}