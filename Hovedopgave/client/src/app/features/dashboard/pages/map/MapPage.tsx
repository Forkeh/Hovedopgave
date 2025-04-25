import { useCampaigns } from '@/lib/hooks/useCampaigns';
import { useNavigate, useParams } from 'react-router';
import Map from './Map';
import ImageUploadWidget from '@/components/ImageUploadWidget';
import { useAccount } from '@/lib/hooks/useAccount';
import { toast } from 'react-toastify';
import DeleteCampaignDialog from './DeleteCampaignDialog';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function MapPage() {
    const [isDeleteCampaignDialogOpen, setIsDeleteCampaignDialogOpen] =
        useState(false);
    const { id } = useParams();
    const { campaign, campaignIsLoading, uploadCampaignMap, deleteCampaign } =
        useCampaigns(id);
    const { currentUser } = useAccount();
    const navigate = useNavigate();

    const isViewOnly = currentUser?.id !== campaign?.dungeonMaster.id;

    const handlePhotoUpload = (file: Blob) => {
        uploadCampaignMap.mutate(file);
    };

    if (campaignIsLoading) {
        return <div>Campaign is loading...</div>;
    }

    const handleDeleteCampaign = () => {
        console.log(campaign!.id);

        deleteCampaign.mutate(undefined, {
            onSuccess: () => {
                toast('Deleted campaign! 😎', {
                    type: 'success',
                });
                navigate('/campaigns');
            },
            onError: () => {
                toast('Something went wrong deleting campaign 😬', {
                    type: 'error',
                });
            },
        });
    };

    return (
        <main className='w-fit'>
            <section className='flex justify-between'>
                <h1 className='text-3xl font-extrabold'>{campaign?.name}</h1>
                <Button
                    variant='destructive'
                    onClick={() => setIsDeleteCampaignDialogOpen(true)}
                >
                    Delete campaign
                </Button>
            </section>

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
            <DeleteCampaignDialog
                handleDeleteCampaign={handleDeleteCampaign}
                isDeleteDialogOpen={isDeleteCampaignDialogOpen}
                setIsDeleteDialogOpen={setIsDeleteCampaignDialogOpen}
            />
        </main>
    );
}
