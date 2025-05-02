using Hovedopgave.Core.Results;
using Hovedopgave.Features.Photos.Models;

namespace Hovedopgave.Features.Photos.Services;

public interface IPhotoService
{
    Task<Result<Photo>> AddCampaignPhoto(IFormFile file, string campaignId);
    Task<Result<Photo>> AddWikiEntryPhoto(IFormFile file, string campaignId);
}
