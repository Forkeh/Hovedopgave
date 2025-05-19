using Hovedopgave.Core.Results;
using Hovedopgave.Features.Account.Models;
using Hovedopgave.Features.Campaigns.Models;
using Hovedopgave.Features.Notes.DTOs;

namespace Hovedopgave.Features.Notes.Services;

public interface INotesService
{
    Task<Result<NoteDto>> GetCampaignNotesForUser(string campaignId);
    Task<Result<NoteDto>> UpdateCampaignNotesForUser(NoteDto notesDto);
    Task<Result<NoteDto>> CreateCampaignNotesForUser(User user, Campaign campaign);
}