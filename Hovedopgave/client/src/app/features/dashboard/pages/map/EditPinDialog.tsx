import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type Props = {
    isEditDialogOpen: boolean;
    setIsEditDialogOpen: (open: boolean) => void;
    pinTitle: string;
    setPinTitle: (value: string) => void;
    pinDescription: string;
    setPinDescription: (value: string) => void;
    handleSaveEditedPin: () => void;
};

export default function EditPinDialog({
    isEditDialogOpen,
    setIsEditDialogOpen,
    pinTitle,
    setPinTitle,
    pinDescription,
    setPinDescription,
    handleSaveEditedPin,
}: Props) {
    return (
        <Dialog
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Pin</DialogTitle>
                    <DialogDescription>
                        Update the information for this pin.
                    </DialogDescription>
                </DialogHeader>
                <div className='space-y-4 py-4'>
                    <div className='space-y-2'>
                        <label htmlFor='title'>Title</label>
                        <Input
                            id='title'
                            value={pinTitle}
                            onChange={(e) => setPinTitle(e.target.value)}
                            placeholder='Enter a title for this pin'
                        />
                    </div>
                    <div className='space-y-2'>
                        <label htmlFor='description'>Description</label>
                        <Textarea
                            id='description'
                            value={pinDescription}
                            onChange={(e) => setPinDescription(e.target.value)}
                            placeholder='Enter a description'
                            rows={4}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        variant='outline'
                        onClick={() => setIsEditDialogOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleSaveEditedPin}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
