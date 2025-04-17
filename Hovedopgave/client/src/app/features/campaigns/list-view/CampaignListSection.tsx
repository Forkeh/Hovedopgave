import CampaignListCard from './CampaignListCard';

type Props = {
    title: string;
    campaigns?: Campaign[];
    emptyMessage: string;
};

export default function CampaignListSection({
    title,
    campaigns,
    emptyMessage,
}: Props) {
    return (
        <div className='mb-8'>
            <h2 className='mb-4 text-xl text-gray-600'>{title}</h2>
            {campaigns?.length ? (
                <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                    {campaigns.map((campaign) => (
                        <CampaignListCard
                            key={campaign.id}
                            campaign={campaign}
                        />
                    ))}
                </div>
            ) : (
                <div className='p-2 text-gray-500'>{emptyMessage}</div>
            )}
        </div>
    );
}
