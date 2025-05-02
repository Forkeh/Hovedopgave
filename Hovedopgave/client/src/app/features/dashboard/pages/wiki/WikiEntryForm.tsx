import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useNavigate, useParams } from 'react-router';
import {
    wikiEntrySchema,
    WikiEntrySchema,
} from '@/lib/schemas/wikiEntrySchema';
import Tiptap from '@/components/rich-text-editor/TipTap';
import { WikiEntry } from '@/lib/types';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useWiki } from '@/lib/hooks/useWiki';
import { useEffect, useState } from 'react';
import WikiPhotoDialog from './WikiPhotoDialog';

export default function WikiEntryForm() {
    const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false);
    const [photo, setPhoto] = useState<Blob | undefined>();
    const navigate = useNavigate();
    const { id } = useParams();
    const { createWikiEntry, uploadWikiEntryPhoto } = useWiki(id);

    const form = useForm<WikiEntrySchema>({
        resolver: zodResolver(wikiEntrySchema),
        mode: 'onTouched',
        defaultValues: {
            name: '',
            content: '',
            type: '',
        },
    });

    const handleSubmit = async (data: WikiEntrySchema) => {
        const newEntry = {
            name: data.name,
            type: data.type,
            content: data.content,
            campaignId: id,
        } as WikiEntry;

        if (photo) {
            uploadWikiEntryPhoto.mutate(photo, {
                onSuccess: (photoData) => {
                    newEntry.photoId = photoData.id;

                    createWikiEntry.mutate(newEntry, {
                        onSuccess: (wikiEntryId) => {
                            navigate(`../${wikiEntryId}`);
                        },
                    });
                },
            });
        } else {
            createWikiEntry.mutate(newEntry, {
                onSuccess: (wikiEntryId) => {
                    navigate(`../${wikiEntryId}`);
                },
            });
        }
    };

    const handleSetPhoto = (file: Blob) => {
        setPhoto(file);
        setIsPhotoDialogOpen(false);
    };

    const photoUrl = photo ? URL.createObjectURL(photo) : undefined;

    useEffect(() => {
        return () => {
            if (photoUrl) URL.revokeObjectURL(photoUrl);
        };
    }, [photoUrl]);

    return (
        <>
            <div className='mt-10 flex w-full items-center justify-center'>
                <div className='prose max-w-lg rounded-lg bg-white p-6 shadow-sm'>
                    <h1 className='mb-6 text-center'>Create wiki entry</h1>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleSubmit)}
                            className='space-y-6'
                        >
                            <div className='flex gap-4'>
                                <div
                                    onClick={() => setIsPhotoDialogOpen(true)}
                                    className='flex aspect-square w-1/3 flex-1/2 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gray-100 shadow-md'
                                >
                                    {photo ? (
                                        <img
                                            src={photoUrl}
                                            alt='Photo preview'
                                            className='h-full w-full object-cover'
                                        />
                                    ) : (
                                        <span className='text-gray-400'>
                                            Add image
                                        </span>
                                    )}
                                </div>
                                <div className='flex w-full flex-col justify-center'>
                                    <FormField
                                        control={form.control}
                                        name='name'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder='Type entry name'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='type'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Type</FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                    value={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className='w-full'>
                                                            <SelectValue placeholder='Select entry type' />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value='Npc'>
                                                            <span>NPC</span>
                                                        </SelectItem>
                                                        <SelectItem value='Location'>
                                                            <span>
                                                                Location
                                                            </span>
                                                        </SelectItem>
                                                        <SelectItem value='Lore'>
                                                            <span>Lore</span>
                                                        </SelectItem>
                                                        <SelectItem value='Quest'>
                                                            <span>Quest</span>
                                                        </SelectItem>
                                                        <SelectItem value='Item'>
                                                            <span>Item</span>
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <FormField
                                control={form.control}
                                name='content'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Content</FormLabel>
                                        <FormControl>
                                            <Tiptap
                                                content={field.value}
                                                onChange={(newContent) => {
                                                    field.onChange(newContent);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type='submit'
                                className='w-full'
                                disabled={
                                    !form.formState.isValid ||
                                    form.formState.isSubmitting ||
                                    createWikiEntry.isPending
                                }
                            >
                                Create Entry
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
            {isPhotoDialogOpen && (
                <WikiPhotoDialog
                    isPhotoDialogOpen={isPhotoDialogOpen}
                    setIsPhotoDialogOpen={setIsPhotoDialogOpen}
                    onSetPhoto={handleSetPhoto}
                />
            )}
        </>
    );
}
