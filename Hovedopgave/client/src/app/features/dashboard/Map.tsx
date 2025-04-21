import { useCampaigns } from '@/lib/hooks/useCampaigns';
import { useParams } from 'react-router';

export default function Map() {
    const { id } = useParams();
    console.log(id);
    const { campaign, campaignIsLoading } = useCampaigns(id);

    if (campaignIsLoading) {
        return <div>Campaign is loading...</div>;
    }

    return (
        <>
            <div>Map</div>
            <div>Name: {campaign?.name}</div>
            <img
                src={campaign?.mapUrl}
                alt='map image'
            />
        </>
    );
}
