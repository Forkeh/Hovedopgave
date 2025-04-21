using Hovedopgave.Features.Photos.DTOs;

namespace Hovedopgave.Core.Interfaces;

public interface ICloudinaryService
{
    Task<PhotoUploadResult?> UploadPhoto(IFormFile file);
    Task<string> DeletePhoto(string publicId);
}