import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

type Props = {
    isAddPlayerDialogOpen: boolean;
    setIsAddPlayerDialogOpen: (open: boolean) => void;
    handleAddPlayer: (playerEmail: string) => void;
};

export default function AddPlayerDialog({
    isAddPlayerDialogOpen: isAddPlayerOpen,
    setIsAddPlayerDialogOpen,
    handleAddPlayer,
}: Props) {
    const [emailValue, setEmailValue] = useState<string>('');

    return (
        <Dialog
            open={isAddPlayerOpen}
            onOpenChange={setIsAddPlayerDialogOpen}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='text-center'>
                        Add player to campaign
                    </DialogTitle>
                </DialogHeader>

                <section>
                    <Input
                        className='mx-auto my-5 w-1/2'
                        placeholder='Player e-mail'
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                    />

                    <div className='flex justify-between'>
                        <Button
                            variant='outline'
                            onClick={() => setIsAddPlayerDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={() => handleAddPlayer(emailValue)}>
                            Add player
                        </Button>
                    </div>
                </section>
            </DialogContent>
        </Dialog>
    );
}
