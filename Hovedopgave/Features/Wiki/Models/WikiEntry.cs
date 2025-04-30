using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Hovedopgave.Features.Campaigns.Models;
using Hovedopgave.Features.Photos.Models;

namespace Hovedopgave.Features.Wiki.Models;

public class WikiEntry
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required WikiEntryType Type { get; set; }
    public required string Name { get; set; }
    public string Content { get; set; } = "";

    [ConcurrencyCheck]
    [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    public uint Xmin { get; set; }

    public required string CampaignId { get; set; }
    public required Campaign Campaign { get; set; }
    public string? PhotoId { get; set; }
    public Photo? Photo { get; set; }
}