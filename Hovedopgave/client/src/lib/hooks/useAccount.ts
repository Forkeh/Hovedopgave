import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LoginSchema } from '../schemas/loginSchema';
import agent from '../api/agent';
import { useNavigate } from 'react-router';
import { RegisterSchema } from '../schemas/registerSchema';
import { toast } from 'react-toastify';
import { User } from '../types';

export const useAccount = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const loginUser = useMutation({
        mutationFn: async (creds: LoginSchema) => {
            await agent.post('/login?useCookies=true', creds);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['user'], // Forces React Query to refetch
            });
        },
    });

    const registerUser = useMutation({
        mutationFn: async (creds: RegisterSchema) => {
            await agent.post('/account/register', creds);
        },
        onSuccess: () => {
            toast.success('Register successful - you can now login');
            navigate('/login');
        },
    });

    const logoutUser = useMutation({
        mutationFn: async () => {
            await agent.post('/account/logout');
        },
        onSuccess: () => {
            queryClient.removeQueries({
                queryKey: ['user'],
            });
            queryClient.removeQueries({
                queryKey: ['campaigns'],
            });
            navigate('/login');
        },
    });

    const { data: currentUser, isLoading: loadingUserInfo } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await agent.get<User>('/account/user-info');

            return response.data;
        },
        // Only get user data, if not already present
        enabled: !queryClient.getQueryData(['user']),
    });

    return {
        loginUser,
        logoutUser,
        registerUser,
        currentUser,
        loadingUserInfo,
    };
};
