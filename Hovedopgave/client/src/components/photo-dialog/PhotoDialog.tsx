import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import ImageUploadWidget from './ImageUploadWidget';

type Props = {
    isPhotoDialogOpen: boolean;
    setIsPhotoDialogOpen: (open: boolean) => void;
    onSetPhoto: (file: Blob) => void;
};

export default function PhotoDialog({
    isPhotoDialogOpen,
    setIsPhotoDialogOpen,
    onSetPhoto,
}: Props) {
    return (
        <Dialog
            open={isPhotoDialogOpen}
            onOpenChange={setIsPhotoDialogOpen}
        >
            <DialogContent className='dnd-gradient-bg min-w-3xl p-10'>
                <DialogHeader>
                    <DialogTitle className='text-center text-2xl text-yellow-100'>
                        Add Image
                    </DialogTitle>
                </DialogHeader>
                <ImageUploadWidget
                    uploadPhoto={onSetPhoto}
                    loading={false}
                />
                <section className='flex flex-row-reverse'>
                    <div className='flex gap-2'>
                        <Button
                            variant='outline'
                            onClick={() => setIsPhotoDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </section>
            </DialogContent>
        </Dialog>
    );
}
