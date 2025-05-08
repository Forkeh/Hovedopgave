import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Character, User } from '@/lib/types';

type Props = {
    user: User | undefined;
    character: Character | undefined;
};

export default function PlayerCard({ user, character }: Props) {
    return (
        <Card className='flex flex-col'>
            <CardHeader>
                <CardTitle>{user?.displayName}</CardTitle>
            </CardHeader>
            <CardContent className='flex-grow'>
                <h3 className='mb-3 border-b pb-2 text-lg font-semibold'>
                    Character Information
                </h3>
                {character ? (
                    <div className='space-y-3'>
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
                                className='text-sm text-foreground'
                                dangerouslySetInnerHTML={{
                                    __html: character.backstory,
                                }}
                            ></p>
                        </div>
                    </div>
                ) : (
                    <p className='text-sm text-muted-foreground'>
                        No character created for this player yet.
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
