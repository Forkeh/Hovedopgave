import { Outlet, useLocation } from 'react-router';
import NavBar from './NavBar';
import HomePage from '../features/home/HomePage';

function App() {
    const location = useLocation();

    return (
        <>
            {location.pathname === '/' ? (
                <HomePage />
            ) : (
                <main className='flex h-screen flex-col'>
                    <NavBar />

                    <div className='flex-1 overflow-auto'>
                        <Outlet />
                    </div>
                </main>
            )}
        </>
    );
}

export default App;
