import { Button } from '@/components/ui/button';
import { useCampaigns } from '@/lib/hooks/useCampaigns';
import { useState } from 'react';
import { useParams } from 'react-router';
import AddPlayerDialog from './AddPlayerDialog';
import { toast } from 'react-toastify';
import { useAccount } from '@/lib/hooks/useAccount';
import { AddPlayerToCampaignSchema } from '@/lib/schemas/addPlayerToCampaignSchema';
import { useCharacters } from '@/lib/hooks/useCharacters';
import PlayerCard from './PlayerCard';

export default function PlayersList() {
    const { id } = useParams();
    const { campaign, campaignIsLoading, addPlayerToCampaign } =
        useCampaigns(id);
    const { characters, charactersIsLoading } = useCharacters(id);
    const { currentUser } = useAccount();

    const [isAddPlayerOpen, setIsAddPlayerOpen] = useState(false);

    const handleAddPlayer = (data: AddPlayerToCampaignSchema) => {
        addPlayerToCampaign.mutate(data.email, {
            onSuccess: () => {
                toast('Added player to campaign! 😎', {
                    type: 'success',
                });
                setIsAddPlayerOpen(false);
            },
            onError: (error) => {
                toast(`${error.response?.data}`, {
                    type: 'error',
                });
            },
        });
    };

    if (campaignIsLoading || charactersIsLoading) {
        return (
            <div className='flex h-screen items-center justify-center'>
                Loading...
            </div>
        );
    }

    return (
        <section className='flex w-fit flex-col items-center'>
            <div className='mb-6'>
                <h1 className='text-3xl font-extrabold'>
                    Players in Campaign: {campaign?.name}
                </h1>
                {currentUser?.id === campaign?.dungeonMaster.id && (
                    <Button
                        className='my-4'
                        onClick={() => setIsAddPlayerOpen(true)}
                    >
                        Add player
                    </Button>
                )}
            </div>

            {campaign?.players && campaign.players.length > 0 ? (
                <div className='flex flex-wrap gap-8'>
                    {campaign.players.map((player) => {
                        const playerCharacter = characters?.find(
                            (char) => char.userId === player.id,
                        );

                        return (
                            <PlayerCard
                                key={player?.id}
                                user={player}
                                character={playerCharacter}
                                campaignId={id}
                            />
                        );
                    })}
                </div>
            ) : (
                <div className='py-10 text-center'>
                    <p className='text-xl text-muted-foreground'>
                        Currently no players in this campaign.
                    </p>
                    {currentUser?.id === campaign?.dungeonMaster.id && (
                        <p className='mt-2 text-sm text-muted-foreground'>
                            Click "Add player" to invite someone!
                        </p>
                    )}
                </div>
            )}

            <AddPlayerDialog
                isAddPlayerDialogOpen={isAddPlayerOpen}
                setIsAddPlayerDialogOpen={setIsAddPlayerOpen}
                onAddPlayer={handleAddPlayer}
            />
        </section>
    );
}
