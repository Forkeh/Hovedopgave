type Props = {
    campaign: Campaign;
};

export default function CampaignListCard({ campaign }: Props) {
    return (
        <div className='rounded-md border p-4 transition-shadow hover:shadow-md'>
            <div className='flex items-start justify-between'>
                <h3 className='text-lg font-bold'>{campaign.name}</h3>
            </div>

            <div className='mt-2 text-sm text-gray-600'>
                <div>
                    <b>DM:</b> {campaign.dungeonMaster.displayName}
                </div>
                <div>
                    <b>Players:</b>{' '}
                    {campaign.players.map((p) => p.displayName).join(', ')}
                </div>
            </div>
        </div>
    );
}
