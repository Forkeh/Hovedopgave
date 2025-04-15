namespace Hovedopgave.Features.Campaign.Services;

public interface ICampaignService
{
    Task<List<CampaignDto>> GetUserCampaigns();
}