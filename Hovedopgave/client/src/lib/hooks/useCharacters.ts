import { useQuery, useQueryClient } from '@tanstack/react-query';
import agent from '../api/agent';
import { Character } from '../types';

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

    return { characters, charactersIsLoading };
};
