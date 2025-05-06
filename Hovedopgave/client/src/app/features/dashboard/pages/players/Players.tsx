import { Button } from '@/components/ui/button';
import { useCampaigns } from '@/lib/hooks/useCampaigns';
import { useState } from 'react';
import { useParams } from 'react-router';
import AddPlayerDialog from './AddPlayerDialog';
import { toast } from 'react-toastify';
import { useAccount } from '@/lib/hooks/useAccount';

export default function Players() {
    const { id } = useParams();
    const { campaign, campaignIsLoading, addPlayerToCampaign } =
        useCampaigns(id);
    const { currentUser } = useAccount();

    const [isAddPlayerOpen, setIsAddPlayerOpen] = useState(false);

    const handleAddPlayer = (playerEmail: string) => {
        addPlayerToCampaign.mutate(playerEmail, {
            onSuccess: () => {
                toast('Added player to campaign! 😎', {
                    type: 'success',
                });
                setIsAddPlayerOpen(false);
            },
            onError: (error) => {
                console.log(error);

                toast(`${error.response?.data}`, {
                    type: 'error',
                });
            },
        });
    };

    if (campaignIsLoading) {
        return <div>Campaign is loading...</div>;
    }

    return (
        <>
            <h1 className='text-3xl font-extrabold'>Players is campaign</h1>
            {currentUser?.id === campaign?.dungeonMaster.id && (
                <Button
                    className='my-8'
                    onClick={() => setIsAddPlayerOpen(true)}
                >
                    Add player
                </Button>
            )}

            {campaign?.players.length ? (
                campaign?.players.map((player) => (
                    <div>{player.displayName}</div>
                ))
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
