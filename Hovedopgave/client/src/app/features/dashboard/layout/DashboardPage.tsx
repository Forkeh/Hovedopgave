import { Outlet } from 'react-router';
import Sidebar from './Sidebar';

export default function DashboardPage() {
    return (
        <div className='flex min-h-full'>
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <main className='flex-1'>
                <Outlet />
            </main>
        </div>
    );
}
