import ImagePinContainer from '@/app/features/dashboard/pages/map/ImagePinContainer';
import { useCampaigns } from '@/lib/hooks/useCampaigns';
import { useState } from 'react';
import { useParams } from 'react-router';
import EditPinDialog from './EditPinDialog';

export default function MapPage() {
    const { id } = useParams();
    const { campaign, campaignIsLoading } = useCampaigns(id);

    const [selectedPin, setSelectedPin] = useState<Pin>();
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingPin, setEditingPin] = useState<Pin | null>(null);
    const [pins, setPins] = useState<Pin[]>([
        {
            id: '1',
            positionX: 0.5,
            positionY: 0.3,
            title: 'Castle',
            description: 'The main castle in the kingdom',
        },
        {
            id: '2',
            positionX: 0.2,
            positionY: 0.8,
            title: 'Forest',
            description: 'A dangerous magical forest',
        },
    ]);

    const handleNewPin = (pin: Pin) => {
        pin.campaignId = campaign?.id;
        setPins((prevPins) => [...prevPins, pin]);
    };

    const handleExistingPin = (pin: Pin) => {
        setSelectedPin(pin);
    };

    const handleDraggedPin = (updatedPin: Pin) => {
        setPins((prevPins) =>
            prevPins.map((pin) =>
                pin.id === updatedPin.id ? updatedPin : pin,
            ),
        );
    };

    const handleDeletedPin = (deletedPin: Pin) => {
        setPins((prevPins) =>
            prevPins.filter((pin) => pin.id !== deletedPin.id),
        );
        if (selectedPin === deletedPin) {
            setSelectedPin(undefined);
        }
    };

    const handleEditPin = (pin: Pin) => {
        setEditingPin(pin);
        setIsEditDialogOpen(true);
    };

    const handleSaveEditedPin = () => {
        if (!editingPin) return;

        setPins((prevPins) =>
            prevPins.map((pin) =>
                pin.id === editingPin.id ? editingPin : pin,
            ),
        );

        setIsEditDialogOpen(false);
        setEditingPin(null);
    };

    // Handler to save pins to backend
    const handleSavePins = () => {
        console.log('Saving pins to backend:', pins);
        // Implement your API call here
    };

    if (campaignIsLoading) {
        return <div>Campaign is loading...</div>;
    }

    return (
        <>
            <div>Map</div>
            <div>Name: {campaign?.name}</div>
            <div>Selected pin: {selectedPin?.id}</div>
            <div>
                <ImagePinContainer
                    image={campaign!.photo.url}
                    imageAlt='Map image'
                    draggable={true}
                    viewOnly={false}
                    pins={pins}
                    onNewPin={handleNewPin}
                    onExistingPin={handleExistingPin}
                    onDraggedPin={handleDraggedPin}
                    onDeletedPin={handleDeletedPin}
                    onEditPin={handleEditPin}
                />
            </div>
            <button
                onClick={handleSavePins}
                className='mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
            >
                Save Pins
            </button>

            {editingPin && (
                <EditPinDialog
                    isEditDialogOpen={isEditDialogOpen}
                    setIsEditDialogOpen={setIsEditDialogOpen}
                    handleSaveEditedPin={handleSaveEditedPin}
                    editingPin={editingPin}
                    setEditingPin={setEditingPin}
                />
            )}
        </>
    );
}
