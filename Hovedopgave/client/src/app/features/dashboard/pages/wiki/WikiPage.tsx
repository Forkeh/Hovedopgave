import WikiSideMenu from './WikiSideMenu';
import WikiEntry from './WikiEntry';
import { useState } from 'react';
import { useWiki } from '@/lib/hooks/useWiki';
import { useParams } from 'react-router';

export default function WikiPage() {
    const [selectedWikiEntry, setSelectedWikiEntry] = useState<string>('');

    const { id } = useParams();

    const { wikiEntries, wikiEntriesIsLoading } = useWiki(id);

    if (wikiEntriesIsLoading) {
        return <div>Wiki is loading...</div>;
    }

    return (
        <section className='flex h-full justify-between'>
            <main className='w-full'>
                <WikiEntry content={selectedWikiEntry} />
            </main>
            <WikiSideMenu
                wikiEntries={wikiEntries}
                onSelectWikiEntry={setSelectedWikiEntry}
            />
        </section>
    );
}
