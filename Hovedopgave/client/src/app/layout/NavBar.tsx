import { useAccount } from '@/lib/hooks/useAccount';
import UserMenu from './UserMenu';
import { Link } from 'react-router';

export default function NavBar() {
    const { currentUser } = useAccount();

    return (
        <div className='flex min-h-30 items-center justify-between border-b border-yellow-500 bg-slate-800 px-5 text-white'>
            <Link
                className='text-3xl font-extrabold'
                to={'/campaigns'}
            >
                Dungeon and Dragons thingie-ma-bob
            </Link>

            {currentUser ? (
                <div className='flex items-center gap-5'>
                    <div>Hello {currentUser.displayName}</div>
                    <UserMenu />
                </div>
            ) : (
                <div className='flex gap-5'>
                    <Link to={'/login'}>Login</Link>
                    <Link to={'/register'}>Register</Link>
                </div>
            )}
        </div>
    );
}
