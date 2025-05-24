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
import { toast } from 'react-toastify';
import PhotoDialog from '../../../../../components/photo-dialog/PhotoDialog';
import {
    characterSchema,
    CharacterSchema,
} from '@/lib/schemas/characterSchema';
import { CharacterClass } from '@/lib/enums/CharacterClass';
import { CharacterRace } from '@/lib/enums/CharacterRace';
import { useCharacters } from '@/lib/hooks/useCharacters';
import ConfirmationDialog from '@/components/confirmation-dialog/ConfirmationDialog';

export default function CharacterForm() {
    const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false);
    const [isRetirementDialogOpen, setIsRetirementDialogOpen] = useState(false);
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
        retireCharacter,
        uploadCharacterPhoto,
    } = useCharacters(id);

    const photoUrl = characterToEdit
        ? characterToEdit.photo?.url
        : photo
          ? URL.createObjectURL(photo)
          : undefined;

    const isEditMode = !!characterToEdit;

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

    // Set form values when character data is loaded
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
            isRetired: false,
            userId: currentUser!.id,
            campaignId: id!,
            ...(isEditMode && {
                id: characterToEdit.id,
                photoId: characterToEdit.photo?.id,
            }),
        };

        const handleUploadCharacterPhoto = async (
            characterId: string,
            baseCharacterData: Character,
        ) => {
            // If we have a new photo to upload
            if (photo && !isEditMode) {
                await uploadCharacterPhoto.mutateAsync(
                    { file: photo, characterId },
                    {
                        onSuccess: (photoData) => {
                            const characterToUpdate: Character = {
                                ...baseCharacterData,
                                id: characterId,
                                photoId: photoData.id,
                            };

                            updateCharacter.mutate(characterToUpdate, {
                                onSuccess: () => {
                                    toast(
                                        'Character photo linked successfully!',
                                        { type: 'success' },
                                    );
                                },
                                onError: () => {
                                    toast(
                                        'Failed to link photo to character.',
                                        { type: 'error' },
                                    );
                                },
                            });
                        },
                        onError: () => {
                            toast('Failed to upload photo', { type: 'error' });
                        },
                    },
                );
            }
        };

        if (isEditMode) {
            // Update existing character
            updateCharacter.mutate(characterData, {
                onSuccess: () => {
                    toast('Character updated successfully', {
                        type: 'success',
                    });
                    navigate(`/campaigns/dashboard/${id}/players`);
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
                onSuccess: async (newCharacterId) => {
                    await handleUploadCharacterPhoto(
                        newCharacterId,
                        characterData,
                    );

                    toast('Character created successfully', {
                        type: 'success',
                    });

                    navigate(`/campaigns/dashboard/${id}/players`);
                },
                onError: () => {
                    toast('Failed to create character', {
                        type: 'error',
                    });
                },
            });
        }
    };

    const handleRetireCharacter = async () => {
        if (!characterToEdit?.id) {
            return;
        }

        retireCharacter.mutate(characterToEdit.id, {
            onSuccess: () => {
                navigate(`/campaigns/dashboard/${id}/players`);
                toast(`Retired character: ${characterToEdit.name}`, {
                    type: 'success',
                });
            },
            onError: () => {
                toast(`Something went wrong retiring character`, {
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
                <div className='dnd-gradient-bg prose max-w-4xl rounded-lg p-6 text-yellow-100 shadow-sm'>
                    <h1 className='mb-6 text-center text-yellow-100'>
                        {isEditMode ? 'Update Character' : 'Create Character'}
                    </h1>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleSubmit)}
                            className='space-y-6'
                        >
                            <div className='mx-auto flex w-3/4 justify-center gap-4'>
                                <div
                                    onClick={
                                        isEditMode
                                            ? undefined
                                            : () => setIsPhotoDialogOpen(true)
                                    }
                                    className={`flex aspect-square w-1/3 flex-1/2 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-orange-100 to-orange-200 shadow-md ${isEditMode ? '' : 'cursor-pointer'}`}
                                >
                                    {photoUrl ? (
                                        <img
                                            src={photoUrl}
                                            alt='Photo preview'
                                            className='h-full w-full object-cover'
                                        />
                                    ) : (
                                        <span className='text-black'>
                                            No image
                                        </span>
                                    )}
                                </div>
                                <div className='flex w-2/3 flex-col justify-center gap-3'>
                                    <FormField
                                        control={form.control}
                                        name='name'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='font-bold text-yellow-500'>
                                                    Name
                                                </FormLabel>
                                                <FormControl className='bg-orange-100 text-black'>
                                                    <Input
                                                        placeholder='Type character name'
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
                                                <FormLabel className='font-bold text-yellow-500'>
                                                    Race
                                                </FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    value={field.value}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl className='bg-orange-100 text-black'>
                                                        <SelectTrigger className='w-full'>
                                                            <SelectValue placeholder='Select race' />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className='bg-orange-100 text-black'>
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
                                                <FormLabel className='font-bold text-yellow-500'>
                                                    Class
                                                </FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    value={field.value}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl className='bg-orange-100 text-black'>
                                                        <SelectTrigger className='w-full'>
                                                            <SelectValue placeholder='Select class' />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className='bg-orange-100 text-black'>
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
                                        <FormLabel className='block w-full text-center text-xl text-yellow-500'>
                                            Backstory
                                        </FormLabel>
                                        <FormControl>
                                            <div className='flex justify-center'>
                                                <Tiptap
                                                    content={field.value}
                                                    onChange={(newContent) => {
                                                        field.onChange(
                                                            newContent,
                                                        );
                                                    }}
                                                    maxHeight='max-h-70'
                                                />
                                            </div>
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
                                            setIsRetirementDialogOpen(true);
                                        }}
                                        className=''
                                        disabled={retireCharacter.isPending}
                                        variant={'destructive'}
                                    >
                                        Retire character
                                    </Button>
                                )}
                                <Button
                                    type='submit'
                                    className={`cursor-pointer ${isEditMode ? '' : 'w-full'}`}
                                    disabled={
                                        !form.formState.isValid ||
                                        form.formState.isSubmitting ||
                                        createCharacter.isPending ||
                                        uploadCharacterPhoto.isPending ||
                                        retireCharacter.isPending
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

            <PhotoDialog
                isPhotoDialogOpen={isPhotoDialogOpen}
                setIsPhotoDialogOpen={setIsPhotoDialogOpen}
                onSetPhoto={handleSetPhoto}
            />

            <ConfirmationDialog
                title='Retire Character?'
                description='Retiring a character is permanent!'
                isConfirmationDialogOpen={isRetirementDialogOpen}
                setIsConfirmationDialogOpen={setIsRetirementDialogOpen}
                handleConfirmation={handleRetireCharacter}
            />
        </>
    );
}
