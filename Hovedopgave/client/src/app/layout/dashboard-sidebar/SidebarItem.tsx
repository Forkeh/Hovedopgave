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
                `flex items-center p-4 ${isActive ? 'bg-gray-700' : ''} transition-colors hover:bg-gray-700`
            }
        >
            <Icon size={20} />
            {!collapsed && <span className='ml-4'>{name}</span>}
        </NavLink>
    );
}
