import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';
import LinkDialogWikiEntrySelect from './LinkDialogWikiEntrySelect';
import { useWiki } from '@/lib/hooks/useWiki';
import { useParams } from 'react-router';

type Props = {
    isLinkDialogOpen: boolean;
    setIsLinkDialogOpen: (open: boolean) => void;
    handleLink: (wikiId: string) => void;
};

export default function LinkDialog({
    isLinkDialogOpen,
    setIsLinkDialogOpen,
    handleLink,
}: Props) {
    const [isWikiEntrySelectOpen, setIsWikiEntrySelectOpen] = useState(false);
    const [wikiEntryValue, setWikiEntryValue] = useState('');
    const { id } = useParams();
    const { wikiEntries } = useWiki(id);

    return (
        <Dialog
            open={isLinkDialogOpen}
            onOpenChange={setIsLinkDialogOpen}
        >
            <DialogContent className='dnd-gradient-bg w-fit min-w-sm border-4'>
                <DialogHeader>
                    <DialogTitle className='text-center'>
                        Link to wiki entry
                    </DialogTitle>
                    <DialogDescription className='text-center text-yellow-500'>
                        Select a wiki entry
                    </DialogDescription>
                </DialogHeader>

                <section className='mx-auto flex flex-col justify-between gap-8'>
                    <LinkDialogWikiEntrySelect
                        open={isWikiEntrySelectOpen}
                        setOpen={setIsWikiEntrySelectOpen}
                        value={wikiEntryValue}
                        setValue={setWikiEntryValue}
                        wikiEntries={wikiEntries}
                    />
                    <div className='flex justify-between'>
                        <Button
                            variant='default'
                            onClick={() => handleLink(wikiEntryValue)}
                            className='cursor-pointer'
                        >
                            Confirm
                        </Button>
                        <Button
                            variant='outline'
                            onClick={() => setIsLinkDialogOpen(false)}
                            className='cursor-pointer'
                        >
                            Cancel
                        </Button>
                    </div>
                </section>
            </DialogContent>
        </Dialog>
    );
}
