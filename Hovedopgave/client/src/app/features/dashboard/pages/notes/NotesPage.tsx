import { useAccount } from '@/lib/hooks/useAccount';
import { useNotes } from '@/lib/hooks/useNotes';
import { useParams } from 'react-router';
import { HtmlContent } from '../../../../../components/HtmlContent';
import { PencilIcon } from 'lucide-react';
import { useState } from 'react';
import Tiptap from '@/components/rich-text-editor/TipTap';
import { Button } from '@/components/ui/button';
import { Note } from '@/lib/types';
import { toast } from 'react-toastify';
import Loader from '@/components/Loader';

export default function NotesPage() {
    const { id } = useParams();
    const { currentUser } = useAccount();
    const { note, noteIsLoading, editNote } = useNotes(id, currentUser?.id);
    const [editNoteContent, setEditNoteContent] = useState(note?.content || '');
    const [editMode, setEditMode] = useState(false);

    const changeEditMode = () => {
        setEditMode((prev) => !prev);
    };

    const handleEditChanges = () => {
        if (!note) {
            return;
        }

        const editedNote: Note = {
            id: note.id,
            userId: note.userId,
            campaignId: note.campaignId,
            content: editNoteContent,
        };

        console.log(editedNote);

        editNote.mutate(editedNote, {
            onSuccess: () => {
                toast('Saved notes successfully!', {
                    type: 'success',
                });
                setEditMode(false);
            },
            onError: () => {
                toast('Failed to save notes.', { type: 'error' });
            },
        });
    };

    if (noteIsLoading) {
        return <Loader />;
    }

    if (!note) {
        return (
            <div className='flex h-fit text-center text-2xl font-bold'>
                Note not found...
            </div>
        );
    }

    return (
        <main className='mt-5 flex w-full flex-col items-center gap-5'>
            <h1 className='text-3xl font-extrabold'>
                {currentUser?.displayName}'s Notes
            </h1>

            {editMode ? (
                <div className='relative animate-in fade-in'>
                    <Tiptap
                        content={note.content}
                        onChange={(newContent) =>
                            setEditNoteContent(newContent)
                        }
                    />
                    <Button
                        onClick={handleEditChanges}
                        className='absolute right-4 bottom-4 cursor-pointer'
                        size='sm'
                    >
                        Save
                    </Button>
                    <Button
                        onClick={() => setEditMode(false)}
                        className='absolute right-20 bottom-4 cursor-pointer'
                        size='sm'
                        variant='outline'
                    >
                        Cancel
                    </Button>
                </div>
            ) : (
                <article
                    key={note.id}
                    className='parchment-card relative animate-in rounded-2xl p-5 shadow fade-in'
                >
                    <PencilIcon
                        onClick={changeEditMode}
                        className='absolute -top-4 -right-4 cursor-pointer rounded-full bg-stone-600 p-2 text-stone-300 transition-colors hover:bg-stone-500'
                        size={40}
                    />

                    <HtmlContent
                        className='min-w-xl'
                        content={note?.content}
                    />
                </article>
            )}
        </main>
    );
}
