import { useWiki } from '@/lib/hooks/useWiki';
import { PencilIcon } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { HtmlContent } from './HtmlContent';

export default function WikiEntryView() {
    const { entryId } = useParams();
    const { wikiEntry, wikiEntryIsLoading } = useWiki(undefined, entryId);
    const navigate = useNavigate();

    const handleEditNavigate = () => {
        navigate(`edit`);
    };

    if (wikiEntryIsLoading) {
        return (
            <div className='flex h-full items-center justify-center text-4xl font-semibold'>
                Loading entry...
            </div>
        );
    }

    if (!wikiEntry) {
        return (
            <div className='flex h-full items-center justify-center text-4xl font-semibold'>
                Could not find entry
            </div>
        );
    }

    return (
        <div className='relative mx-auto mt-5 flex w-full max-w-3xl flex-col rounded-lg bg-white p-6 shadow-md'>
            {/* Edit button in top right corner */}
            <button
                onClick={handleEditNavigate}
                className='absolute top-4 right-4 cursor-pointer rounded-full bg-gray-200 p-2 transition-colors hover:bg-gray-300'
            >
                <PencilIcon className='h-5 w-5 text-gray-600' />
            </button>

            <div className='mb-8 flex gap-6'>
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

                <div className='flex flex-1 flex-col gap-8 rounded-lg bg-gray-50 p-4'>
                    <h1 className='text-3xl font-bold text-gray-900'>
                        {wikiEntry.name}
                    </h1>
                    <div>
                        <span className='font-bold'>Type: </span>{' '}
                        {wikiEntry.type}
                    </div>
                </div>
            </div>

            <HtmlContent
                content={wikiEntry.content}
                className='max-w-none rounded-lg bg-gray-50 p-5'
            />
        </div>
    );
}
