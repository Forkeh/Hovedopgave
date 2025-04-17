using Hovedopgave.Core.Results;
using Hovedopgave.Features.Campaign.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Hovedopgave.Features.Campaign.Services;

public interface ICampaignService
{
    Task<List<CampaignDto>> GetUserCampaigns();
    Task<Result<string>> CreateCampaign(CreateCampaignDto campaign);
}