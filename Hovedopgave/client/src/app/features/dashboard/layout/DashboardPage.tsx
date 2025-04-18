import { Outlet, useParams } from 'react-router';
import Sidebar from './Sidebar';

export default function DashboardPage() {
    const { id } = useParams();
    console.log(id);

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
