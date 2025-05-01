import { WikiEntry } from '@/lib/types';
import { PencilIcon } from 'lucide-react';

type Props = {
    wikiEntry: WikiEntry | undefined;
};

export default function WikiEntryView({ wikiEntry }: Props) {
    if (!wikiEntry) {
        return (
            <div className='flex h-full items-center justify-center text-4xl font-semibold'>
                Select an entry 👉
            </div>
        );
    }

    return (
        <div className='relative mx-auto mt-5 flex w-full max-w-3xl flex-col rounded-lg bg-white p-6 shadow-md'>
            {/* Edit button in top right corner */}
            <button
                // onClick={onEdit}
                className='absolute top-4 right-4 cursor-pointer rounded-full bg-gray-200 p-2 transition-colors hover:bg-gray-300'
                aria-label='Edit wiki entry'
            >
                <PencilIcon className='h-5 w-5 text-gray-600' />
            </button>

            {/* Header with image and info */}
            <div className='mb-8 flex gap-6'>
                {/* Image with fallback */}
                <div className='flex aspect-square w-1/3 items-center justify-center overflow-hidden rounded-lg bg-gray-100 shadow-md'>
                    {wikiEntry.photo?.url ? (
                        <img
                            className='h-full w-full object-cover'
                            src={wikiEntry.photo.url}
                            alt={`${wikiEntry.name}`}
                        />
                    ) : (
                        <span className='text-gray-400'>
                            No image available
                        </span>
                    )}
                </div>

                {/* Info panel */}
                <div className='flex flex-1 flex-col space-y-4 rounded-lg bg-gray-50 p-4'>
                    <h1 className='text-2xl font-bold text-gray-900'>
                        {wikiEntry.name}
                    </h1>
                    Type: {wikiEntry.type}
                    <div className='mt-auto border-t border-gray-200 pt-4'>
                        {/* Additional details could go here */}
                        <p className='text-sm text-gray-500 dark:text-gray-400'>
                            Last updated: {new Date().toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content area */}
            <article
                className='prose max-w-none rounded-lg bg-gray-50 p-5'
                dangerouslySetInnerHTML={{ __html: wikiEntry.content }}
            />
        </div>

        // <TipTap
        //     content={content}
        //     onChange={onChange}
        // />
    );
}
