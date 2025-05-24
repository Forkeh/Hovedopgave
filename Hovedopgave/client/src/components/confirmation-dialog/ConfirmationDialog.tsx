import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

type Props = {
    isConfirmationDialogOpen: boolean;
    setIsConfirmationDialogOpen: (open: boolean) => void;
    handleConfirmation: () => void;
    title: string;
    description: string;
};

export default function ConfirmationDialog({
    isConfirmationDialogOpen,
    setIsConfirmationDialogOpen,
    handleConfirmation,
    title,
    description,
}: Props) {
    return (
        <Dialog
            open={isConfirmationDialogOpen}
            onOpenChange={setIsConfirmationDialogOpen}
        >
            <DialogContent className='dnd-gradient-bg w-fit min-w-sm border-4'>
                <DialogHeader>
                    <DialogTitle className='text-center'>{title}</DialogTitle>
                    <DialogDescription className='text-center text-yellow-500'>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <section className='flex justify-between'>
                    <div>
                        <Button
                            className='cursor-pointer'
                            variant='destructive'
                            onClick={() => handleConfirmation()}
                        >
                            Confirm
                        </Button>
                    </div>
                    <div className='flex gap-2'>
                        <Button
                            className='cursor-pointer'
                            variant='outline'
                            onClick={() => setIsConfirmationDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </section>
            </DialogContent>
        </Dialog>
    );
}
