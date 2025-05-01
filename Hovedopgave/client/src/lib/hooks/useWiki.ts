import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import agent from '../api/agent';

export const useWiki = (campaignId?: string) => {
    const queryClient = useQueryClient();

    const { data: wikiEntries, isLoading: wikiEntriesIsLoading } = useQuery({
        queryKey: ['wiki', campaignId],
        queryFn: async () => {
            const response = await agent.get<WikiEntry[]>(
                `/wiki/campaign/${campaignId}`,
            );
            return response.data;
        },
        // enabled: !campaignId && location.pathname === '/campaigns',
    });

    // const { data: campaign, isLoading: campaignIsLoading } = useQuery({
    //     queryKey: ['campaign', campaignId],
    //     queryFn: async () => {
    //         const response = await agent.get<Campaign>(
    //             `/campaigns/${campaignId}`,
    //         );
    //         return response.data;
    //     },
    //     enabled: !!campaignId,
    // });

    // const createCampaign = useMutation({
    //     mutationFn: async (campaign: { Name: string }) => {
    //         const response = await agent.post('/campaigns', campaign);
    //         return response.data;
    //     },
    //     onSuccess: async () => {
    //         await queryClient.invalidateQueries({
    //             queryKey: ['campaigns'],
    //         });
    //     },
    // });

    // const deleteCampaign = useMutation({
    //     mutationFn: async () => {
    //         const response = await agent.delete(`/campaigns/${campaignId}`);
    //         return response.data;
    //     },
    //     onSuccess: async () => {
    //         await queryClient.invalidateQueries({
    //             queryKey: ['campaigns', campaignId],
    //         });
    //     },
    // });

    // const uploadCampaignMap = useMutation({
    //     mutationFn: async (file: Blob) => {
    //         const formData = new FormData();
    //         formData.append('file', file);
    //         const response = await agent.post(
    //             `/photos/add-campaign-photo/${campaignId}`,
    //             formData,
    //             {
    //                 headers: { 'Content-Type': 'multipart/form-data' },
    //             },
    //         );
    //         return response.data;
    //     },
    //     onSuccess: async () => {
    //         await queryClient.invalidateQueries({
    //             queryKey: ['campaign', campaignId],
    //         });
    //     },
    // });

    // const setCampaignMapPins = useMutation({
    //     mutationFn: async (pins: Pin[]) => {
    //         const response = await agent.post(
    //             `/campaigns/${campaignId}/pins`,
    //             pins,
    //         );
    //         return response.data;
    //     },
    //     onSuccess: async () => {
    //         await queryClient.invalidateQueries({
    //             queryKey: ['campaign', campaignId],
    //         });
    //     },
    // });

    // const addPlayerToCampaign = useMutation({
    //     mutationFn: async (playerEmail: string) => {
    //         const response = await agent.post(
    //             `/campaigns/${campaignId}/add-player`,
    //             {
    //                 username: playerEmail,
    //             },
    //         );
    //         return response.data;
    //     },
    //     onSuccess: async () => {
    //         await queryClient.invalidateQueries({
    //             queryKey: ['campaign', campaignId],
    //         });
    //     },
    // });

    return {
        wikiEntries,
        wikiEntriesIsLoading,
    };
};
