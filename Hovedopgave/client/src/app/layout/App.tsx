import { Link } from 'react-router';
import LoginForm from '../features/account/LoginForm';

function App() {
    return (
        <>
            <h1 className='text-center text-2xl font-bold'>
                Welcome to DnD Manager
            </h1>
            <LoginForm />
            <div>
                Don't have an account?{' '}
                <Link to={'/register'}>Sign up here!</Link>
            </div>
        </>
    );
}

export default App;
