using Hovedopgave.Core.Data;
using Hovedopgave.Core.Interfaces;
using Hovedopgave.Core.Results;
using Hovedopgave.Core.Services;
using Hovedopgave.Features.Photos.Models;

namespace Hovedopgave.Features.Photos.Services;

public class PhotoService(ICloudinaryService cloudinaryService,IUserAccessor userAccessor, AppDbContext context) : IPhotoService
{
    public async Task<Result<Photo>> AddCampaignPhoto(IFormFile file, string campaignId)
    {
        var campaign = await context.Campaigns.FindAsync(campaignId);
        
        if (campaign == null)
        {
            return Result<Photo>.Failure("Campaign not found", 404);
        }
        
        var uploadResult = await cloudinaryService.UploadPhoto(file);

        if (uploadResult == null)
        {
            return Result<Photo>.Failure("Failed to upload photo", 400);
        }
        
        var user = await userAccessor.GetUserAsync();

        var photo = new Photo
        {
            Url = uploadResult.Url,
            PublicId = uploadResult.PublicId,
            UserId = user.Id
        };
        
        context.Photos.Add(photo);

        campaign.MapUrl ??= photo.Url;
        
        var result = await context.SaveChangesAsync() > 0;

        return result
            ? Result<Photo>.Success(photo)
            : Result<Photo>.Failure("Problem saving photo to DB", 400);
    }
}