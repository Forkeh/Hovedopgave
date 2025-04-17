import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAccount } from './useAccount';
import agent from '../api/agent';

export const useCampaigns = (id?: string) => {
    const queryClient = useQueryClient();
    const { currentUser } = useAccount();

    const { data: campaigns, isLoading } = useQuery({
        queryKey: ['campaigns'],
        queryFn: async () => {
            const response = await agent.get<Campaign[]>('/campaigns');
            return response.data;
        },
        enabled: !id && location.pathname === '/campaigns',
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

    return { campaigns, isLoading, createCampaign };
};
