import { BeatLoader } from 'react-spinners';

export default function Loader() {
    return (
        <div className='flex min-h-full w-full animate-in items-center justify-center  fade-in'>
            <BeatLoader
                size={25}
                color='oklch(79.5% 0.184 86.047)'
                // color='oklch(79.5% 0.184 86.047)'
            />
        </div>
    );
}
