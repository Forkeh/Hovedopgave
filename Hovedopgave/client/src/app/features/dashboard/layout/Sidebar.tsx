import { BookOpenText, Menu, Map, Users } from 'lucide-react';
import SidebarItem from './SidebarItem';
import { useState } from 'react';

const sideBarItems = [
    {
        name: 'Map',
        icon: Map,
        linkTo: 'map',
    },
    {
        name: 'Players',
        icon: Users,
        linkTo: 'players',
    },
    {
        name: 'Wiki',
        icon: BookOpenText,
        linkTo: 'wiki',
    },
];

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };
    return (
        <aside
            className={`bg-gray-800 text-white transition-all duration-200 ${
                collapsed ? 'w-16' : 'w-64'
            }`}
        >
            <div className='flex items-center justify-between p-4'>
                {!collapsed && <h2 className='text-xl font-bold'>Dashboard</h2>}
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
    );
}
