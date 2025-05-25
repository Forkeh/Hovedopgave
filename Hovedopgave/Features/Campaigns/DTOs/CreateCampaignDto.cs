namespace Hovedopgave.Features.Campaigns.DTOs;

public record CreateCampaignDto
{
    public required string Name { get; init; }
}