import { useAccount } from '@/lib/hooks/useAccount';
import UserMenu from './UserMenu';
import { Link } from 'react-router';

export default function NavBar() {
    const { currentUser } = useAccount();

    return (
        <div className='flex min-h-30 items-center justify-between border-b-4 border-double border-yellow-500/30 bg-gray-900 px-5'>
            <Link
                className='flex font-cinzel'
                to={'/campaigns'}
            >
                <div className='flex items-center'>
                    <img
                        src='/wizard_guy.png'
                        className='size-25'
                    />
                    <section>
                        <div className='text-center text-yellow-300'>
                            Dungeon and Dragons
                        </div>
                        <div className='text-3xl font-extrabold'>
                            {' '}
                            Campaign Codex
                        </div>
                    </section>
                </div>
            </Link>

            {currentUser ? (
                <div className='flex items-center gap-5 text-yellow-100'>
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
