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
                    <DialogTitle className='text-center text-yellow-100'>
                        Edit Pin
                    </DialogTitle>
                    <DialogDescription className='text-center text-yellow-500/80'>
                        Update the information for this pin
                    </DialogDescription>
                </DialogHeader>
                <div className='space-y-4 py-4 text-yellow-100'>
                    <div className='space-y-2'>
                        <label
                            htmlFor='title'
                            className='font-bold text-yellow-500'
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
                                className='border-4 border-double border-yellow-500/70 bg-orange-100 text-black'
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
                                <SelectTrigger className='w-[180px] border-4 border-double border-yellow-500/70 bg-orange-100 text-black'>
                                    <SelectValue placeholder='Icon' />
                                </SelectTrigger>
                                <SelectContent className='bg-orange-100 text-black'>
                                    <SelectItem value='default'>
                                        <PinIcon className='text-stone-800' />
                                        <span>Default</span>
                                    </SelectItem>
                                    <SelectItem value='dungeon'>
                                        <PinIcon
                                            className='text-stone-800'
                                            name='dungeon'
                                        />
                                        <span>Dungeon</span>
                                    </SelectItem>
                                    <SelectItem value='forest'>
                                        <PinIcon
                                            className='text-stone-800'
                                            name='forest'
                                        />
                                        <span>Forest</span>
                                    </SelectItem>
                                    <SelectItem value='camp'>
                                        <PinIcon
                                            className='text-stone-800'
                                            name='camp'
                                        />
                                        <span>Camp</span>
                                    </SelectItem>
                                    <SelectItem value='castle'>
                                        <PinIcon
                                            className='text-stone-800'
                                            name='castle'
                                        />
                                        <span>Castle</span>
                                    </SelectItem>
                                    <SelectItem value='hut'>
                                        <PinIcon
                                            className='text-stone-800'
                                            name='hut'
                                        />
                                        <span>Hut</span>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <label
                            className='font-bold text-yellow-500'
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
