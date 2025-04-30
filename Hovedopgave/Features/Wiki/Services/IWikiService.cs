using Hovedopgave.Core.Results;
using Hovedopgave.Features.Wiki.DTOs;

namespace Hovedopgave.Features.Wiki.Services;

public interface IWikiService
{
    Task<Result<string>> CreateWikiEntry(CreateWikiEntryDto wikiEntryDto);
    Task<Result<List<WikiEntryDto>>> GetWikiEntriesForCampaign(string campaignId);
    Task<Result<string>> DeleteWikiEntry(string wikiEntryId);
}