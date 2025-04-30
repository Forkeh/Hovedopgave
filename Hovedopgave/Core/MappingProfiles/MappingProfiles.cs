using AutoMapper;
using Hovedopgave.Features.Account.Models;
using Hovedopgave.Features.Campaigns.DTOs;
using Hovedopgave.Features.Campaigns.Models;
using Hovedopgave.Features.Wiki.DTOs;
using Hovedopgave.Features.Wiki.Models;

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

        CreateMap<CreateWikiEntryDto, WikiEntry>()
            .ForMember(d => d.Campaign, opt => opt.Ignore())
            .ForMember(d => d.Photo, opt => opt.Ignore());

        CreateMap<WikiEntry, WikiEntryDto>();
    }
}