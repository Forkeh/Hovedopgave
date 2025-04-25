import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

type Props = {
    isDeleteDialogOpen: boolean;
    setIsDeleteDialogOpen: (open: boolean) => void;
    handleDeleteCampaign: () => void;
};

export default function DeleteCampaignDialog({
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    handleDeleteCampaign,
}: Props) {
    return (
        <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='text-center'>
                        Delete campaign?
                    </DialogTitle>
                </DialogHeader>
                <div className='space-y-4 py-4 text-center'>
                    The map and all it's pins will be lost!
                </div>
                <section className='flex justify-between'>
                    <div>
                        <Button
                            variant='destructive'
                            onClick={() => handleDeleteCampaign()}
                        >
                            Delete campaign
                        </Button>
                    </div>
                    <div className='flex gap-2'>
                        <Button
                            variant='outline'
                            onClick={() => setIsDeleteDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </section>
            </DialogContent>
        </Dialog>
    );
}
