using System.Text.Json.Serialization;
using Hovedopgave.Features.Account.Models;

namespace Hovedopgave.Features.Photos.Models;

public class Photo
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Url { get; set; }
    public required string PublicId { get; set; }

    // nav properties - set up relations, so cascade deletion works
    public required string UserId { get; set; }

    [JsonIgnore] public User User { get; set; } = null!;
}