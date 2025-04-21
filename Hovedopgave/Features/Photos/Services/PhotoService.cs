using Hovedopgave.Core.Data;
using Hovedopgave.Core.Interfaces;
using Hovedopgave.Core.Results;
using Hovedopgave.Core.Services;
using Hovedopgave.Features.Photos.Models;
using Microsoft.EntityFrameworkCore;

namespace Hovedopgave.Features.Photos.Services;

public class PhotoService(ICloudinaryService cloudinaryService,IUserAccessor userAccessor, AppDbContext context) : IPhotoService
{
    public async Task<Result<Photo>> AddCampaignPhoto(IFormFile file, string campaignId)
    {
        var campaign = await context.Campaigns
            .Include(c => c.DungeonMaster)
            .FirstOrDefaultAsync(c => c.Id == campaignId);
        
        if (campaign == null)
        {
            return Result<Photo>.Failure("Campaign not found", 404);
        }
        
        var user = await userAccessor.GetUserAsync();

        if (campaign.DungeonMaster.Id != user.Id)
        {
            return Result<Photo>.Failure("You are not the DM of this campaign", 403);
        }
        
        
        var uploadResult = await cloudinaryService.UploadPhoto(file);

        if (uploadResult == null)
        {
            return Result<Photo>.Failure("Failed to upload photo", 400);
        }
        
        
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