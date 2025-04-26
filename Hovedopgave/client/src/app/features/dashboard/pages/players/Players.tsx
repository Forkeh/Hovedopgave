import { Button } from '@/components/ui/button';
import { useCampaigns } from '@/lib/hooks/useCampaigns';
import { useState } from 'react';
import { useParams } from 'react-router';
import AddPlayerDialog from './AddPlayerDialog';

export default function Players() {
    const { id } = useParams();
    const { campaign, campaignIsLoading } = useCampaigns(id);

    const [isAddPlayerOpen, setIsAddPlayerOpen] = useState(false);

    const handleAddPlayer = (playerEmail: string) => {
        console.log(playerEmail);

        // deleteCampaign.mutate(undefined, {
        //     onSuccess: () => {
        //         toast('Deleted campaign! 😎', {
        //             type: 'success',
        //         });
        //         navigate('/campaigns');
        //     },
        //     onError: () => {
        //         toast('Something went wrong deleting campaign 😬', {
        //             type: 'error',
        //         });
        //     },
        // });
    };

    if (campaignIsLoading) {
        return <div>Campaign is loading...</div>;
    }

    return (
        <>
            <h1 className='text-3xl font-extrabold'>Players is campaign</h1>
            <Button
                className='my-8'
                onClick={() => setIsAddPlayerOpen(true)}
            >
                Add player
            </Button>
            {campaign?.players.length ? (
                <div>players</div>
            ) : (
                <div>Currently no players in campaign</div>
            )}

            <AddPlayerDialog
                isAddPlayerDialogOpen={isAddPlayerOpen}
                setIsAddPlayerDialogOpen={setIsAddPlayerOpen}
                handleAddPlayer={handleAddPlayer}
            />
        </>
    );
}
