import WikiSideMenu from './WikiSideMenu';
import { useWiki } from '@/lib/hooks/useWiki';
import { Outlet, useNavigate, useParams } from 'react-router';
import { WikiEntry } from '@/lib/types';
import { useCampaigns } from '@/lib/hooks/useCampaigns';
import { useAccount } from '@/lib/hooks/useAccount';
import { useState } from 'react';

export default function WikiPage() {
    const { id } = useParams();
    const { campaign, campaignIsLoading } = useCampaigns(id);
    const { wikiEntries, wikiEntriesIsLoading } = useWiki(id);
    const { currentUser } = useAccount();

    const [filteredWikiEntries, setfilteredWikiEntries] = useState(wikiEntries);

    const navigate = useNavigate();

    const handleSelectWikiEntry = (wikiEntry: WikiEntry) => {
        navigate(`${wikiEntry.id}`);
    };

    const handleWikiEntriesSearch = (value: string) => {
        console.log(value);

        if (!value) {
            setfilteredWikiEntries(wikiEntries);
        } else {
            const filterEntries = wikiEntries?.filter((entry) =>
                entry.name.toLowerCase().includes(value.toLowerCase()),
            );
            setfilteredWikiEntries(filterEntries);
        }
        console.log(filteredWikiEntries);
    };

    if (wikiEntriesIsLoading || campaignIsLoading) {
        return <div>Wiki is loading...</div>;
    }

    const isDM = currentUser?.id === campaign?.dungeonMaster.id;

    return (
        <section className='flex min-h-full bg-gray-100'>
            <main
                key={location.pathname}
                className='flex-1 animate-in fade-in'
            >
                <Outlet />
            </main>
            <WikiSideMenu
                wikiEntries={filteredWikiEntries}
                onSelectWikiEntry={handleSelectWikiEntry}
                isDM={isDM}
                onWikiEntriesSearch={handleWikiEntriesSearch}
            />
        </section>
    );
}
