import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function WikiPage() {
    const [wikiEntry, setWikiEntry] = useState<string>('');

    console.log(wikiEntry);

    return (
        <section className='flex h-full justify-between bg-red-300'>
            <main className='bg-green-300'>Text</main>
            <nav className='flex w-64 flex-col bg-gray-800 p-3 text-white'>
                <Button variant='secondary'>Create entry</Button>
                <Accordion
                    type='single'
                    collapsible
                >
                    <AccordionItem value='item-1'>
                        <AccordionTrigger>NPC's</AccordionTrigger>
                        <AccordionContent>
                            <div onClick={() => setWikiEntry('1')}>Entry 1</div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-2'>
                        <AccordionTrigger>Locations</AccordionTrigger>
                        <AccordionContent>
                            <div onClick={() => setWikiEntry('2')}>Entry 1</div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-3'>
                        <AccordionTrigger>Lore</AccordionTrigger>
                        <AccordionContent>
                            <div onClick={() => setWikiEntry('3')}>Entry 1</div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </nav>
        </section>
    );
}
