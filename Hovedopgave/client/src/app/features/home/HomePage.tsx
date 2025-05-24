import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div className='flex h-screen flex-col items-center justify-center gap-5 bg-gradient-to-br from-gray-700 to-gray-800'>
            <section className='relative flex w-full flex-col items-center font-cinzel select-none'>
                <img
                    src='splash.png'
                    className='animate-float h-150 drop-shadow-xl'
                />
                <div className='absolute bottom-20 flex flex-col text-center'>
                    <h2 className='text-center text-xl font-bold text-yellow-300 text-shadow-lg/30'>
                        Dungeon and Dragons
                    </h2>
                    <h1 className='text-5xl font-extrabold text-yellow-50 text-shadow-lg/30'>
                        Campaign Codex
                    </h1>
                </div>
            </section>

            <Button
                className='cursor-pointer text-lg font-bold'
                size='lg'
                onClick={() => navigate('/campaigns')}
            >
                To site
            </Button>
        </div>
    );
}
