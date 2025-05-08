import { Outlet } from 'react-router';

export default function PlayersPage() {
    return (
        <main className='flex min-h-full justify-center'>
            <Outlet />
        </main>
    );
}
