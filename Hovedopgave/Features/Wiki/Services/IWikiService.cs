using Hovedopgave.Core.Results;
using Hovedopgave.Features.Wiki.DTOs;

namespace Hovedopgave.Features.Wiki.Services;

public interface IWikiService
{
    Task<Result<string>> CreateWikiEntry(CreateWikiEntryDto wikiEntryDto);
}