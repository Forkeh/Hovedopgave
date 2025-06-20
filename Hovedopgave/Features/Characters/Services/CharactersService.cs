﻿using AutoMapper;
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
            .Include(x => x.DungeonMaster)
            .Where(x => x.Id == createCharacterDto.CampaignId)
            .FirstOrDefaultAsync();

        if (campaign is null)
        {
            return Result<string>.Failure($"Failed to find campaign with id {createCharacterDto.CampaignId}", 400);
        }


        var existingCharacter = await context.Characters
            .Where(x => x.UserId == user.Id
                        && x.CampaignId == createCharacterDto.CampaignId
                        && !x.IsRetired)
            .FirstOrDefaultAsync();

        if (existingCharacter is not null)
        {
            return Result<string>.Failure("User already has an active character in campaign", 400);
        }


        var character = mapper.Map<Character>(createCharacterDto);

        var sanitizer = new HtmlSanitizer();
        character.Backstory = sanitizer.Sanitize(createCharacterDto.Backstory);
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

    public async Task<Result<List<CharacterDto>>> GetCharactersForCampaign(string campaignId)
    {
        var characters = await context.Characters
            .Where(x => x.CampaignId == campaignId)
            .Include(x => x.Photo)
            .Include(x => x.User)
            .ToListAsync();

        var characterDtos = mapper.Map<List<CharacterDto>>(characters);
        return Result<List<CharacterDto>>.Success(characterDtos);
    }

    public async Task<Result<string>> UpdateCharacter(CharacterDto characterDto)
    {
        var user = await userAccessor.GetUserAsync();

        if (user.Id != characterDto.UserId)
        {
            return Result<string>.Failure("You are not the characters owner", 400);
        }

        var character = await context.Characters
            .Include(x => x.Photo)
            .FirstOrDefaultAsync(x => x.Id == characterDto.Id);

        if (character is null)
        {
            return Result<string>.Failure("Character not found", 400);
        }

        character.Name = characterDto.Name;
        character.Class = characterDto.Class;
        character.Race = characterDto.Race;

        var sanitizer = new HtmlSanitizer();
        character.Backstory = sanitizer.Sanitize(characterDto.Backstory);

        if (!string.IsNullOrEmpty(characterDto.PhotoId))
        {
            if (character.PhotoId != characterDto.PhotoId)
            {
                var photo = await context.Photos.FindAsync(characterDto.PhotoId);

                if (photo != null)
                {
                    if (character.PhotoId != null)
                    {
                        await cloudinaryService.DeletePhoto(character.PhotoId);
                    }

                    character.Photo = photo;
                    character.PhotoId = photo.Id;
                }
            }
        }
        else if (characterDto.PhotoId == null && character.PhotoId != null)
        {
            await cloudinaryService.DeletePhoto(character.PhotoId);

            character.Photo = null;
            character.PhotoId = null;
        }

        context.Characters.Update(character);

        var result = await context.SaveChangesAsync() > 0;

        return !result
            ? Result<string>.Failure("Failed to update character", 400)
            : Result<string>.Success(character.Id);
    }

    public async Task<Result<string>> DeleteCharacter(string characterId)
    {
        var user = await userAccessor.GetUserAsync();

        var character = await context.Characters
            .Where(x => x.Id == characterId)
            .Include(x => x.Photo)
            .Include(x => x.User)
            .FirstOrDefaultAsync();

        if (character is null)
        {
            return Result<string>.Failure("Character not found", 400);
        }

        if (character.User.Id != user.Id)
        {
            return Result<string>.Failure("You are not the characters owner", 400);
        }

        if (character.Photo is not null)
        {
            await cloudinaryService.DeletePhoto(character.Photo.PublicId);
        }

        context.Characters.Remove(character);

        var result = await context.SaveChangesAsync() > 0;

        return !result
            ? Result<string>.Failure("Failed to delete character", 400)
            : Result<string>.Success(character.Id);
    }

    public async Task<Result<string>> RetireCharacter(string characterId)
    {
        var user = await userAccessor.GetUserAsync();

        var character = await context.Characters
            .Where(x => x.Id == characterId)
            .Include(x => x.User)
            .FirstOrDefaultAsync();

        if (character is null)
        {
            return Result<string>.Failure("Character not found", 400);
        }

        if (character.User.Id != user.Id)
        {
            return Result<string>.Failure("You are not the characters owner", 400);
        }

        character.IsRetired = true;

        context.Characters.Update(character);

        var result = await context.SaveChangesAsync() > 0;

        return !result
            ? Result<string>.Failure("Failed to retire character", 400)
            : Result<string>.Success(character.Id);
    }
}