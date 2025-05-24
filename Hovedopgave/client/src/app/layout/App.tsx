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
                <main className='flex h-screen flex-col bg-gradient-to-br from-gray-700 to-gray-800 font-baskerville text-yellow-100'>
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
