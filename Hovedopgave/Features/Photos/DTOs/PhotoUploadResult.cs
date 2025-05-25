namespace Hovedopgave.Features.Photos.DTOs;

public record PhotoUploadResult
{
    public required string PublicId { get; init; }
    public required string Url { get; init; }
}