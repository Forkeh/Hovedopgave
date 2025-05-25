namespace Hovedopgave.Features.Notes.DTOs;

public record NoteDto
{
    public required string Id { get; init; }
    public required string Content { get; init; }
    public required string UserId { get; init; }
    public required string CampaignId { get; init; }
}