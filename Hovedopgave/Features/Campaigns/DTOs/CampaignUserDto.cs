namespace Hovedopgave.Features.Campaigns.DTOs;

public record CampaignUserDto
{
    public required string Id { get; init; }
    public required string Email { get; init; }
    public string? DisplayName { get; init; }
}