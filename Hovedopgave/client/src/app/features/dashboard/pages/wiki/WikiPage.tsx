import WikiSideMenu from './WikiSideMenu';
import WikiEntry from './WikiEntry';
import { useState } from 'react';

export default function WikiPage() {
    const [selectedWikiEntry, setSelectedWikiEntry] = useState<string>('');

    return (
        <section className='flex h-full justify-between'>
            <main className='w-full'>
                <WikiEntry content={selectedWikiEntry} />
            </main>
            <WikiSideMenu onSelectWikiEntry={setSelectedWikiEntry} />
        </section>
    );
}
