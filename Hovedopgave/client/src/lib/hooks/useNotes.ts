import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Note } from '../types';
import agent from '../api/agent';

export const useNotes = (campaignId?: string, userId?: string) => {
    const queryClient = useQueryClient();

    const { data: note, isLoading: noteIsLoading } = useQuery({
        queryKey: ['notes', campaignId, userId],
        queryFn: async () => {
            const response = await agent.get<Note>(`/notes/${campaignId}`);
            return response.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        enabled: !!campaignId && !!userId,
    });

    const editNote = useMutation({
        mutationFn: async (editedNote: Note) => {
            const response = await agent.put('/notes', editedNote);
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['notes', campaignId, userId],
            });
        },
    });

    return { note, noteIsLoading, editNote };
};
