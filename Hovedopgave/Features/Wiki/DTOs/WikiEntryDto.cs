using Hovedopgave.Features.Photos.Models;
using Hovedopgave.Features.Wiki.Models;

namespace Hovedopgave.Features.Wiki.DTOs;

public record WikiEntryDto
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required WikiEntryType Type { get; init; }
    public required string Name { get; init; }
    public required string Content { get; init; }
    public required bool IsVisible { get; init; }

    public uint Xmin { get; init; }

    public required string CampaignId { get; init; }
    public string? PhotoId { get; init; }
    public Photo? Photo { get; init; }
}