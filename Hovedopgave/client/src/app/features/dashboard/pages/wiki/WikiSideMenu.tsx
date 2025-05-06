import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { WikiEntryType } from '@/lib/enums/wikiEntryType';
import { WikiEntry } from '@/lib/types';
import { useNavigate } from 'react-router';

type Props = {
    wikiEntries: WikiEntry[] | undefined;
    onSelectWikiEntry: (wikiEntry: WikiEntry) => void;
};

export default function WikiSideMenu({
    wikiEntries,
    onSelectWikiEntry,
}: Props) {
    const navigate = useNavigate();

    const entriesByType = {
        [WikiEntryType.Npc]:
            wikiEntries?.filter((entry) => entry.type === WikiEntryType.Npc) ||
            [],
        [WikiEntryType.Location]:
            wikiEntries?.filter(
                (entry) => entry.type === WikiEntryType.Location,
            ) || [],
        [WikiEntryType.Lore]:
            wikiEntries?.filter((entry) => entry.type === WikiEntryType.Lore) ||
            [],
        [WikiEntryType.Quest]:
            wikiEntries?.filter(
                (entry) => entry.type === WikiEntryType.Quest,
            ) || [],
        [WikiEntryType.Item]:
            wikiEntries?.filter((entry) => entry.type === WikiEntryType.Item) ||
            [],
    };

    const categories = [
        { type: WikiEntryType.Npc, label: "NPC's", value: 'npcs' },
        {
            type: WikiEntryType.Location,
            label: 'Locations',
            value: 'locations',
        },
        { type: WikiEntryType.Lore, label: 'Lore', value: 'lore' },
        { type: WikiEntryType.Quest, label: 'Quests', value: 'quests' },
        { type: WikiEntryType.Item, label: 'Items', value: 'items' },
    ];

    const EntryList = ({ entries }: { entries: WikiEntry[] }) =>
        entries.length > 0 ? (
            entries.map((entry) => (
                <div
                    key={entry.id}
                    onClick={() => onSelectWikiEntry(entry)}
                    className='cursor-pointer rounded px-2 py-1 text-sm transition-colors hover:bg-gray-700'
                >
                    {entry.name}
                </div>
            ))
        ) : (
            <div className='px-2 text-sm text-gray-400 italic'>No entries</div>
        );

    return (
        <nav className='flex w-64 flex-col border-l border-yellow-500 bg-gray-800 p-3 text-white'>
            <Button
                onClick={() => navigate('create')}
                variant='secondary'
                className='mb-4 cursor-pointer text-xl font-bold'
            >
                Create entry
            </Button>

            <Accordion
                type='single'
                collapsible
                className='space-y-2'
            >
                {categories.map((category) => (
                    <AccordionItem
                        key={category.value}
                        value={category.value}
                        className='border-b border-gray-700'
                    >
                        <AccordionTrigger className='rounded px-2 font-bold hover:bg-gray-700'>
                            {category.label}
                        </AccordionTrigger>
                        <AccordionContent>
                            <EntryList entries={entriesByType[category.type]} />
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </nav>
    );
}
