using Hovedopgave.Features.Account.Models;
using Hovedopgave.Features.Photos.Models;

namespace Hovedopgave.Features.Campaign.Models;

public class Campaign
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required User DungeonMaster { get; set; }
    public required string Name { get; set; }
    public string? PhotoId { get; set; }
    public Photo Photo { get; set; } = null!;

    // Navigation property
    public ICollection<User> Users { get; set; } = [];
    public ICollection<MapPin> MapPins { get; set; } = [];
}