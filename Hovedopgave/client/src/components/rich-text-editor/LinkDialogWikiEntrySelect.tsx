import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { WikiEntry } from '@/lib/types';

// const frameworks = [
//     {
//         value: 'next.js',
//         label: 'Next.js',
//     },
//     {
//         value: 'sveltekit',
//         label: 'SvelteKit',
//     },
//     {
//         value: 'nuxt.js',
//         label: 'Nuxt.js',
//     },
//     {
//         value: 'remix',
//         label: 'Remix',
//     },
//     {
//         value: 'astro',
//         label: 'Astro',
//     },
// ];

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    value: string;
    setValue: (value: string) => void;
    wikiEntries: WikiEntry[] | undefined;
};

export default function LinkDialogWikiEntrySelect({
    open,
    setOpen,
    value,
    setValue,
    wikiEntries,
}: Props) {
    return (
        <Popover
            open={open}
            onOpenChange={setOpen}
        >
            <PopoverTrigger asChild>
                <Button
                    variant='outline'
                    role='combobox'
                    aria-expanded={open}
                    className='w-[200px] justify-between truncate'
                >
                    {value
                        ? wikiEntries!.find((entry) => entry.id === value)?.name
                        : 'Select wiki entry...'}
                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
                <Command>
                    <CommandInput placeholder='Search for entries...' />
                    <CommandList>
                        <CommandEmpty>No entry found.</CommandEmpty>
                        <CommandGroup>
                            {wikiEntries!.map((entry) => (
                                <CommandItem
                                    key={entry.id}
                                    value={entry.name}
                                    onSelect={() => {
                                        setValue(
                                            entry.id === value ? '' : entry.id!,
                                        );
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            value === entry.id
                                                ? 'opacity-100'
                                                : 'opacity-0',
                                        )}
                                    />
                                    {entry.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
