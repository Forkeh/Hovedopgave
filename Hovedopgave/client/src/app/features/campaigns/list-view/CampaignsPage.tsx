import { useCampaigns } from '@/lib/hooks/useCampaigns';
import { useAccount } from '@/lib/hooks/useAccount';
import CampaignListSection from './CampaignListSection';
import Loader from '@/components/loader/Loader';

export default function CampaignsPage() {
    const { currentUser } = useAccount();
    const { campaigns, campaignsIsLoading } = useCampaigns();

    if (campaignsIsLoading) {
        return <Loader />;
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
        <section className='min-h-full animate-in px-6 py-8 fade-in'>
            <div className='mx-auto max-w-4xl'>
                <h1 className='mb-12 text-center text-4xl font-bold text-yellow-100'>
                    Your Campaigns
                </h1>

                <CampaignListSection
                    title='Dungeon Master Campaigns'
                    campaigns={dmCampaigns}
                    emptyMessage="You're currently not DM'ing any campaigns"
                    isDM
                />

                <CampaignListSection
                    title='Player Campaigns'
                    campaigns={playerCampaigns}
                    emptyMessage="You're currently not a player in any campaigns"
                />
            </div>
        </section>
    );
}
