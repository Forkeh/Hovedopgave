export default function WikiWelcome() {
    return (
        <div className='flex h-full flex-col items-center justify-center p-8 text-center'>
            <div className='max-w-md'>
                <h2 className='mb-4 font-cinzel text-3xl font-extrabold text-yellow-100'>
                    📜 Campaign Wiki
                </h2>
                <p className='mb-4 text-lg text-yellow-200/80'>
                    The campaign's knowledge repository
                </p>
                <p className='text-yellow-100/60'>
                    Select an entry from the sidebar to explore the campaign
                    world
                </p>
            </div>
        </div>
    );
}
