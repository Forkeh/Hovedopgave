using Hovedopgave.Features.Account.Models;
using Hovedopgave.Features.Campaigns.Models;

namespace Hovedopgave.Features.Notes.Models;

public class Note
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Content { get; set; } = "";

    // Nav properties
    public required string UserId { get; set; }
    public required User User { get; set; }
    public required string CampaignId { get; set; }
    public required Campaign Campaign { get; set; }
}