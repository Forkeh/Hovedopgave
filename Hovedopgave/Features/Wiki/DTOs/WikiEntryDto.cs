using Hovedopgave.Features.Photos.Models;
using Hovedopgave.Features.Wiki.Models;

namespace Hovedopgave.Features.Wiki.DTOs;

public class WikiEntryDto
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required WikiEntryType Type { get; set; }
    public required string Name { get; set; }
    public required string Content { get; set; }

    public uint Xmin { get; set; }

    public required string CampaignId { get; set; }
    public string? PhotoId { get; set; }
    public Photo? Photo { get; set; }
}
