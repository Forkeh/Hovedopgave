import { createBrowserRouter, Navigate } from 'react-router';
import RequireAuth from './RequireAuth';
import App from '../layout/App';
import RegisterForm from '../features/account/RegisterForm';
import NotFound from '../features/errors/NotFound';
import CampaignsList from '../features/campaigns/list-view/CampaignsList';
import LoginForm from '../features/account/LoginForm';
import HomePage from '../features/home/HomePage';
import CreateCampaignForm from '../features/campaigns/create-campaign/CreateCampaignForm';
import MapPage from '../features/dashboard/pages/map/MapPage';
import WikiPage from '../features/dashboard/pages/wiki/WikiPage';
import DashboardPage from '../features/dashboard/layout/DashboardPage';
import Players from '../features/dashboard/pages/players/Players';

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
                                element: <DashboardPage />,
                                children: [
                                    {
                                        index: true,
                                        path: 'map',
                                        element: <MapPage />,
                                    },
                                    { path: 'wiki', element: <WikiPage /> },
                                    { path: 'players', element: <Players /> },
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
