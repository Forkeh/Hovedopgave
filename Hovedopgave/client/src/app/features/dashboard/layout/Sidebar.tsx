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
            className={`min-h-full border-r-4 border-double border-yellow-500/30 bg-gray-900 text-yellow-100 transition-all duration-200 ${
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
                            <SelectTrigger className='w-[180px] cursor-pointer border border-gray-700 text-xl transition-all hover:bg-gray-800'>
                                <SelectValue
                                    placeholder='Select Campaign'
                                    defaultValue={selectedCampaign}
                                />
                            </SelectTrigger>
                            <SelectContent className='border-gray-700 bg-gray-900'>
                                {campaigns?.map((campaign) => (
                                    <SelectItem
                                        className='text-white hover:bg-gray-800 hover:text-white focus:bg-gray-700 data-[highlighted]:text-white data-[state=checked]:bg-gray-600'
                                        key={campaign.id}
                                        value={campaign.id}
                                    >
                                        {campaign.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}
                <button
                    onClick={toggleSidebar}
                    className='rounded p-2 transition-colors hover:bg-gray-700'
                >
                    <Menu size={20} />
                </button>
            </div>

            <nav>
                <div className='m-2 mx-auto w-fit rounded-sm bg-gray-800 p-4 text-center'>
                    <span className='text-xs text-yellow-300/80'>ROLE</span>
                    <div className='font-bold'>
                        {isPlayerDM ? 'Dungeon Master' : 'Player'}
                    </div>
                </div>
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
