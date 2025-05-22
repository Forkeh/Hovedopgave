using System.Text.Json.Serialization;
using Hovedopgave.Features.Wiki.Models;

namespace Hovedopgave.Features.Wiki.DTOs;

public class CreateWikiEntryDto
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public required WikiEntryType Type { get; set; }

    public required string Name { get; set; }
    public string Content { get; set; } = "";
    public bool IsVisible { get; set; }

    public required string CampaignId { get; set; }
    public string? PhotoId { get; set; }
}
