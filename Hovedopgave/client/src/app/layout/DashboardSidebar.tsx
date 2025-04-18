import {
    FileText,
    HelpCircle,
    Home,
    Menu,
    Settings,
    Users,
} from 'lucide-react';
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router';

export default function DashboardSidebar() {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className='flex h-screen bg-gray-100'>
            {/* Sidebar */}
            <div
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
                    <NavLink
                        to='.'
                        end
                        className={({ isActive }) =>
                            `flex items-center p-4 ${isActive ? 'bg-gray-700' : ''} transition-colors hover:bg-gray-700`
                        }
                    >
                        <Home size={20} />
                        {!collapsed && <span className='ml-4'>Map</span>}
                    </NavLink>

                    <NavLink
                        to='wiki'
                        className={({ isActive }) =>
                            `flex items-center p-4 ${isActive ? 'bg-gray-700' : ''} transition-colors hover:bg-gray-700`
                        }
                    >
                        <Users size={20} />
                        {!collapsed && <span className='ml-4'>Wiki</span>}
                    </NavLink>
                </nav>
            </div>

            {/* Main content */}
            <div className='flex-1 overflow-auto'>
                <main className='p-8'>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
