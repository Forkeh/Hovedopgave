import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { WikiEntryType } from '@/lib/enums/wikiEntryType';
import { WikiEntry } from '@/lib/types';
import { useNavigate } from 'react-router';

type Props = {
    wikiEntries: WikiEntry[] | undefined;
    onSelectWikiEntry: (wikiEntry: WikiEntry) => void;
    isDM: boolean;
    onWikiEntriesSearch: (value: string) => void;
};

export default function WikiSideMenu({
    wikiEntries,
    onSelectWikiEntry,
    isDM,
    onWikiEntriesSearch,
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
        [WikiEntryType.Other]:
            wikiEntries?.filter(
                (entry) => entry.type === WikiEntryType.Other,
            ) || [],
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
        { type: WikiEntryType.Other, label: 'Other', value: 'other' },
    ];

    const EntryList = ({ entries }: { entries: WikiEntry[] }) => {
        const visibleEntries = isDM
            ? entries
            : entries.filter((entry) => entry.isVisible);

        return visibleEntries.length > 0 ? (
            visibleEntries.map((entry) => (
                <div
                    key={entry.id}
                    onClick={() => onSelectWikiEntry(entry)}
                    className='cursor-pointer rounded px-2 py-2 text-sm transition-colors hover:bg-gray-800'
                >
                    {entry.name}
                    {!entry.isVisible && isDM && (
                        <span className='ml-2 text-xs text-gray-400'>
                            (hidden)
                        </span>
                    )}
                </div>
            ))
        ) : (
            <div className='px-2 text-sm text-gray-400 italic'>No entries</div>
        );
    };

    return (
        <nav className='flex w-64 flex-col gap-4 border-l-4 border-double border-yellow-500/30 bg-gradient-to-l from-gray-800 to-gray-900 p-3'>
            {isDM && (
                <Button
                    onClick={() => navigate('create')}
                    className='text-md mb-4 flex cursor-pointer font-bold'
                >
                    Create New Entry
                </Button>
            )}

            {wikiEntries && wikiEntries.length > 0 ? (
                <Input
                    placeholder='Search...'
                    onChange={(e) => onWikiEntriesSearch(e.target.value)}
                    className='border-4 border-double border-yellow-800/80 bg-orange-100 text-black'
                />
            ) : (
                <div className='text-center opacity-50'>
                    Currently no entries
                </div>
            )}

            <Accordion
                type='multiple'
                className='space-y-2'
            >
                {categories.map((category) => {
                    if (entriesByType[category.type].length === 0) {
                        return null;
                    }

                    return (
                        <AccordionItem
                            key={category.value}
                            value={category.value}
                            className='cursor-pointer border-b-4 border-double border-yellow-500/30'
                        >
                            <AccordionTrigger className='rounded px-2 font-bold hover:bg-gray-800'>
                                {category.label}
                            </AccordionTrigger>
                            <AccordionContent>
                                <EntryList
                                    entries={entriesByType[category.type]}
                                />
                            </AccordionContent>
                        </AccordionItem>
                    );
                })}
            </Accordion>
        </nav>
    );
}
