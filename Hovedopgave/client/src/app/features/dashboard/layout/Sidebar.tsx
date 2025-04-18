import { BookOpenText, Menu, Map } from 'lucide-react';
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

type Props = {
    collapsed: boolean;
    toggleSidebar: () => void;
};

export default function Sidebar({ collapsed, toggleSidebar }: Props) {
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
