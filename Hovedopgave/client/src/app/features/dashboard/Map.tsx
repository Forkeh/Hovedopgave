import ImagePinContainer from '@/components/ImagePinContainer';
import { useCampaigns } from '@/lib/hooks/useCampaigns';
import { useState } from 'react';
import { useParams } from 'react-router';

// Define the Pin type
type Pin = {
    id: string;
    positionX: number;
    positionY: number;
};

export default function Map() {
    const { id } = useParams();
    const { campaign, campaignIsLoading } = useCampaigns(id);

    const [pins, setPins] = useState<Pin[]>([
        {
            id: '1',
            positionX: 10.5,
            positionY: 13.5,
        },
        {
            id: '2',
            positionX: 0.2,
            positionY: 0.8,
        },
    ]);

    const [selectedPin, setSelectedPin] = useState<string>();

    // Handler for new pins
    const handleNewPin = (pin: Pin) => {
        console.log('new pin: ', pin);
        setPins((prevPins) => [...prevPins, pin]);
    };

    // Handler for existing pins
    const handleExistingPin = (pin: Pin) => {
        console.log('existing pin: ', pin);
        setSelectedPin(pin.id);
    };

    // Handler for dragged pins
    const handleDraggedPin = (updatedPin: Pin) => {
        console.log('drag pin: ', updatedPin);
        setPins((prevPins) =>
            prevPins.map((pin) =>
                pin.id === updatedPin.id ? updatedPin : pin,
            ),
        );
    };

    const handleDeletedPin = (pinId: string) => {
        console.log('deleted pin: ', pinId);
        setPins((prevPins) => prevPins.filter((pin) => pin.id !== pinId));
    };

    // Handler to save pins to backend
    const handleSavePins = () => {
        // Add your API call here to save pins
        console.log('Saving pins to backend:', pins);
    };

    if (campaignIsLoading) {
        return <div>Campaign is loading...</div>;
    }

    return (
        <>
            <div>Map</div>
            <div>Name: {campaign?.name}</div>
            <div>Selected pin: {selectedPin}</div>
            <div className='h-96 w-full select-none'>
                <ImagePinContainer
                    image={campaign!.photo.url}
                    imageAlt='Map image'
                    draggable={true}
                    pins={pins}
                    onNewPin={handleNewPin}
                    onExistingPin={handleExistingPin}
                    onDraggedPin={handleDraggedPin}
                    onDeletedPin={handleDeletedPin}
                />
            </div>
            <button
                onClick={handleSavePins}
                className='mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
            >
                Save Pins
            </button>
        </>
    );
}
