import { Editor } from '@tiptap/react';
import {
    AlignCenter,
    AlignLeft,
    AlignRight,
    Bold,
    Heading1,
    Heading2,
    Heading3,
    Highlighter,
    Italic,
    Link,
    List,
    ListOrdered,
    Strikethrough,
    Unlink,
} from 'lucide-react';
import { Toggle } from '../ui/toggle';
import { useCallback, useState } from 'react';
import LinkDialog from './LinkDialog';

type Props = {
    editor: Editor | null;
};

export default function TipTapMenuBar({ editor }: Props) {
    const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);

    // Simple method to set internal links
    const setLink = useCallback(
        (wikiId: string) => {
            if (!editor) return;

            console.log(wikiId);

            // const previousUrl = editor.getAttributes('link').href;
            // const url = window.prompt(
            //     'Enter internal path (e.g., /dashboard):',
            //     previousUrl,
            // );

            // // Handle cancellation
            // if (url === null) return;

            // // Remove link if empty
            // if (url === '') {
            //     editor.chain().focus().extendMarkRange('link').unsetLink().run();
            //     return;
            // }

            // // Ensure path starts with /
            // const path = url.startsWith('/') ? url : `/${url}`;

            // // Set the link
            // editor
            //     .chain()
            //     .focus()
            //     .extendMarkRange('link')
            //     .setLink({
            //         href: path,
            //         // No target or rel attributes - we want clean links
            //     })
            //     .run();

            // console.log('Link created with path:', path);
        },
        [editor],
    );

    if (!editor) {
        return null;
    }

    const options = [
        {
            icon: <Heading1 className='size-4' />,
            onClick: () =>
                editor.chain().focus().toggleHeading({ level: 1 }).run(),
            pressed: editor.isActive('heading', { level: 1 }),
        },
        {
            icon: <Heading2 className='size-4' />,
            onClick: () =>
                editor.chain().focus().toggleHeading({ level: 2 }).run(),
            pressed: editor.isActive('heading', { level: 2 }),
        },
        {
            icon: <Heading3 className='size-4' />,
            onClick: () =>
                editor.chain().focus().toggleHeading({ level: 3 }).run(),
            pressed: editor.isActive('heading', { level: 3 }),
        },
        {
            icon: <Bold className='size-4' />,
            onClick: () => editor.chain().focus().toggleBold().run(),
            pressed: editor.isActive('bold'),
        },
        {
            icon: <Italic className='size-4' />,
            onClick: () => editor.chain().focus().toggleItalic().run(),
            pressed: editor.isActive('italic'),
        },
        {
            icon: <Strikethrough className='size-4' />,
            onClick: () => editor.chain().focus().toggleStrike().run(),
            pressed: editor.isActive('strike'),
        },
        {
            icon: <AlignLeft className='size-4' />,
            onClick: () => editor.chain().focus().setTextAlign('left').run(),
            pressed: editor.isActive('left'),
        },
        {
            icon: <AlignCenter className='size-4' />,
            onClick: () => editor.chain().focus().setTextAlign('center').run(),
            pressed: editor.isActive('center'),
        },
        {
            icon: <AlignRight className='size-4' />,
            onClick: () => editor.chain().focus().setTextAlign('right').run(),
            pressed: editor.isActive('right'),
        },
        {
            icon: <List className='size-4' />,
            onClick: () => editor.chain().focus().toggleBulletList().run(),
            pressed: editor.isActive('bulletList'),
        },
        {
            icon: <ListOrdered className='size-4' />,
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
            pressed: editor.isActive('orderedList'),
        },
        {
            icon: <Highlighter className='size-4' />,
            onClick: () => editor.chain().focus().toggleHighlight().run(),
            pressed: editor.isActive('highlight'),
        },
        {
            icon: <Link className='size-4' />,
            onClick: () => setIsLinkDialogOpen(true),
            pressed: editor.isActive('link'),
        },
        {
            icon: <Unlink className='size-4' />,
            onClick: () => editor.chain().focus().unsetLink().run(),
            pressed: !editor.isActive('link'),
        },
    ];

    return (
        <>
            <div className='z-50 flex justify-center gap-1 rounded-md border bg-slate-50 p-1'>
                {options.map((option, index) => (
                    <Toggle
                        className='data-[state=on]:bg-slate-200'
                        key={index}
                        pressed={option.pressed}
                        onPressedChange={option.onClick}
                    >
                        {option.icon}
                    </Toggle>
                ))}
            </div>
            <LinkDialog
                isLinkDialogOpen={isLinkDialogOpen}
                setIsLinkDialogOpen={setIsLinkDialogOpen}
                handleLink={setLink}
            />
        </>
    );
}
