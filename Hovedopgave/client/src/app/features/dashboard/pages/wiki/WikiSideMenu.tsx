import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { WikiEntryType } from '@/lib/enums/wikiEntryType';

type Props = {
    wikiEntries: WikiEntry[] | undefined;
    onSelectWikiEntry: (id: string) => void;
};

export default function WikiSideMenu({
    wikiEntries,
    onSelectWikiEntry,
}: Props) {
    const npcEntries = wikiEntries!.filter(
        (entry) => entry.type === WikiEntryType.Npc,
    );

    const locationEntries = wikiEntries!.filter(
        (entry) => entry.type === WikiEntryType.Location,
    );

    const loreEntries = wikiEntries!.filter(
        (entry) => entry.type === WikiEntryType.Lore,
    );

    return (
        <nav className='flex w-64 flex-col bg-gray-800 p-3 text-white'>
            <Button variant='secondary'>Create entry</Button>
            <Accordion
                type='single'
                collapsible
            >
                <AccordionItem value='item-1'>
                    <AccordionTrigger>NPC's</AccordionTrigger>
                    <AccordionContent>
                        {npcEntries.map((entry) => (
                            <div
                                key={entry.id}
                                onClick={() => onSelectWikiEntry('<p>1</p>')}
                            >
                                {entry.name}
                            </div>
                        ))}
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-2'>
                    <AccordionTrigger>Locations</AccordionTrigger>
                    <AccordionContent>
                        {locationEntries.map((entry) => (
                            <div
                                key={entry.id}
                                onClick={() => onSelectWikiEntry('<p>1</p>')}
                            >
                                {entry.name}
                            </div>
                        ))}
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-3'>
                    <AccordionTrigger>Lore</AccordionTrigger>
                    <AccordionContent>
                        {loreEntries.map((entry) => (
                            <div
                                key={entry.id}
                                onClick={() => onSelectWikiEntry('<p>1</p>')}
                            >
                                {entry.name}
                            </div>
                        ))}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </nav>
    );
}
