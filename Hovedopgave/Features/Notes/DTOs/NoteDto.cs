namespace Hovedopgave.Features.Notes.DTOs;

public class NoteDto
{
    public required string Id { get; set; }
    public required string Content { get; set; }
    public required string UserId { get; set; }
    public required string CampaignId { get; set; }
}