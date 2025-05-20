using AutoMapper;
using Ganss.Xss;
using Hovedopgave.Core.Data;
using Hovedopgave.Core.Results;
using Hovedopgave.Core.Services;
using Hovedopgave.Features.Account.Models;
using Hovedopgave.Features.Campaigns.Models;
using Hovedopgave.Features.Notes.DTOs;
using Hovedopgave.Features.Notes.Models;
using Microsoft.EntityFrameworkCore;

namespace Hovedopgave.Features.Notes.Services;

public class NotesService(
    AppDbContext context,
    IUserAccessor userAccessor,
    IMapper mapper) : INotesService
{
    public async Task<Result<NoteDto>> GetCampaignNotesForUser(string campaignId)
    {
        var userId = userAccessor.GetUserId();

        var notes = await context.Notes
            .Where(n => n.CampaignId == campaignId)
            .FirstOrDefaultAsync();

        if (notes is null)
        {
            return Result<NoteDto>.Failure("No notes found for campaign", 404);
        }

        return notes.UserId != userId
            ? Result<NoteDto>.Failure("You are not the user of the notes", 403)
            : Result<NoteDto>.Success(mapper.Map<NoteDto>(notes));
    }


    public async Task<Result<NoteDto>> UpdateCampaignNotesForUser(NoteDto notesDto)
    {
        var userId = userAccessor.GetUserId();

        var notes = await context.Notes
            .Where(n => n.CampaignId == notesDto.CampaignId)
            .FirstOrDefaultAsync();

        if (notes is null)
        {
            return Result<NoteDto>.Failure("No notes found for campaign", 404);
        }

        if (notes.UserId != userId)
        {
            return Result<NoteDto>.Failure("You are not the user of the notes", 403);
        }

        var sanitizer = new HtmlSanitizer();
        notes.Content = sanitizer.Sanitize(notesDto.Content);

        context.Notes.Update(notes);

        var result = await context.SaveChangesAsync() > 0;

        return result
            ? Result<NoteDto>.Success(mapper.Map<NoteDto>(notes))
            : Result<NoteDto>.Failure("Failed to update notes", 400);
    }

    public async Task<Result<NoteDto>> CreateCampaignNotesForUser(User user, Campaign campaign)
    {
        var note = new Note
        {
            Content = "<p style=\"text-align: center\">Type your own notes here!</p>",
            UserId = user.Id,
            CampaignId = campaign.Id,
            User = user,
            Campaign = campaign
        };

        await context.Notes.AddAsync(note);
        var result = await context.SaveChangesAsync() > 0;

        return result
            ? Result<NoteDto>.Success(mapper.Map<NoteDto>(note))
            : Result<NoteDto>.Failure("Failed to create notes for user", 400);
    }
}
