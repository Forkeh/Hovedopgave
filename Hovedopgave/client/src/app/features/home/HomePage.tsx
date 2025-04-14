import { Link } from 'react-router';

export default function HomePage() {
    return (
        <div>
            HomePage
            <div>
                <Link to={'/campaigns'}>To site</Link>
            </div>
        </div>
    );
}
