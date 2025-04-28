import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

type Props = {
    onSelectWikiEntry: (id: string) => void;
};

export default function WikiSideMenu({
    onSelectWikiEntry: handleWikiEntry,
}: Props) {
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
                        <div onClick={() => handleWikiEntry('<p>1</p>')}>
                            Entry 1
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-2'>
                    <AccordionTrigger>Locations</AccordionTrigger>
                    <AccordionContent>
                        <div onClick={() => handleWikiEntry('<p>2</p>')}>
                            Entry 1
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-3'>
                    <AccordionTrigger>Lore</AccordionTrigger>
                    <AccordionContent>
                        <div onClick={() => handleWikiEntry('<p>3</p>')}>
                            Entry 1
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </nav>
    );
}
