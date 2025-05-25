namespace Hovedopgave.Features.Campaigns.DTOs;

public record AddPlayerToCampaignDto
{
    public required string Username { get; init; }
}