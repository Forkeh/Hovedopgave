import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import { useEffect } from 'react';
import TipTapMenuBar from './TipTapMenuBar';
import Loader from '../Loader';

type Props = {
    content: string;
    onChange: (content: string) => void;
    maxHeight?: string;
};

const Tiptap = ({ content, onChange, maxHeight }: Props) => {
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
        Link.configure({
            HTMLAttributes: {
                class: 'cursor-pointer text-blue-600 underline',
            },
        }),
    ];

    const editor = useEditor({
        extensions,
        content,
        editorProps: {
            attributes: {
                class: 'min-h-[156px] w-xl border rounded-md bg-slate-50 py-2 px-3 prose my-2 focus:outline-none',
            },
        },
        onUpdate: ({ editor: currentEditor }) => {
            onChange(currentEditor.getHTML());
        },
        editable: true,
    });

    useEffect(() => {
        if (editor && editor.getHTML() !== content) {
            setTimeout(() => {
                if (editor && !editor.isDestroyed) {
                    editor.commands.setContent(content, false);
                }
            }, 0);
        }
    }, [content, editor]);

    if (!editor) {
        return <Loader />;
    }

    return (
        <div className='flex flex-col items-center'>
            <TipTapMenuBar editor={editor} />
            <EditorContent
                editor={editor}
                className={`${maxHeight} overflow-x-hidden overflow-y-auto`}
            />
        </div>
    );
};

export default Tiptap;
