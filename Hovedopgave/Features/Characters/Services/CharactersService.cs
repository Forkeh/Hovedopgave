using AutoMapper;
using Ganss.Xss;
using Hovedopgave.Core.Data;
using Hovedopgave.Core.Interfaces;
using Hovedopgave.Core.Results;
using Hovedopgave.Core.Services;
using Hovedopgave.Features.Characters.DTOs;
using Hovedopgave.Features.Characters.Models;
using Microsoft.EntityFrameworkCore;

namespace Hovedopgave.Features.Characters.Services;

public class CharactersService(
    AppDbContext context,
    IUserAccessor userAccessor,
    IMapper mapper,
    ICloudinaryService cloudinaryService) : ICharactersService
{
    public async Task<Result<string>> CreateCharacter(CreateCharacterDto createCharacterDto)
    {
        var user = await userAccessor.GetUserAsync();

        var campaign = await context.Campaigns
            .Where(x => x.Id == createCharacterDto.CampaignId)
            .FirstOrDefaultAsync();

        if (campaign is null)
        {
            return Result<string>.Failure($"Failed to find campaign with id {createCharacterDto.CampaignId}", 400);
        }


        var sanitizer = new HtmlSanitizer();
        createCharacterDto.Backstory = sanitizer.Sanitize(createCharacterDto.Backstory);

        var character = mapper.Map<Character>(createCharacterDto);

        character.Campaign = campaign;
        character.User = user;

        if (!string.IsNullOrEmpty(createCharacterDto.PhotoId))
        {
            var photo = await context.Photos
                .Where(x => x.Id == createCharacterDto.PhotoId)
                .FirstOrDefaultAsync();
            if (photo != null)
            {
                character.Photo = photo;
            }
        }

        await context.Characters.AddAsync(character);

        var result = await context.SaveChangesAsync() > 0;

        return !result
            ? Result<string>.Failure("Failed to create character", 400)
            : Result<string>.Success(character.Id);
    }
}