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
import { useAccount } from '@/lib/hooks/useAccount';
import { useCampaigns } from '@/lib/hooks/useCampaigns';
import { toast } from 'react-toastify';

export default function WikiEntryForm() {
    const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false);
    const [photo, setPhoto] = useState<Blob | undefined>();

    const { id, entryId } = useParams();

    const { currentUser } = useAccount();
    const { campaign } = useCampaigns(id);
    const {
        createWikiEntry,
        uploadWikiEntryPhoto,
        wikiEntry,
        wikiEntryIsLoading,
        deleteWikiEntry,
        updateWikiEntry,
    } = useWiki(id, entryId);

    const navigate = useNavigate();

    const form = useForm<WikiEntrySchema>({
        resolver: zodResolver(wikiEntrySchema),
        mode: 'onTouched',
        defaultValues: {
            name: '',
            content: '',
            type: '',
        },
    });

    // Set form values when wiki entry data is loaded
    useEffect(() => {
        if (wikiEntry) {
            form.reset({
                name: wikiEntry.name,
                content: wikiEntry.content,
                type: wikiEntry.type,
            });

            console.log('Form values set:', form.getValues());
        }
    }, [wikiEntry, form]);

    const handleSubmit = async (data: WikiEntrySchema) => {
        const newEntry = {
            name: data.name,
            type: data.type,
            content: data.content,
            campaignId: id,
        } as WikiEntry;

        if (!wikiEntry) {
            if (photo) {
                uploadWikiEntryPhoto.mutate(photo, {
                    onSuccess: (photoData) => {
                        newEntry.photoId = photoData.id;

                        createWikiEntry.mutate(newEntry, {
                            onSuccess: (wikiEntryId) => {
                                navigate(`../${wikiEntryId}`);
                            },
                            onError: () => {
                                toast(`Soemthing went wrong creating entry`, {
                                    type: 'error',
                                });
                            },
                        });
                    },
                });
            } else {
                createWikiEntry.mutate(newEntry, {
                    onSuccess: (wikiEntryId) => {
                        navigate(`../${wikiEntryId}`);
                    },
                    onError: () => {
                        toast(`Soemthing went wrong creating entry`, {
                            type: 'error',
                        });
                    },
                });
            }
        } else {
            newEntry.id = wikiEntry.id;
            newEntry.photoId = wikiEntry.photo?.id;
            newEntry.xmin = wikiEntry.xmin;

            updateWikiEntry.mutate(newEntry, {
                onSuccess: (wikiEntry) => {
                    toast(`Updated wiki entry with id: ${wikiEntry.id}`, {
                        type: 'success',
                    });
                    navigate(`../../${wikiEntry.id}`);
                },
                onError: () => {
                    toast(`Soemthing went wrong updating entry`, {
                        type: 'error',
                    });
                },
            });
        }
    };

    const handleDelete = async () => {
        deleteWikiEntry.mutate(wikiEntry!.id!, {
            onSuccess: (wikiEntryId) => {
                navigate(`/campaigns/dashboard/${id}/wiki`);
                toast(`Deleted wiki entry with id: ${wikiEntryId}`, {
                    type: 'success',
                });
            },
            onError: () => {
                toast(`Soemthing went wrong deleting entry`, {
                    type: 'error',
                });
            },
        });
    };

    const handleSetPhoto = (file: Blob) => {
        setPhoto(file);
        setIsPhotoDialogOpen(false);
    };

    const photoUrl = wikiEntry
        ? wikiEntry.photo?.url
        : photo
          ? URL.createObjectURL(photo)
          : undefined;

    const isUserDm = currentUser?.id === campaign?.dungeonMaster.id;

    useEffect(() => {
        return () => {
            if (photoUrl) URL.revokeObjectURL(photoUrl);
        };
    }, [photoUrl]);

    if (wikiEntryIsLoading) {
        return <div>Loading entry</div>;
    }

    return (
        <>
            <div className='mt-10 flex w-full items-center justify-center'>
                <div className='prose max-w-lg rounded-lg bg-white p-6 shadow-sm'>
                    <h1 className='mb-6 text-center'>
                        {wikiEntry ? 'Update Wiki Entry' : 'Create Wiki Entry'}
                    </h1>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleSubmit)}
                            className='space-y-6'
                        >
                            <div className='flex gap-4'>
                                <div
                                    onClick={
                                        wikiEntry
                                            ? undefined
                                            : () => setIsPhotoDialogOpen(true)
                                    }
                                    className={`flex aspect-square w-1/3 flex-1/2 items-center justify-center overflow-hidden rounded-lg bg-gray-100 shadow-md ${wikiEntry ? '' : 'cursor-pointer'}`}
                                >
                                    {photoUrl ? (
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
                                            <FormItem key={field.value}>
                                                <FormLabel>Type</FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    value={field.value}
                                                    defaultValue={field.value}
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
                            <div className='flex justify-between'>
                                {wikiEntry && isUserDm && (
                                    <Button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleDelete();
                                        }}
                                        className=''
                                        disabled={deleteWikiEntry.isPending}
                                        variant={'destructive'}
                                    >
                                        Delete entry
                                    </Button>
                                )}
                                <Button
                                    type='submit'
                                    className={`${wikiEntry ? '' : 'w-full'}`}
                                    disabled={
                                        !form.formState.isValid ||
                                        form.formState.isSubmitting ||
                                        createWikiEntry.isPending ||
                                        uploadWikiEntryPhoto.isPending ||
                                        deleteWikiEntry.isPending
                                    }
                                >
                                    {wikiEntry
                                        ? 'Update Entry'
                                        : 'Create Entry'}
                                </Button>
                            </div>
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
