import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export default function HomePage() {
    return (
        <div className='flex h-screen flex-col items-center justify-center gap-5'>
            <h1 className='flex-wrap text-center text-4xl font-extrabold'>
                Dungeons and Dragons Admin thingie!
            </h1>
            <div>
                <Button>
                    <Link to={'/campaigns'}>To site</Link>
                </Button>
            </div>
        </div>
    );
}
