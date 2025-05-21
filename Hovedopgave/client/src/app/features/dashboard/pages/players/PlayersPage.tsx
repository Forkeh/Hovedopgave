import { Outlet } from 'react-router';

export default function PlayersPage() {
    return (
        <main className='flex min-h-full animate-in justify-center fade-in'>
            <Outlet />
        </main>
    );
}
