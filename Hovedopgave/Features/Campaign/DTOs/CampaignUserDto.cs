namespace Hovedopgave.Features.Campaign.DTOs;

public class CampaignUserDto
{
    public required string Id { get; set; }
    public required string Email { get; set; }
    public string? DisplayName { get; set; }
}