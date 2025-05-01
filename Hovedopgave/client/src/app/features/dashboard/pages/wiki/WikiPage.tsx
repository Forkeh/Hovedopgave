import WikiSideMenu from './WikiSideMenu';
import WikiEntryView from './WikiEntry';
import { useState } from 'react';
import { useWiki } from '@/lib/hooks/useWiki';
import { useParams } from 'react-router';
import { WikiEntry } from '@/lib/types';

export default function WikiPage() {
    const [selectedWikiEntry, setSelectedWikiEntry] = useState<
        WikiEntry | undefined
    >(undefined);

    const { id } = useParams();

    const { wikiEntries, wikiEntriesIsLoading } = useWiki(id);

    if (wikiEntriesIsLoading) {
        return <div>Wiki is loading...</div>;
    }

    return (
        <section className='flex h-full justify-between'>
            <main className='w-full'>
                <WikiEntryView wikiEntry={selectedWikiEntry} />
            </main>
            <WikiSideMenu
                wikiEntries={wikiEntries}
                onSelectWikiEntry={setSelectedWikiEntry}
            />
        </section>
    );
}
