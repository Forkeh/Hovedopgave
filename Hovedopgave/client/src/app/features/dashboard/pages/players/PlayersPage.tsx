import { Outlet } from 'react-router';

export default function PlayersPage() {
    return (
        <section className='flex min-h-full bg-gray-100'>
            <main className='flex-1'>
                <Outlet />
            </main>
        </section>
    );
}
