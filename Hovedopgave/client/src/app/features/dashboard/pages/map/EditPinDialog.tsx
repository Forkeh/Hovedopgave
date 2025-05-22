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
import PinIcon from './icons/PinIcon';
import { Pin } from '@/lib/types';
import Tiptap from '@/components/rich-text-editor/TipTap';

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
            <DialogContent className='dnd-gradient-bg min-w-fit'>
                <DialogHeader>
                    <DialogTitle className='text-center'>Edit Pin</DialogTitle>
                    <DialogDescription className='text-center'>
                        Update the information for this pin
                    </DialogDescription>
                </DialogHeader>
                <div className='space-y-4 py-4'>
                    <div className='space-y-2'>
                        <label
                            htmlFor='title'
                            className='font-bold'
                        >
                            Title
                        </label>
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
                                className='border-4 border-double border-amber-700/40 bg-orange-50'
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
                                <SelectTrigger className='w-[180px] border-4 border-double border-amber-700/40 bg-orange-50'>
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
                        <label
                            className='font-bold'
                            htmlFor='description'
                        >
                            Description
                        </label>
                        <Tiptap
                            content={editingPin.description}
                            onChange={(newContent) => {
                                const updatedPin = {
                                    ...editingPin,
                                    description: newContent,
                                };
                                setEditingPin(updatedPin);
                            }}
                            maxHeight='max-h-70'
                        />
                    </div>
                </div>
                <section className='flex justify-between'>
                    <div>
                        <Button
                            className='cursor-pointer'
                            variant='destructive'
                            onClick={() => handleDeletePin(editingPin)}
                        >
                            Delete pin
                        </Button>
                    </div>
                    <div className='flex gap-2'>
                        <Button
                            className='cursor-pointer'
                            variant='outline'
                            onClick={() => setIsEditDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            className='cursor-pointer'
                            onClick={handleSaveEditedPin}
                        >
                            Save Changes
                        </Button>
                    </div>
                </section>
            </DialogContent>
        </Dialog>
    );
}
