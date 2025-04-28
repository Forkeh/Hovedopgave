// src/Tiptap.tsx
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TipTapMenuBar from './TipTapMenuBar';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import { useEffect } from 'react';

// define your extension array
const extensions = [
    StarterKit.configure({
        bulletList: {
            HTMLAttributes: {
                class: 'list-disc ml-3',
            },
        },
        orderedList: {
            HTMLAttributes: {
                class: 'list-decimal ml-3',
            },
        },
    }),

    TextAlign.configure({
        types: ['heading', 'paragraph'],
    }),
    Highlight,
];

type Props = {
    content: string;
    onChange: (content: string) => void;
};

const Tiptap = ({ content, onChange }: Props) => {
    console.log('content: ', content);

    const editor = useEditor({
        extensions,
        content: content,
        editorProps: {
            attributes: {
                class: 'min-h-[156px] border rounded-md bg-slate-50 py-2 px-3 prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editable: true, // TODO: make dynamic
    });

    // Update editor content when content prop changes
    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    return (
        <>
            {editor?.isEditable && <TipTapMenuBar editor={editor} />}
            <EditorContent editor={editor} />
        </>
    );
};

export default Tiptap;
