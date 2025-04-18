import { createBrowserRouter, Navigate } from 'react-router';
import RequireAuth from './RequireAuth';
import App from '../layout/App';
import RegisterForm from '../features/account/RegisterForm';
import NotFound from '../features/errors/NotFound';
import CampaignsList from '../features/campaigns/list-view/CampaignsList';
import LoginForm from '../features/account/LoginForm';
import HomePage from '../features/home/HomePage';
import CreateCampaignForm from '../features/campaigns/create-campaign/CreateCampaignForm';
import Map from '../features/dashboard/Map';
import Wiki from '../features/dashboard/Wiki';
import DashboardSidebar from '../layout/DashboardSidebar';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                element: <RequireAuth />,
                children: [
                    {
                        path: 'campaigns',
                        children: [
                            { index: true, element: <CampaignsList /> },
                            { path: 'create', element: <CreateCampaignForm /> },
                            {
                                path: 'dashboard/:id',
                                element: <DashboardSidebar />,
                                children: [
                                    { index: true, element: <Map /> },
                                    { path: 'wiki', element: <Wiki /> },
                                ],
                            },
                        ],
                    },

                    // { path: 'activities/:id', element: <ActivityDetailPage /> },
                    // { path: 'createActivity', element: <ActivityForm key='create' /> },
                    // { path: 'manage/:id', element: <ActivityForm /> },
                    // { path: 'profiles/:id', element: <ProfilePage /> },
                ],
            },
            { path: 'register', element: <RegisterForm /> },
            { path: 'login', element: <LoginForm /> },
            { path: '', element: <HomePage /> },
            { path: 'not-found', element: <NotFound /> },
            {
                path: '*',
                element: (
                    <Navigate
                        replace
                        to={'/not-found'}
                    />
                ),
            },
        ],
    },
    { path: '/register', element: <RegisterForm /> },
]);
