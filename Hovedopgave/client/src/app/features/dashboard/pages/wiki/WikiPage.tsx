import { useState } from 'react';
import WikiSideMenu from './WikiSideMenu';

export default function WikiPage() {
    const [selectedWikiEntry, setSelectedWikiEntry] = useState<string>('');

    console.log(selectedWikiEntry);

    return (
        <section className='flex h-full justify-between bg-red-300'>
            <main className='bg-green-300'>
                {selectedWikiEntry ? selectedWikiEntry : 'no entry selected'}
            </main>
            <WikiSideMenu onSelectWikiEntry={setSelectedWikiEntry} />
        </section>
    );
}
