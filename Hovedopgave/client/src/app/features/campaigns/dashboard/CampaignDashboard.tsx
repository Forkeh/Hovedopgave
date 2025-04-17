import { useAccount } from '@/lib/hooks/useAccount';
import { Link, useParams } from 'react-router';

export default function CampaignDashboard() {
    const { id } = useParams();
    const { currentUser } = useAccount();

    return (
        <main className='flex flex-grow overflow-hidden'>
            <aside className='flex min-w-40 flex-col items-center justify-center gap-3 bg-slate-800 p-5 text-white'>
                <div>Map</div>
                <div>Wiki</div>
                <div>Players</div>
                <div>Chatbot</div>
            </aside>
        </main>
    );
}
