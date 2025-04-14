import { useAccount } from '@/lib/hooks/useAccount';
import UserMenu from './UserMenu';
import { Link } from 'react-router';

export default function NavBar() {
    const { currentUser } = useAccount();

    return (
        <div className='flex h-15 items-center justify-between bg-slate-800 px-5 text-white'>
            NavBar
            {currentUser ? (
                <UserMenu />
            ) : (
                <div className='flex gap-5'>
                    <Link to={'/login'}>Login</Link>
                    <Link to={'/register'}>Register</Link>
                </div>
            )}
        </div>
    );
}
