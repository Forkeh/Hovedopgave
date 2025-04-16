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
                <main>
                    <NavBar />

                    <Outlet />
                </main>
            )}
        </>
    );
}

export default App;
