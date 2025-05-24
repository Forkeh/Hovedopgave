import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAccount } from '@/lib/hooks/useAccount';
import { Character, User } from '@/lib/types';
import { PencilIcon, PlusCircleIcon } from 'lucide-react';
import { useNavigate } from 'react-router';

type Props = {
    user: User | undefined;
    character: Character | undefined;
    campaignId: string | undefined;
};

export default function PlayerCard({ user, character, campaignId }: Props) {
    const { currentUser } = useAccount();
    const navigate = useNavigate();

    const handleEditCharacterNavigate = () => {
        if (character && campaignId && user) {
            navigate(`${user.id}/character/edit`, {
                state: { characterToEdit: character },
            });
        }
    };

    const handleCreateCharacterNavigate = () => {
        if (campaignId && user) {
            navigate(`${user.id}/character/create`);
        }
    };

    const isOwnerOfCard =
        currentUser?.id === character?.userId || currentUser?.id === user?.id;

    return (
        <Card
            className={`parchment-card relative flex h-fit w-80 flex-col border-4 p-4 text-black ${
                character?.isRetired ? 'opacity-75 saturate-50' : ''
            }`}
        >
            <CardHeader>
                <CardTitle className='text-center'>
                    {user?.displayName}
                </CardTitle>
            </CardHeader>
            <CardContent className='flex flex-grow flex-col'>
                {isOwnerOfCard && character && !character.isRetired && (
                    <PencilIcon
                        onClick={handleEditCharacterNavigate}
                        className='absolute top-3 right-3 cursor-pointer rounded-full bg-stone-600 p-2 text-stone-300 transition-colors hover:bg-stone-500'
                        size={30}
                    />
                )}
                <h3 className='mb-3 border-b border-stone-800 pb-2 text-center text-lg font-semibold'>
                    Character Information
                </h3>
                {character ? (
                    <div className='space-y-6'>
                        <div className='flex items-center space-x-4'>
                            <Avatar className='size-16'>
                                <AvatarImage
                                    src={character.photo?.url}
                                    alt={character.name}
                                />
                                <AvatarFallback className='bg-stone-700 text-yellow-100'>
                                    {character.name
                                        .substring(0, 2)
                                        .toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className='text-xl font-medium'>
                                    {character.name}
                                </p>
                                <p className='text-sm text-muted-foreground'>
                                    {character.race} {character.class}
                                </p>
                            </div>
                        </div>
                        <div>
                            <h4 className='text-sm font-medium'>Backstory</h4>
                            <p
                                className='prose max-h-[200px] max-w-none overflow-y-auto rounded-md border-2 border-stone-500 bg-orange-100 p-2 text-xs break-words text-black'
                                dangerouslySetInnerHTML={{
                                    __html: character.backstory,
                                }}
                            ></p>
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-grow flex-col items-center justify-center text-center'>
                        <p className='text-sm text-muted-foreground'>
                            No character created for this player yet.
                        </p>
                        {isOwnerOfCard && (
                            <Button
                                variant='default'
                                size='lg'
                                className='mt-4 cursor-pointer'
                                onClick={handleCreateCharacterNavigate}
                            >
                                <PlusCircleIcon />
                                Create Character
                            </Button>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
