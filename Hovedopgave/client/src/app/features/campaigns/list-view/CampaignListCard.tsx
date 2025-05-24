import { Campaign } from '@/lib/types';
import { Link } from 'react-router';

type Props = {
    campaign: Campaign;
};

export default function CampaignListCard({ campaign }: Props) {
    return (
        <Link
            to={`dashboard/${campaign.id}/map`}
            className='group block rounded-lg border-2 border-yellow-500/30 bg-gradient-to-b from-stone-700 to-stone-800 p-5 transition-all hover:scale-101 hover:border-yellow-400/50 hover:shadow-md hover:shadow-yellow-500/10'
        >
            <div className='flex items-start justify-between'>
                <h3 className='font-cinzel text-xl font-bold text-yellow-100 group-hover:text-yellow-200'>
                    {campaign.name}
                </h3>
            </div>

            <div className='mt-4 space-y-2 text-sm text-yellow-100/80'>
                <div>
                    <span className='font-bold text-yellow-500'>DM:</span>{' '}
                    {campaign.dungeonMaster.displayName}
                </div>
                <div>
                    <span className='font-bold text-yellow-500'>Players:</span>{' '}
                    {campaign.players.length > 0 ? (
                        campaign.players.map((p) => p.displayName).join(', ')
                    ) : (
                        <span className='opacity-30'>None</span>
                    )}
                </div>
            </div>
        </Link>
    );
}
