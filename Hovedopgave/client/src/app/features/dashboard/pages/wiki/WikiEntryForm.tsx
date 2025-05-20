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
import PhotoDialog from '../../../../../components/photo-dialog/PhotoDialog';
import { useAccount } from '@/lib/hooks/useAccount';
import { useCampaigns } from '@/lib/hooks/useCampaigns';
import { toast } from 'react-toastify';
import { WikiEntryType } from '@/lib/enums/wikiEntryType';
import ConfirmationDialog from '@/components/confirmation-dialog/ConfirmationDialog';
import { Checkbox } from '@/components/ui/checkbox';

export default function WikiEntryForm() {
    const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false);
    const [isDeleteWikiEntryDialogOpen, setIsDeleteWikiEntryDialogOpen] =
        useState(false);
    const [photo, setPhoto] = useState<Blob | undefined>();

    const navigate = useNavigate();
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

    const photoUrl = wikiEntry
        ? wikiEntry.photo?.url
        : photo
          ? URL.createObjectURL(photo)
          : undefined;

    const isEditMode = !!wikiEntry;

    const isUserDm = currentUser?.id === campaign?.dungeonMaster.id;

    const form = useForm<WikiEntrySchema>({
        resolver: zodResolver(wikiEntrySchema),
        mode: 'onTouched',
        defaultValues: {
            name: '',
            content: '',
            type: WikiEntryType.Npc,
            isVisible: false,
        },
    });

    // Set form values when wiki entry data is loaded
    useEffect(() => {
        if (wikiEntry) {
            form.reset({
                name: wikiEntry.name,
                content: wikiEntry.content,
                type: wikiEntry.type,
                isVisible: wikiEntry.isVisible,
            });
        }
    }, [wikiEntry, form]);

    const handleSubmit = async (data: WikiEntrySchema) => {
        const entryData: WikiEntry = {
            name: data.name,
            type: data.type,
            content: data.content,
            isVisible: data.isVisible,
            campaignId: id!,
            ...(isEditMode && {
                id: wikiEntry.id,
                photoId: wikiEntry.photo?.id,
                xmin: wikiEntry.xmin,
            }),
        };

        const handleCreateOrUpdate = () => {
            if (isEditMode) {
                // Update existing entry
                updateWikiEntry.mutate(entryData, {
                    onSuccess: () => {
                        toast('Wiki entry updated successfully', {
                            type: 'success',
                        });
                        navigate(`..`, { relative: 'path' });
                    },
                    onError: () => {
                        toast('Failed to update wiki entry', {
                            type: 'error',
                        });
                    },
                });
            } else {
                // Create new entry
                createWikiEntry.mutate(entryData, {
                    onSuccess: (newEntryId) => {
                        toast('Wiki entry created successfully', {
                            type: 'success',
                        });
                        navigate(`../${newEntryId}`);
                    },
                    onError: () => {
                        toast('Failed to create wiki entry', {
                            type: 'error',
                        });
                    },
                });
            }
        };

        // If we have a new photo to upload
        if (photo && !isEditMode) {
            uploadWikiEntryPhoto.mutate(photo, {
                onSuccess: (photoData) => {
                    entryData.photoId = photoData.id;
                    handleCreateOrUpdate();
                },
                onError: () => {
                    toast('Failed to upload photo', { type: 'error' });
                },
            });
        } else {
            handleCreateOrUpdate();
        }
    };

    const handleDeleteWikiEntry = async () => {
        if (!wikiEntry?.id) {
            return;
        }

        deleteWikiEntry.mutate(wikiEntry.id, {
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
                <div className='prose max-w-2xl rounded-lg bg-white p-6 shadow-sm'>
                    <h1 className='mb-6 text-center'>
                        {isEditMode ? 'Update Wiki Entry' : 'Create Wiki Entry'}
                    </h1>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleSubmit)}
                            className='space-y-6'
                        >
                            <div className='flex gap-4'>
                                <div
                                    onClick={
                                        isEditMode
                                            ? undefined
                                            : () => setIsPhotoDialogOpen(true)
                                    }
                                    className={`flex aspect-square w-1/3 flex-1/2 items-center justify-center overflow-hidden rounded-lg bg-gray-100 shadow-md ${isEditMode ? '' : 'cursor-pointer'}`}
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
                                <div className='flex w-3/4 flex-col justify-center gap-6'>
                                    <FormField
                                        control={form.control}
                                        name='name'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='font-bold'>
                                                    Name
                                                </FormLabel>
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
                                                <FormLabel className='font-bold'>
                                                    Type
                                                </FormLabel>
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
                                                        {Object.values(
                                                            WikiEntryType,
                                                        ).map((type) => (
                                                            <SelectItem
                                                                key={type}
                                                                value={type}
                                                            >
                                                                <span>
                                                                    {type}
                                                                </span>
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {isUserDm && (
                                        <FormField
                                            control={form.control}
                                            name='isVisible'
                                            render={({ field }) => (
                                                <FormItem className='flex flex-row items-center justify-center'>
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={
                                                                field.value
                                                            }
                                                            onCheckedChange={
                                                                field.onChange
                                                            }
                                                            className='h-4 w-4'
                                                        />
                                                    </FormControl>
                                                    <FormLabel>
                                                        Is Visible to Players
                                                    </FormLabel>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )}
                                </div>
                            </div>
                            <FormField
                                control={form.control}
                                name='content'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='block w-full text-center text-xl'>
                                            Content
                                        </FormLabel>
                                        <FormControl>
                                            <Tiptap
                                                content={field.value}
                                                onChange={(newContent) => {
                                                    field.onChange(newContent);
                                                }}
                                                maxHeight='max-h-70'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='flex justify-between'>
                                {isEditMode && isUserDm && (
                                    <Button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setIsDeleteWikiEntryDialogOpen(
                                                true,
                                            );
                                        }}
                                        disabled={deleteWikiEntry.isPending}
                                        variant={'destructive'}
                                    >
                                        Delete Entry
                                    </Button>
                                )}
                                <Button
                                    type='submit'
                                    className={`${isEditMode ? '' : 'w-full'}`}
                                    disabled={
                                        !form.formState.isValid ||
                                        form.formState.isSubmitting ||
                                        createWikiEntry.isPending ||
                                        uploadWikiEntryPhoto.isPending ||
                                        deleteWikiEntry.isPending
                                    }
                                >
                                    {isEditMode
                                        ? 'Update Entry'
                                        : 'Create Entry'}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>

            <PhotoDialog
                isPhotoDialogOpen={isPhotoDialogOpen}
                setIsPhotoDialogOpen={setIsPhotoDialogOpen}
                onSetPhoto={handleSetPhoto}
            />

            <ConfirmationDialog
                title='Delete Wiki Entry?'
                description='This action cannot be undone!'
                isConfirmationDialogOpen={isDeleteWikiEntryDialogOpen}
                setIsConfirmationDialogOpen={setIsDeleteWikiEntryDialogOpen}
                handleConfirmation={handleDeleteWikiEntry}
            />
        </>
    );
}
