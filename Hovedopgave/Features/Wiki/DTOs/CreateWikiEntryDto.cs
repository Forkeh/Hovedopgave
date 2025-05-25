using System.Text.Json.Serialization;
using Hovedopgave.Features.Wiki.Models;

namespace Hovedopgave.Features.Wiki.DTOs;

public record CreateWikiEntryDto
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public required WikiEntryType Type { get; init; }

    public required string Name { get; init; }
    public string Content { get; init; } = "";
    public bool IsVisible { get; init; }

    public required string CampaignId { get; init; }
    public string? PhotoId { get; init; }
}