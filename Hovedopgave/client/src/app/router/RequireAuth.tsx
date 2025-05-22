import { Navigate, Outlet, useLocation } from 'react-router';
import { useAccount } from '../../lib/hooks/useAccount';
import Loader from '@/components/Loader';

export default function RequireAuth() {
    const { currentUser, loadingUserInfo } = useAccount();
    const location = useLocation();

    if (loadingUserInfo) {
        return <Loader />;
    }

    if (!currentUser) {
        return (
            <Navigate
                to='/login'
                state={{ from: location }}
            />
        );
    }

    return <Outlet />;
}
