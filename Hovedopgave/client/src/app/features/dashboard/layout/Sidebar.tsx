import { BookOpenText, Menu, Map, Users, NotebookPen } from 'lucide-react';
import SidebarItem from './SidebarItem';
import { useState } from 'react';
import { useCampaigns } from '@/lib/hooks/useCampaigns';
import { useNavigate, useParams } from 'react-router';
import { useAccount } from '@/lib/hooks/useAccount';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

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
    {
        name: 'Notes',
        icon: NotebookPen,
        linkTo: 'notes',
    },
];

export default function Sidebar() {
    const { currentUser } = useAccount();
    const { id } = useParams();
    const { campaign, campaigns } = useCampaigns(id);
    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState<
        string | undefined
    >(id);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const handleChangeCampaign = (value: string) => {
        setSelectedCampaign(value);
        navigate(`/campaigns/dashboard/${value}/map`);
    };

    const isPlayerDM = currentUser?.id === campaign?.dungeonMaster.id;

    return (
        <aside
            className={`min-h-full border-r border-yellow-500 bg-gray-800 text-white transition-all duration-200 ${
                collapsed ? 'w-16' : 'w-64'
            }`}
        >
            <div className='flex items-center justify-between p-4'>
                {!collapsed && (
                    <div className='flex flex-col gap-2'>
                        <Select
                            onValueChange={handleChangeCampaign}
                            value={selectedCampaign}
                            defaultValue={id}
                        >
                            <SelectTrigger className='w-[180px] cursor-pointer border-none text-xl transition-all hover:bg-gray-700'>
                                <SelectValue
                                    placeholder='Select Campaign'
                                    defaultValue={selectedCampaign}
                                />
                            </SelectTrigger>
                            <SelectContent className='border-gray-700 bg-gray-800'>
                                {campaigns?.map((campaign) => (
                                    <SelectItem
                                        className='text-white hover:bg-gray-700 hover:text-white focus:bg-gray-700 data-[highlighted]:text-white data-[state=checked]:bg-gray-600'
                                        key={campaign.id}
                                        value={campaign.id}
                                    >
                                        {campaign.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <div className='text-xs opacity-80'>
                            Role:{' '}
                            <span className='font-bold'>
                                {isPlayerDM ? 'Dungeon Master' : 'Player'}
                            </span>
                        </div>
                    </div>
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
    );
}
