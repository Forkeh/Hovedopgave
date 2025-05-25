import { createBrowserRouter, Navigate } from 'react-router';
import RequireAuth from './RequireAuth';
import App from '../layout/App';
import RegisterForm from '../features/account/RegisterForm';
import NotFound from '../features/errors/NotFound';
import CampaignsPage from '../features/campaigns/list-view/CampaignsPage';
import LoginForm from '../features/account/LoginForm';
import HomePage from '../features/home/HomePage';
import CreateCampaignForm from '../features/campaigns/create-campaign/CreateCampaignForm';
import MapPage from '../features/dashboard/pages/map/MapPage';
import WikiPage from '../features/dashboard/pages/wiki/WikiPage';
import DashboardPage from '../features/dashboard/layout/DashboardPage';
import PlayersPage from '../features/dashboard/pages/players/PlayersPage';
import WikiEntryView from '../features/dashboard/pages/wiki/WikiEntryView';
import WikiEntryForm from '../features/dashboard/pages/wiki/WikiEntryForm';
import CharacterForm from '../features/dashboard/pages/players/CharacterForm';
import PlayersList from '../features/dashboard/pages/players/PlayersList';
import NotesPage from '../features/dashboard/pages/notes/NotesPage';
import WikiWelcome from '../features/dashboard/pages/wiki/WikiWelcome';

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
                            { index: true, element: <CampaignsPage /> },
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
                                    {
                                        path: 'wiki',
                                        element: <WikiPage />,
                                        children: [
                                            {
                                                index: true,
                                                element: <WikiWelcome />,
                                            },
                                            {
                                                path: ':entryId',
                                                children: [
                                                    {
                                                        index: true,
                                                        element: (
                                                            <WikiEntryView />
                                                        ),
                                                    },
                                                    {
                                                        path: 'edit',
                                                        element: (
                                                            <WikiEntryForm />
                                                        ),
                                                    },
                                                ],
                                            },
                                            {
                                                path: 'create',
                                                element: (
                                                    <WikiEntryForm key='create' />
                                                ),
                                            },
                                        ],
                                    },
                                    {
                                        path: 'players',
                                        element: <PlayersPage />,
                                        children: [
                                            {
                                                index: true,
                                                element: <PlayersList />,
                                            },
                                            {
                                                path: ':playerId/character/create',
                                                element: (
                                                    <CharacterForm key='create' />
                                                ),
                                            },
                                            {
                                                path: ':playerId/character/edit',
                                                element: (
                                                    <CharacterForm key='edit' />
                                                ),
                                            },
                                        ],
                                    },
                                    {
                                        path: 'notes',
                                        element: <NotesPage />,
                                    },
                                ],
                            },
                        ],
                    },
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
