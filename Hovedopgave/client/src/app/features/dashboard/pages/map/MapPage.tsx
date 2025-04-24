import { useCampaigns } from '@/lib/hooks/useCampaigns';
import { useParams } from 'react-router';
import Map from './Map';
import ImageUploadWidget from '@/components/ImageUploadWidget';
import { useAccount } from '@/lib/hooks/useAccount';

export default function MapPage() {
    const { id } = useParams();
    const { campaign, campaignIsLoading, uploadCampaignMap } = useCampaigns(id);
    const { currentUser } = useAccount();

    const isViewOnly = currentUser?.id !== campaign?.dungeonMaster.id;

    const handlePhotoUpload = (file: Blob) => {
        uploadCampaignMap.mutate(file);
    };

    if (campaignIsLoading) {
        return <div>Campaign is loading...</div>;
    }

    return (
        <>
            <div>Map</div>
            <div>Name: {campaign?.name}</div>
            {campaign?.photo?.url ? (
                <Map
                    isViewOnly={isViewOnly}
                    campaign={campaign}
                />
            ) : (
                <>
                    {!isViewOnly && (
                        <ImageUploadWidget
                            uploadPhoto={handlePhotoUpload}
                            loading={uploadCampaignMap.isPending}
                        />
                    )}
                </>
            )}
        </>
    );
}
