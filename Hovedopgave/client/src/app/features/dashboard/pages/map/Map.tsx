import { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import MapPinCanvas from './MapPinCanvas';
import EditPinDialog from './EditPinDialog';
import { useCampaigns } from '@/lib/hooks/useCampaigns';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';

type Props = {
    isViewOnly: boolean;
    campaign: Campaign;
};

export default function Map({ isViewOnly, campaign }: Props) {
    const [selectedPin, setSelectedPin] = useState<Pin>();
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingPin, setEditingPin] = useState<Pin | null>(null);
    const [isPanning, setIsPanning] = useState(false);
    const [pins, setPins] = useState<Pin[]>([...campaign.mapPins]);

    const { setCampaignMapPins } = useCampaigns(campaign.id);

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

    const handleSavePins = () => {
        setCampaignMapPins.mutate(pins, {
            onSuccess: () => {
                toast('Saved map pins! 😎', {
                    type: 'success',
                });
            },
            onError: () => {
                toast('Something went wrong saving the pins 😬', {
                    type: 'error',
                });
            },
        });
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
                                viewOnly={isViewOnly}
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
                    {!isViewOnly && (
                        <div className='bg-opacity-75 absolute right-2 bottom-2 rounded bg-white p-2 text-xs text-gray-700 shadow-sm'>
                            <p>Double Click: Add pin</p>
                            <p>Drag: Move pin</p>
                            <p>Right-click: Delete pin</p>
                        </div>
                    )}
                </div>
                {!isViewOnly && (
                    <Button
                        onClick={handleSavePins}
                        disabled={setCampaignMapPins.isPending}
                    >
                        Save Pins
                    </Button>
                )}
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
