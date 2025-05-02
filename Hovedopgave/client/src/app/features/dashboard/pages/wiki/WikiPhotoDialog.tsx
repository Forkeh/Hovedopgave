import ImageUploadWidget from '@/components/ImageUploadWidget';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

type Props = {
    isPhotoDialogOpen: boolean;
    setIsPhotoDialogOpen: (open: boolean) => void;
    onSetPhoto: (file: Blob) => void;
};

export default function WikiPhotoDialog({
    isPhotoDialogOpen,
    setIsPhotoDialogOpen,
    onSetPhoto,
}: Props) {
    return (
        <Dialog
            open={isPhotoDialogOpen}
            onOpenChange={setIsPhotoDialogOpen}
        >
            <DialogContent className='w-auto max-w-5xl p-6 sm:max-w-[80vw]'>
                <DialogHeader>
                    <DialogTitle className='text-center'>Add photo</DialogTitle>
                </DialogHeader>
                {/* TODO: Set loading from mutate function */}
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
