import WikiSideMenu from './WikiSideMenu';
import { useWiki } from '@/lib/hooks/useWiki';
import { Outlet, useNavigate, useParams } from 'react-router';
import { WikiEntry } from '@/lib/types';
import { useCampaigns } from '@/lib/hooks/useCampaigns';
import { useAccount } from '@/lib/hooks/useAccount';
import { useMemo, useState } from 'react';
import Loader from '@/components/Loader';

export default function WikiPage() {
    const { id } = useParams();
    const { campaign, campaignIsLoading } = useCampaigns(id);
    const { wikiEntries, wikiEntriesIsLoading } = useWiki(id);
    const { currentUser } = useAccount();

    const [searchValue, setSearcValue] = useState('');

    const navigate = useNavigate();

    const filteredWikiEntries = useMemo(() => {
        if (!searchValue || !wikiEntries) return wikiEntries;

        return wikiEntries.filter((entry) =>
            entry.name.toLowerCase().includes(searchValue.toLowerCase()),
        );
    }, [searchValue, wikiEntries]);

    const handleSelectWikiEntry = (wikiEntry: WikiEntry) => {
        navigate(`${wikiEntry.id}`);
    };

    const handleWikiEntriesSearch = (value: string) => {
        setSearcValue(value);
    };

    if (wikiEntriesIsLoading || campaignIsLoading) {
        return <Loader />;
    }

    const isDM = currentUser?.id === campaign?.dungeonMaster.id;

    return (
        <section className='flex min-h-full'>
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
