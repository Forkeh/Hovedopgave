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
import { useLocation, useNavigate, useParams } from 'react-router';
import Tiptap from '@/components/rich-text-editor/TipTap';
import { Character } from '@/lib/types';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { useAccount } from '@/lib/hooks/useAccount';
import { useCampaigns } from '@/lib/hooks/useCampaigns';
import { toast } from 'react-toastify';
import PhotoDialog from '../../../../../components/photo-dialog/PhotoDialog';
import {
    characterSchema,
    CharacterSchema,
} from '@/lib/schemas/characterSchema';
import { CharacterClass } from '@/lib/enums/CharacterClass';
import { CharacterRace } from '@/lib/enums/CharacterRace';
import { useCharacters } from '@/lib/hooks/useCharacters';

export default function CharacterForm() {
    const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false);
    const [photo, setPhoto] = useState<Blob | undefined>();

    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();

    const { currentUser } = useAccount();

    const characterToEdit: Character | undefined =
        location.state?.characterToEdit;

    const {
        createCharacter,
        updateCharacter,
        deleteCharacter,
        uploadCharacterPhoto,
    } = useCharacters();

    const photoUrl = characterToEdit
        ? characterToEdit.photo?.url
        : photo
          ? URL.createObjectURL(photo)
          : undefined;

    const isEditMode = !!characterToEdit;

    console.log('characterToEdit: ', characterToEdit, 'EditMode: ', isEditMode);

    const isUsersCharacter = currentUser?.id === characterToEdit?.userId;

    const form = useForm<CharacterSchema>({
        resolver: zodResolver(characterSchema),
        mode: 'onTouched',
        defaultValues: {
            name: '',
            class: CharacterClass.Barbarian,
            race: CharacterRace.Human,
            backstory: '',
        },
    });

    // Set form values when wiki entry data is loaded
    useEffect(() => {
        if (characterToEdit) {
            form.reset({
                name: characterToEdit.name,
                class: characterToEdit.class,
                race: characterToEdit.race,
                backstory: characterToEdit.backstory,
            });
        }
    }, [characterToEdit, form]);

    const handleSubmit = async (data: CharacterSchema) => {
        const characterData: Character = {
            name: data.name,
            class: data.class,
            race: data.race,
            backstory: data.backstory,
            userId: currentUser!.id,
            campaignId: id!,
            ...(isEditMode && {
                id: characterToEdit.id,
                photoId: characterToEdit.photo?.id,
            }),
        };

        if (isEditMode) {
            // Update existing character
            updateCharacter.mutate(characterData, {
                onSuccess: () => {
                    toast('Character updated successfully', {
                        type: 'success',
                    });
                    navigate(`..`, { relative: 'path' });
                },
                onError: () => {
                    toast('Failed to update character', {
                        type: 'error',
                    });
                },
            });
        } else {
            // Create new character
            createCharacter.mutate(characterData, {
                onSuccess: (newCharacterId) => {
                    handleUploadCharacterPhoto(newCharacterId);

                    toast('Character created successfully', {
                        type: 'success',
                    });

                    navigate(`../${newCharacterId}`);
                },
                onError: () => {
                    toast('Failed to create character', {
                        type: 'error',
                    });
                },
            });
        }

        const handleUploadCharacterPhoto = (characterId: string) => {
            // If we have a new photo to upload
            if (photo && !isEditMode) {
                uploadCharacterPhoto.mutate(
                    { file: photo, characterId },
                    {
                        onSuccess: (photoData) => {
                            characterData.photoId = photoData.id;
                        },
                        onError: () => {
                            toast('Failed to upload photo', { type: 'error' });
                        },
                    },
                );
            }
        };
    };

    const handleDelete = async () => {
        if (!characterToEdit?.id) {
            return;
        }

        deleteCharacter.mutate(characterToEdit.id, {
            onSuccess: (characterId) => {
                navigate(`/campaigns/dashboard/${id}/players`);
                toast(`Deleted character with id: ${characterId}`, {
                    type: 'success',
                });
            },
            onError: () => {
                toast(`Something went wrong deleting character`, {
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

    return (
        <>
            <div className='mt-10 flex w-full items-center justify-center'>
                <div className='prose max-w-lg rounded-lg bg-white p-6 shadow-sm'>
                    <h1 className='mb-6 text-center'>
                        {isEditMode ? 'Update Character' : 'Create Character'}
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
                                        name='race'
                                        render={({ field }) => (
                                            <FormItem key={field.value}>
                                                <FormLabel>Race</FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    value={field.value}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className='w-full'>
                                                            <SelectValue placeholder='Select race' />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {Object.values(
                                                            CharacterRace,
                                                        ).map((raceValue) => (
                                                            <SelectItem
                                                                key={raceValue}
                                                                value={
                                                                    raceValue
                                                                }
                                                            >
                                                                <span>
                                                                    {raceValue}
                                                                </span>
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='class'
                                        render={({ field }) => (
                                            <FormItem key={field.value}>
                                                <FormLabel>Class</FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    value={field.value}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className='w-full'>
                                                            <SelectValue placeholder='Select class' />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {Object.values(
                                                            CharacterClass,
                                                        ).map((classValue) => (
                                                            <SelectItem
                                                                key={classValue}
                                                                value={
                                                                    classValue
                                                                }
                                                            >
                                                                <span>
                                                                    {classValue}
                                                                </span>
                                                            </SelectItem>
                                                        ))}
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
                                name='backstory'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Backstory</FormLabel>
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
                                {isEditMode && isUsersCharacter && (
                                    <Button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleDelete();
                                        }}
                                        className=''
                                        disabled={deleteCharacter.isPending}
                                        variant={'destructive'}
                                    >
                                        Delete character
                                    </Button>
                                )}
                                <Button
                                    type='submit'
                                    className={`${isEditMode ? '' : 'w-full'}`}
                                    disabled={
                                        !form.formState.isValid ||
                                        form.formState.isSubmitting ||
                                        createCharacter.isPending ||
                                        uploadCharacterPhoto.isPending ||
                                        deleteCharacter.isPending
                                    }
                                >
                                    {isEditMode
                                        ? 'Update Character'
                                        : 'Create Character'}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
            {isPhotoDialogOpen && (
                <PhotoDialog
                    isPhotoDialogOpen={isPhotoDialogOpen}
                    setIsPhotoDialogOpen={setIsPhotoDialogOpen}
                    onSetPhoto={handleSetPhoto}
                />
            )}
        </>
    );
}
