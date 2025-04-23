import { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import MapPinCanvas from './MapPinCanvas';
import EditPinDialog from './EditPinDialog';

type Props = {
    viewOnly: boolean;
    campaign: Campaign;
};

export default function Map({ viewOnly, campaign }: Props) {
    const [selectedPin, setSelectedPin] = useState<Pin>();
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingPin, setEditingPin] = useState<Pin | null>(null);
    const [isPanning, setIsPanning] = useState(false);
    const [pins, setPins] = useState<Pin[]>([
        {
            id: '1',
            campaignId: '960210ac-3862-4f78-ae71-ce27936e7824',
            positionX: 0.5,
            positionY: 0.3,
            title: 'Castle',
            description: 'The main castle in the kingdom',
        },
        {
            id: '2',
            campaignId: '960210ac-3862-4f78-ae71-ce27936e7824',
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
        if (selectedPin?.id === deletedPin.id) {
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

    return (
        <>
            <div>Selected pin: {selectedPin?.id}</div>
            <div>
                <div className='relative h-150 w-150'>
                    <TransformWrapper
                        onPanningStart={() => setIsPanning(true)}
                        onPanningStop={() => {
                            setTimeout(() => setIsPanning(false), 100);
                        }}
                        doubleClick={{ disabled: true }}
                    >
                        <TransformComponent>
                            <MapPinCanvas
                                image={campaign.photo.url}
                                imageAlt='Map image'
                                draggable={true}
                                viewOnly={false}
                                pins={pins}
                                onNewPin={handleNewPin}
                                onExistingPin={handleExistingPin}
                                onDraggedPin={handleDraggedPin}
                                onDeletedPin={handleDeletedPin}
                                onEditPin={handleEditPin}
                                isPanning={isPanning}
                            />
                        </TransformComponent>
                    </TransformWrapper>
                    {!viewOnly && (
                        <div className='bg-opacity-75 absolute right-2 bottom-2 rounded bg-white p-2 text-xs text-gray-700 shadow-sm'>
                            <p>Double Click: Add pin</p>
                            <p>Drag: Move pin</p>
                            <p>Right-click: Delete pin</p>
                        </div>
                    )}
                </div>
                <button
                    onClick={handleSavePins}
                    className='mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
                >
                    Save Pins
                </button>
            </div>

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
