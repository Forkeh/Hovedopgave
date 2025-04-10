import { createBrowserRouter, Navigate } from 'react-router';
import RequireAuth from './RequireAuth';
import App from '../layout/App';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				element: <RequireAuth />,
				children: [
					// { path: 'activities', element: <ActivityDashboard /> },
					// { path: 'activities/:id', element: <ActivityDetailPage /> },
					// { path: 'createActivity', element: <ActivityForm key='create' /> },
					// { path: 'manage/:id', element: <ActivityForm /> },
					// { path: 'profiles/:id', element: <ProfilePage /> },
				],
			},
			// { path: '', element: <HomePage /> },
			// { path: 'counter', element: <Counter /> },
			// { path: 'errors', element: <TestErrors /> },
			// { path: 'not-found', element: <NotFound /> },
			// { path: 'server-error', element: <ServerError /> },
			// { path: 'login', element: <LoginForm /> },
			// { path: 'register', element: <RegisterForm /> },
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
]);
