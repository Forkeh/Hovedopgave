import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { router } from './app/router/Routes.tsx';
import { RouterProvider } from 'react-router';
import { ToastContainer } from 'react-toastify';
import './index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            <ToastContainer
                position='bottom-right'
                hideProgressBar
                theme='colored'
            />
            <RouterProvider router={router} />
        </QueryClientProvider>
    </StrictMode>,
);
