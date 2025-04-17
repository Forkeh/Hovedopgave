import { useAccount } from '@/lib/hooks/useAccount';
import UserMenu from './UserMenu';
import { Link } from 'react-router';

export default function NavBar() {
    const { currentUser } = useAccount();

    return (
        <div className='flex h-15 items-center justify-between bg-slate-800 px-5 text-white'>
            <Link to={'/campaigns'}>Dungeon and Dragons thingie-ma-bob</Link>

            {currentUser ? (
                <div>
                    <div>Logged in as {currentUser.displayName}</div>
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
