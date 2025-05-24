import { useCampaigns } from '@/lib/hooks/useCampaigns';
import { useNavigate, useParams } from 'react-router';
import Map from './Map';
import { useAccount } from '@/lib/hooks/useAccount';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ConfirmationDialog from '@/components/confirmation-dialog/ConfirmationDialog';
import PhotoDialog from '@/components/photo-dialog/PhotoDialog';
import Loader from '@/components/Loader';

export default function MapPage() {
    const [isDeleteCampaignDialogOpen, setIsDeleteCampaignDialogOpen] =
        useState(false);
    const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false);
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
        return <Loader />;
    }

    const handleDeleteCampaign = () => {
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
        <main className='mt-5 flex w-full animate-in flex-col items-center fade-in'>
            <section className='mb-5 flex flex-col gap-5'>
                <h1 className='text-3xl font-extrabold'>{campaign?.name}</h1>
                {currentUser?.id === campaign?.dungeonMaster.id && (
                    <Button
                        variant='destructive'
                        onClick={() => setIsDeleteCampaignDialogOpen(true)}
                    >
                        Delete campaign
                    </Button>
                )}
            </section>

            {campaign?.photo?.url ? (
                <Map
                    isViewOnly={isViewOnly}
                    campaign={campaign}
                />
            ) : (
                <div className='flex aspect-square w-md flex-col items-center justify-center gap-4 overflow-hidden rounded-lg border-4 border-double border-yellow-500/70 bg-gradient-to-br from-stone-700 to-stone-900 shadow-md'>
                    <div className='text-yellow-100'>
                        No map image available
                    </div>
                    {!isViewOnly && (
                        <Button
                            size='lg'
                            className='cursor-pointer'
                            onClick={() => setIsPhotoDialogOpen(true)}
                        >
                            Add map image
                        </Button>
                    )}
                </div>
            )}
            <ConfirmationDialog
                title='Delete Campaign?'
                description='This action cannot be undone, all map pins will be lost!'
                isConfirmationDialogOpen={isDeleteCampaignDialogOpen}
                setIsConfirmationDialogOpen={setIsDeleteCampaignDialogOpen}
                handleConfirmation={handleDeleteCampaign}
            />

            <PhotoDialog
                isPhotoDialogOpen={isPhotoDialogOpen}
                setIsPhotoDialogOpen={setIsPhotoDialogOpen}
                onSetPhoto={handlePhotoUpload}
            />
        </main>
    );
}
