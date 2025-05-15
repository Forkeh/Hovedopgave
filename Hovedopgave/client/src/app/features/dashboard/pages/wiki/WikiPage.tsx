import WikiSideMenu from './WikiSideMenu';
import { useWiki } from '@/lib/hooks/useWiki';
import { Outlet, useNavigate, useParams } from 'react-router';
import { WikiEntry } from '@/lib/types';
import { useCampaigns } from '@/lib/hooks/useCampaigns';
import { useAccount } from '@/lib/hooks/useAccount';

export default function WikiPage() {
    const { id } = useParams();
    const { campaign, campaignIsLoading } = useCampaigns(id);
    const { wikiEntries, wikiEntriesIsLoading } = useWiki(id);
    const { currentUser } = useAccount();
    const navigate = useNavigate();

    const handleSelectWikiEntry = (wikiEntry: WikiEntry) => {
        navigate(`${wikiEntry.id}`);
    };

    if (wikiEntriesIsLoading || campaignIsLoading) {
        return <div>Wiki is loading...</div>;
    }

    const isDM = currentUser?.id === campaign?.dungeonMaster.id;

    return (
        <section className='flex min-h-full bg-gray-100'>
            <main className='flex-1'>
                <Outlet />
            </main>
            <WikiSideMenu
                wikiEntries={wikiEntries}
                onSelectWikiEntry={handleSelectWikiEntry}
                isDM={isDM}
            />
        </section>
    );
}
