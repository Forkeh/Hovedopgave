using Microsoft.AspNetCore.Identity;
using CampaignModel = Hovedopgave.Features.Campaign.Models.Campaign;

namespace Hovedopgave.Features.Account.Models;

public class User : IdentityUser
{
    public string? DisplayName { get; set; }
    
    // Navigation property
    public ICollection<CampaignModel> Campaigns { get; set; } = [];
}