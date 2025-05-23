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
import { Crown, UserPlus } from 'lucide-react'; // Import Crown icon for DM
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import Loader from '@/components/Loader';

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
        return <Loader />;
    }

    const sortedPlayersByName = campaign?.players
        ? [...campaign.players].sort((a, b) =>
              a.displayName
                  .toLowerCase()
                  .localeCompare(b.displayName.toLowerCase()),
          )
        : [];

    const activeCharacters =
        characters?.filter((char) => !char.isRetired) || [];

    const retiredCharacters =
        characters?.filter((char) => char.isRetired) || [];

    return (
        <section className='my-5 flex w-fit flex-col items-center'>
            <div className='mb-6 flex w-full flex-col items-center gap-3'>
                <h1 className='text-3xl font-extrabold'>{campaign?.name}</h1>

                <div className='mb-5 flex items-center gap-2'>
                    <Crown
                        size={30}
                        className='text-yellow-500'
                    />
                    <span>
                        Dungeon Master:{' '}
                        <span className='font-semibold text-yellow-500'>
                            {campaign?.dungeonMaster.displayName}
                        </span>
                    </span>
                </div>

                {currentUser?.id === campaign?.dungeonMaster.id && (
                    <Button
                        size='lg'
                        className='my-4 cursor-pointer font-bold'
                        onClick={() => setIsAddPlayerOpen(true)}
                    >
                        <UserPlus />
                        Add player
                    </Button>
                )}
            </div>

            <h2 className='mb-2 text-xl font-bold'>Active characters</h2>

            {campaign?.players && campaign.players.length > 0 ? (
                <div className='flex flex-wrap gap-8'>
                    {sortedPlayersByName?.map((player) => {
                        const playerCharacter = activeCharacters?.find(
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

            {retiredCharacters.length > 0 && (
                <>
                    <Accordion
                        type='single'
                        collapsible
                    >
                        <AccordionItem value='item-1'>
                            <AccordionTrigger className='mt-8 mb-4 text-xl font-bold'>
                                <div className='w-full text-center'>
                                    Retired Characters
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className='flex flex-wrap gap-8'>
                                    {sortedPlayersByName?.map((player) => {
                                        const playerCharacters =
                                            retiredCharacters?.filter(
                                                (char) =>
                                                    char.userId === player.id,
                                            );

                                        return playerCharacters.map((char) => (
                                            <PlayerCard
                                                key={`${player?.id}-${char?.id}`}
                                                user={player}
                                                character={char}
                                                campaignId={id}
                                            />
                                        ));
                                    })}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </>
            )}

            <AddPlayerDialog
                isAddPlayerDialogOpen={isAddPlayerOpen}
                setIsAddPlayerDialogOpen={setIsAddPlayerOpen}
                onAddPlayer={handleAddPlayer}
            />
        </section>
    );
}
