using Hovedopgave.Core.Results;
using Hovedopgave.Features.Campaign.DTOs;

namespace Hovedopgave.Features.Campaign.Services;

public interface ICampaignService
{
    Task<List<CampaignDto>> GetAllUserCampaigns();
    Task<Result<CampaignDto>> GetCampaign(string id);
    Task<Result<string>> DeleteCampaign(string id);
    Task<Result<string>> CreateCampaign(CreateCampaignDto campaign);
    Task<Result<string>> SetCampaignMapPins(string campaignId, List<MapPinDto> pins);
    Task<Result<string>> AddPlayerToCampaign(string campaignId, AddPlayerToCampaignDto player);
}