import { Campaign } from '@/lib/types';
import CampaignListCard from './CampaignListCard';
import { DiamondPlus } from 'lucide-react';
import { useNavigate } from 'react-router';

type Props = {
    title: string;
    campaigns?: Campaign[];
    emptyMessage: string;
    isDM?: boolean;
};

export default function CampaignListSection({
    title,
    campaigns,
    emptyMessage,
    isDM = false,
}: Props) {
    const navigate = useNavigate();

    return (
        <div className='relative mb-12'>
            {isDM && (
                <DiamondPlus
                    className='absolute right-2 cursor-pointer text-yellow-400 transition-all hover:scale-105 hover:text-yellow-200'
                    size={30}
                    onClick={() => navigate('create')}
                />
            )}

            <h2 className='mb-6 border-b-2 border-yellow-500/70 pb-2 text-2xl font-bold text-yellow-100'>
                {title}
            </h2>
            {campaigns?.length ? (
                <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                    {campaigns.map((campaign) => (
                        <CampaignListCard
                            key={campaign.id}
                            campaign={campaign}
                        />
                    ))}
                </div>
            ) : (
                <div className='rounded-md border-2 border-yellow-500/20 bg-gray-800/50 p-6 text-center text-yellow-100/70'>
                    {emptyMessage}
                </div>
            )}
        </div>
    );
}
