import { LucideIcon } from 'lucide-react';
import { NavLink } from 'react-router';

type Props = {
    name: string;
    icon: LucideIcon;
    linkTo: string;
    collapsed: boolean;
};

export default function SidebarItem({
    name,
    icon: Icon,
    linkTo,
    collapsed,
}: Props) {
    return (
        <NavLink
            to={linkTo}
            end
            className={({ isActive }) =>
                `flex items-center p-4 ${isActive ? 'bg-gray-800' : ''} m-2 rounded-sm transition-colors hover:bg-gray-800`
            }
        >
            <Icon
                size={20}
                className='text-yellow-500/60'
            />
            {!collapsed && <span className='ml-4'>{name}</span>}
        </NavLink>
    );
}
