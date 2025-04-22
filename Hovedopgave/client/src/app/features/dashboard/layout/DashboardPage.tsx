import { Outlet } from 'react-router';
import Sidebar from './Sidebar';

export default function DashboardPage() {
    return (
        <div className='flex h-screen bg-gray-100'>
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <section className='flex-1 overflow-auto'>
                <main className='p-8'>
                    <Outlet />
                </main>
            </section>
        </div>
    );
}
