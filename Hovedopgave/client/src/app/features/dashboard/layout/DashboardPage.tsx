import { useState } from 'react';
import { Outlet, useParams } from 'react-router';
import Sidebar from './Sidebar';

export default function DashboardPage() {
    const [collapsed, setCollapsed] = useState(false);

    const { id } = useParams();
    console.log(id);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className='flex h-screen bg-gray-100'>
            {/* Sidebar */}
            <Sidebar
                collapsed={collapsed}
                toggleSidebar={toggleSidebar}
            />

            {/* Main content */}
            <section className='flex-1 overflow-auto'>
                <main className='p-8'>
                    <Outlet />
                </main>
            </section>
        </div>
    );
}
