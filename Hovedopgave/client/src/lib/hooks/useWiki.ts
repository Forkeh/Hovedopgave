import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import agent from '../api/agent';
import { Photo, WikiEntry } from '../types';
import { AxiosError } from 'axios';

export const useWiki = (campaignId?: string, entryId?: string) => {
    const queryClient = useQueryClient();

    const { data: wikiEntries, isLoading: wikiEntriesIsLoading } = useQuery({
        queryKey: ['wikiCampaignList', campaignId],
        queryFn: async () => {
            const response = await agent.get<WikiEntry[]>(
                `/wiki/campaign/${campaignId}`,
            );
            return response.data;
        },
        enabled: !!campaignId,
    });

    const { data: wikiEntry, isLoading: wikiEntryIsLoading } = useQuery({
        queryKey: ['wikiEntry', entryId],
        queryFn: async () => {
            const response = await agent.get<WikiEntry>(`/wiki/${entryId}`);
            return response.data;
        },
        enabled: !!entryId,
    });

    const uploadWikiEntryPhoto = useMutation<Photo, AxiosError, Blob>({
        mutationFn: async (file: Blob) => {
            const formData = new FormData();
            formData.append('file', file);
            const response = await agent.post(
                `/photos/add-wiki-entry-photo/${campaignId}`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                },
            );
            return response.data;
        },
    });

    const createWikiEntry = useMutation<string, AxiosError, WikiEntry>({
        mutationFn: async (wikiEntry: WikiEntry) => {
            const response = await agent.post('/wiki', wikiEntry);
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['wikiCampaignList', campaignId],
            });
        },
    });

    const deleteWikiEntry = useMutation({
        mutationFn: async (wikiEntryId: string) => {
            const response = await agent.delete(`/wiki/${wikiEntryId}`);
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['wikiCampaignList', campaignId],
            });
        },
    });

    const updateWikiEntry = useMutation<WikiEntry, AxiosError, WikiEntry>({
        mutationFn: async (wikiEntry: WikiEntry) => {
            const response = await agent.put('/wiki', wikiEntry);
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['wikiEntry', entryId],
            });

            await queryClient.invalidateQueries({
                queryKey: ['wikiCampaignList', campaignId],
            });
        },
    });

    return {
        wikiEntries,
        wikiEntriesIsLoading,
        wikiEntry,
        wikiEntryIsLoading,
        createWikiEntry,
        uploadWikiEntryPhoto,
        deleteWikiEntry,
        updateWikiEntry,
    };
};
