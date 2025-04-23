using AutoMapper;
using Hovedopgave.Features.Account.Models;
using Hovedopgave.Features.Campaign.DTOs;
using Hovedopgave.Features.Campaign.Models;

namespace Hovedopgave.Core.MappingProfiles;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<CreateCampaignDto, Campaign>();

        CreateMap<Campaign, CampaignDto>()
            .ForMember(d => d.Players, o => o.MapFrom(s => s.Users));

        CreateMap<User, CampaignUserDto>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.DisplayName));

        CreateMap<MapPinDto, MapPin>();
        CreateMap<MapPin, MapPinDto>();
    }
}