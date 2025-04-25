import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import PinIcon from './icons/PinIcon';

type Props = {
    isEditDialogOpen: boolean;
    setIsEditDialogOpen: (open: boolean) => void;
    handleSaveEditedPin: () => void;
    editingPin: Pin;
    setEditingPin: React.Dispatch<React.SetStateAction<Pin | null>>;
    handleDeletePin: (deletedPin: Pin) => void;
};

export default function EditPinDialog({
    isEditDialogOpen,
    setIsEditDialogOpen,
    handleSaveEditedPin,
    editingPin,
    setEditingPin,
    handleDeletePin,
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
                        <div className='flex gap-2'>
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
                            <Select
                                onValueChange={(value) => {
                                    const updatedPin = {
                                        ...editingPin,
                                        icon: value,
                                    };
                                    setEditingPin(updatedPin);
                                }}
                                defaultValue='default'
                            >
                                <SelectTrigger className='w-[180px]'>
                                    <SelectValue placeholder='Icon' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='default'>
                                        <PinIcon />
                                        <span>Default</span>
                                    </SelectItem>
                                    <SelectItem value='dungeon'>
                                        <PinIcon name='dungeon' />
                                        <span>Dungeon</span>
                                    </SelectItem>
                                    <SelectItem value='forest'>
                                        <PinIcon name='forest' />
                                        <span>Forest</span>
                                    </SelectItem>
                                    <SelectItem value='camp'>
                                        <PinIcon name='camp' />
                                        <span>Camp</span>
                                    </SelectItem>
                                    <SelectItem value='castle'>
                                        <PinIcon name='castle' />
                                        <span>Castle</span>
                                    </SelectItem>
                                    <SelectItem value='hut'>
                                        <PinIcon name='hut' />
                                        <span>Hut</span>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
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
                <section className='flex justify-between'>
                    <div>
                        <Button
                            variant='destructive'
                            onClick={() => handleDeletePin(editingPin)}
                        >
                            Delete pin
                        </Button>
                    </div>
                    <div className='flex gap-2'>
                        <Button
                            variant='outline'
                            onClick={() => setIsEditDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleSaveEditedPin}>
                            Save Changes
                        </Button>
                    </div>
                </section>
            </DialogContent>
        </Dialog>
    );
}
