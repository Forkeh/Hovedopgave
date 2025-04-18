import { BookOpenText, Map, Menu } from 'lucide-react';
import { useState } from 'react';
import { Outlet } from 'react-router';
import SidebarItem from './SidebarItem';

const sideBarItems = [
    {
        name: 'Map',
        icon: Map,
        linkTo: '.',
    },
    {
        name: 'Wiki',
        icon: BookOpenText,
        linkTo: 'wiki',
    },
];

export default function DashboardSidebar() {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className='flex h-screen bg-gray-100'>
            {/* Sidebar */}
            <aside
                className={`bg-gray-800 text-white transition-all duration-200 ${
                    collapsed ? 'w-16' : 'w-64'
                }`}
            >
                <div className='flex items-center justify-between p-4'>
                    {!collapsed && (
                        <h2 className='text-xl font-bold'>Dashboard</h2>
                    )}
                    <button
                        onClick={toggleSidebar}
                        className='rounded p-2 transition-colors hover:bg-gray-700'
                    >
                        <Menu size={20} />
                    </button>
                </div>

                <nav className='mt-6'>
                    {sideBarItems.map((item) => (
                        <SidebarItem
                            key={item.name}
                            name={item.name}
                            icon={item.icon}
                            linkTo={item.linkTo}
                            collapsed={collapsed}
                        />
                    ))}
                </nav>
            </aside>

            {/* Main content */}
            <section className='flex-1 overflow-auto'>
                <main className='p-8'>
                    <Outlet />
                </main>
            </section>
        </div>
    );
}
