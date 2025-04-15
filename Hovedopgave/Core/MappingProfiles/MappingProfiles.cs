using AutoMapper;
using Hovedopgave.Features.Campaign.DTOs;
using Hovedopgave.Features.Campaign.Models;

namespace Hovedopgave.Core.MappingProfiles;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {

        CreateMap<CreateCampaignDto, Campaign>();
        CreateMap<Campaign, CampaignDto>();
      
    }
}