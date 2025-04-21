using Hovedopgave.Core.Results;
using Hovedopgave.Features.Campaign.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Hovedopgave.Features.Campaign.Services;

public interface ICampaignService
{
    Task<List<CampaignDto>> GetAllUserCampaigns();
    Task<Result<CampaignDto>> GetCampaign(string id);
    Task<Result<string>> CreateCampaign(CreateCampaignDto campaign);
}