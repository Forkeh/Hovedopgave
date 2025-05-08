import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAccount } from '@/lib/hooks/useAccount';
import { Character, User } from '@/lib/types';
import { PencilIcon, PlusCircleIcon } from 'lucide-react'; // Import PencilIcon
import { useNavigate } from 'react-router';

type Props = {
    user: User | undefined;
    character: Character | undefined;
    campaignId: string | undefined; // Add campaignId to props
};

export default function PlayerCard({ user, character, campaignId }: Props) {
    const { currentUser } = useAccount();
    const navigate = useNavigate();

    const handleEditCharacterNavigate = () => {
        if (character && campaignId && user) {
            // Navigate to an edit character page (you'll need to define this route)
            // Example: navigate(`/campaigns/dashboard/${campaignId}/characters/${character.id}/edit`);
            console.log('Edit character:', character.id);
            // For now, let's navigate to a placeholder or a specific route if you have one
            // navigate(`/campaigns/dashboard/${campaignId}/players/${user?.id}/character/${character.id}/edit`);
            navigate(`${user.id}/character/edit`, {
                state: { characterToEdit: character },
            });
        }
    };

    const handleCreateCharacterNavigate = () => {
        if (campaignId && user) {
            // Navigate to a create character page
            // Example: navigate(`/campaigns/dashboard/${campaignId}/characters/create?userId=${user.id}`);
            console.log('Create character for user:', user.id);
            // For now, let's navigate to a placeholder or a specific route if you have one
            // navigate(`/campaigns/dashboard/${campaignId}/players/${user.id}/character/create`);
            navigate(`${user.id}/character/create`);
        }
    };

    const isOwnerOfCard =
        currentUser?.id === character?.userId || currentUser?.id === user?.id;

    return (
        <Card className='relative flex h-fit w-80 flex-col'>
            <CardHeader>
                <CardTitle>{user?.displayName}</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-grow flex-col'>
                {isOwnerOfCard && character && (
                    <button
                        onClick={handleEditCharacterNavigate}
                        className='absolute top-4 right-4 cursor-pointer rounded-full bg-gray-200 p-2 transition-colors hover:bg-gray-300'
                    >
                        <PencilIcon className='h-5 w-5 text-gray-600' />
                    </button>
                )}
                <h3 className='mb-3 border-b pb-2 text-lg font-semibold'>
                    Character Information
                </h3>
                {character ? (
                    <div className='space-y-6'>
                        <div className='flex items-center space-x-4'>
                            <Avatar className='h-16 w-16'>
                                <AvatarImage
                                    src={character.photo?.url}
                                    alt={character.name}
                                />
                                <AvatarFallback>
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
                            <h4 className='text-sm font-medium text-muted-foreground'>
                                Backstory
                            </h4>
                            <p
                                className='prose max-w-none text-xs text-foreground'
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
                                className='mt-4'
                                onClick={handleCreateCharacterNavigate}
                            >
                                <PlusCircleIcon className='mr-2 h-4 w-4' />
                                Create Character
                            </Button>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
