import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import agent from '../api/agent';
import { Character, Photo } from '../types';
import { AxiosError } from 'axios';

export const useCharacters = (campaignId?: string) => {
    const queryClient = useQueryClient();

    const { data: characters, isLoading: charactersIsLoading } = useQuery({
        queryKey: ['characters', campaignId],
        queryFn: async () => {
            const response = await agent.get<Character[]>(
                `/characters/campaign/${campaignId}`,
            );
            return response.data;
        },
        enabled: !!campaignId,
    });

    type CharacterPhotoUploadVariables = {
        file: Blob;
        characterId: string;
    };

    const uploadCharacterPhoto = useMutation<
        Photo,
        AxiosError,
        CharacterPhotoUploadVariables
    >({
        mutationFn: async (variables: CharacterPhotoUploadVariables) => {
            const { file, characterId } = variables;

            const formData = new FormData();
            formData.append('file', file);
            const response = await agent.post(
                `/photos/add-character-photo/${characterId}`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                },
            );
            console.log('RESPONSE: ', response.data);

            return response.data;
        },
    });

    const createCharacter = useMutation<string, AxiosError, Character>({
        mutationFn: async (character: Character) => {
            console.log('character: ', character);

            const response = await agent.post('/characters', character);
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['characters', campaignId],
            });
        },
    });

    const updateCharacter = useMutation<string, AxiosError, Character>({
        mutationFn: async (character: Character) => {
            const response = await agent.put('/characters', character);
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['characters', campaignId],
            });
        },
    });

    const deleteCharacter = useMutation<string, AxiosError, string>({
        mutationFn: async (characterId: string) => {
            const response = await agent.delete(`/characters/${characterId}`);
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['characters', campaignId],
            });
        },
    });

    return {
        characters,
        charactersIsLoading,
        createCharacter,
        uploadCharacterPhoto,
        updateCharacter,
        deleteCharacter,
    };
};
