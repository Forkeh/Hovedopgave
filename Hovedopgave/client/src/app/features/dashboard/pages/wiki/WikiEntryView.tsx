import { useWiki } from '@/lib/hooks/useWiki';
import { PencilIcon } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import Loader from '@/components/loader/Loader';
import { HtmlContent } from '@/components/html-content/HtmlContent';

export default function WikiEntryView() {
    const { entryId } = useParams();
    const { wikiEntry, wikiEntryIsLoading } = useWiki(undefined, entryId);
    const navigate = useNavigate();

    const handleEditNavigate = () => {
        navigate(`edit`);
    };

    if (wikiEntryIsLoading) {
        return <Loader />;
    }

    if (!wikiEntry) {
        return (
            <div className='flex h-full items-center justify-center text-4xl font-semibold'>
                Could not find entry
            </div>
        );
    }

    return (
        <div className='parchment-card relative mx-auto my-5 flex w-full max-w-3xl flex-col rounded-lg bg-white p-6 shadow-md'>
            {/* Edit button in top right corner */}

            <PencilIcon
                onClick={handleEditNavigate}
                className='absolute top-3 right-3 cursor-pointer rounded-full bg-stone-600 p-2 text-stone-300 transition-colors hover:bg-stone-500'
                size={40}
            />

            <div className='mb-8 flex gap-6'>
                <div className='flex aspect-square w-1/3 items-center justify-center overflow-hidden rounded-lg border-4 border-double border-yellow-800/80 bg-gradient-to-br from-orange-200 to-orange-300 shadow-md'>
                    {wikiEntry.photo?.url ? (
                        <img
                            className='h-full w-full object-cover'
                            src={wikiEntry.photo.url}
                            alt={`${wikiEntry.name}`}
                        />
                    ) : (
                        <span className='text-black/30'>
                            No image available
                        </span>
                    )}
                </div>

                <div className='flex flex-1 flex-col gap-8 rounded-lg bg-orange-50 p-4 text-black'>
                    <h1 className='text-3xl font-bold'>{wikiEntry.name}</h1>
                    <div>
                        <span className='font-bold'>Type: </span>{' '}
                        {wikiEntry.type}
                    </div>
                </div>
            </div>

            <HtmlContent
                content={wikiEntry.content}
                className='max-w-none rounded-lg bg-gray-50 bg-orange-50 p-5'
            />
        </div>
    );
}
