import { useCampaigns } from '@/lib/hooks/useCampaigns';
import { useAccount } from '@/lib/hooks/useAccount';
import CampaignListSection from './CampaignListSection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export default function CampaignsList() {
    const { currentUser } = useAccount();
    const { campaigns, isLoading } = useCampaigns();

    if (isLoading) {
        return (
            <div className='flex justify-center p-8'>
                <p>Loading campaigns...</p>
            </div>
        );
    }

    const dmCampaigns =
        currentUser && campaigns
            ? campaigns.filter((c) => c.dungeonMaster.id === currentUser.id)
            : [];

    const playerCampaigns =
        currentUser && campaigns
            ? campaigns.filter((c) => c.dungeonMaster.id !== currentUser.id)
            : [];
    return (
        <section className='px-4 py-8'>
            <h1 className='mb-2 text-center text-3xl font-bold'>Campaigns</h1>
            <Button className='my-5'>
                <Link to={'create'}>Create new campaign</Link>
            </Button>

            <CampaignListSection
                title='Dungeon Master Campaigns'
                campaigns={dmCampaigns}
                emptyMessage="You're currently not DM'ing any campaigns"
            />

            <CampaignListSection
                title='Player Campaigns'
                campaigns={playerCampaigns}
                emptyMessage="You're currently not a player in any campaigns"
            />
        </section>
    );
}
