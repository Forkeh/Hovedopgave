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
    handleSaveEditedPin: () => void;
    editingPin: Pin;
    setEditingPin: React.Dispatch<React.SetStateAction<Pin | null>>;
};

export default function EditPinDialog({
    isEditDialogOpen,
    setIsEditDialogOpen,
    handleSaveEditedPin,
    editingPin,
    setEditingPin,
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
                            value={editingPin.title}
                            onChange={(e) => {
                                const updatedPin = {
                                    ...editingPin,
                                    title: e.target.value,
                                };
                                setEditingPin(updatedPin);
                            }}
                            placeholder='Enter a title for this pin'
                        />
                    </div>
                    <div className='space-y-2'>
                        <label htmlFor='description'>Description</label>
                        <Textarea
                            id='description'
                            value={editingPin.description}
                            onChange={(e) => {
                                const updatedPin = {
                                    ...editingPin,
                                    description: e.target.value,
                                };
                                setEditingPin(updatedPin);
                            }}
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
