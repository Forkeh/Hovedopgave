import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import agent from '../api/agent';
import { Campaign, Pin } from '../types';
import { AxiosError } from 'axios';

export const useCampaigns = (id?: string) => {
    const queryClient = useQueryClient();

    const { data: campaigns, isLoading: campaignsIsLoading } = useQuery({
        queryKey: ['campaigns'],
        queryFn: async () => {
            const response = await agent.get<Campaign[]>('/campaigns');
            return response.data;
        },
        enabled: !id && location.pathname === '/campaigns',
    });

    const { data: campaign, isLoading: campaignIsLoading } = useQuery({
        queryKey: ['campaign', id],
        queryFn: async () => {
            const response = await agent.get<Campaign>(`/campaigns/${id}`);
            return response.data;
        },
        enabled: !!id,
    });

    const createCampaign = useMutation({
        mutationFn: async (campaign: { Name: string }) => {
            const response = await agent.post('/campaigns', campaign);
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['campaigns'],
            });
        },
    });

    const deleteCampaign = useMutation({
        mutationFn: async () => {
            const response = await agent.delete(`/campaigns/${id}`);
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['campaigns', id],
            });
        },
    });

    const uploadCampaignMap = useMutation({
        mutationFn: async (file: Blob) => {
            const formData = new FormData();
            formData.append('file', file);
            const response = await agent.post(
                `/photos/add-campaign-photo/${id}`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                },
            );
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['campaign', id],
            });
        },
    });

    const setCampaignMapPins = useMutation({
        mutationFn: async (pins: Pin[]) => {
            const response = await agent.post(`/campaigns/${id}/pins`, pins);
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['campaign', id],
            });
        },
    });

    const addPlayerToCampaign = useMutation<string, AxiosError, string>({
        mutationFn: async (playerEmail: string) => {
            const response = await agent.post(`/campaigns/${id}/add-player`, {
                username: playerEmail,
            });
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['campaign', id],
            });
        },
    });

    return {
        campaigns,
        campaignsIsLoading,
        campaign,
        campaignIsLoading,
        createCampaign,
        uploadCampaignMap,
        setCampaignMapPins,
        deleteCampaign,
        addPlayerToCampaign,
    };
};
