import WikiSideMenu from './WikiSideMenu';
import { useWiki } from '@/lib/hooks/useWiki';
import { Outlet, useNavigate, useParams } from 'react-router';
import { WikiEntry } from '@/lib/types';

export default function WikiPage() {
    const { id } = useParams();
    const { wikiEntries, wikiEntriesIsLoading } = useWiki(id);
    const navigate = useNavigate();

    const handleSelectWikiEntry = (wikiEntry: WikiEntry) => {
        navigate(`${wikiEntry.id}`);
    };

    if (wikiEntriesIsLoading) {
        return <div>Wiki is loading...</div>;
    }

    return (
        <section className='flex h-full'>
            <main className='flex-1'>
                <Outlet />
            </main>
            <WikiSideMenu
                wikiEntries={wikiEntries}
                onSelectWikiEntry={handleSelectWikiEntry}
            />
        </section>
    );
}
