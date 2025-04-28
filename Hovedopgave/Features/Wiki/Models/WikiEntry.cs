using System.ComponentModel.DataAnnotations;
using Hovedopgave.Features.Photos.Models;
using Hovedopgave.Features.Campaigns.Models;

namespace Hovedopgave.Features.Wiki.Models;

public class WikiEntry
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required WikiEntryType Type { get; set; }
    public required string Name { get; set; }
    public required string Content { get; set; } = "";


    [Timestamp] public required byte[] RowVersion { get; set; }

    public required string CampaignId { get; set; }
    public required Campaign Campaign { get; set; }
    public string? PhotoId { get; set; }
    public Photo? Photo { get; set; }
}