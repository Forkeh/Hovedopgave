import { useAccount } from '@/lib/hooks/useAccount';
import UserMenu from './UserMenu';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';

export default function NavBar() {
    const { currentUser } = useAccount();

    return (
        <div className='h-15 bg-slate-800 px-5 text-white flex items-center justify-between'>
            NavBar
            {currentUser ? (
                <UserMenu />
            ) : (
                <div className='gap-5 flex'>
                    <Link to={'/login'}>Login</Link>
                    <Link to={'/register'}>Register</Link>
                </div>
            )}
        </div>
    );
}
