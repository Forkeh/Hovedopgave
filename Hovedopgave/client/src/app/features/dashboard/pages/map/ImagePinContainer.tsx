import { useState, useRef, useEffect } from 'react';
import MapPin from './MapPin';

type Props = {
    image: string;
    imageAlt: string;
    draggable: boolean;
    pins?: Pin[];
    viewOnly?: boolean; // New property to disable editing
    onNewPin?: (pin: Pin) => void;
    onExistingPin?: (pin: Pin) => void;
    onDraggedPin?: (pin: Pin) => void;
    onDeletedPin?: (pin: Pin) => void;
    onEditPin?: (pin: Pin) => void;
    isPanning: boolean;
};

const ImagePinContainer = ({
    image,
    imageAlt,
    draggable,
    pins = [], // Provide default empty array
    viewOnly = false, // Default to editing mode
    onNewPin,
    onExistingPin,
    onDraggedPin,
    onDeletedPin,
    onEditPin,
    isPanning,
}: Props) => {
    const [localPins, setLocalPins] = useState<Pin[]>(pins);
    const [activePinId, setActivePinId] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isClickPending, setIsClickPending] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Update local pins when props pins change
    useEffect(() => {
        setLocalPins(pins || []);
    }, [pins]);

    // Function to create a new pin
    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // Exit if view-only mode is enabled or other conditions are met
        if (
            viewOnly ||
            isDragging ||
            isPanning ||
            !containerRef.current ||
            !isClickPending ||
            (e.target !== containerRef.current &&
                e.target !== containerRef.current.querySelector('img'))
        ) {
            return;
        }

        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        // Limit the values between 0 and 1
        const positionX = Math.max(0, Math.min(1, x));
        const positionY = Math.max(0, Math.min(1, y));

        const newPin: Pin = {
            id: Date.now().toString(),
            positionX,
            positionY,
        };

        if (onNewPin) {
            onNewPin(newPin);
        }

        setLocalPins((prevPins) => [...prevPins, newPin]);
        setIsClickPending(false);
    };

    // Handle mousedown on container
    const handleContainerMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        // Skip in view-only mode
        if (viewOnly) return;

        // Check if the click is directly on the container or image (not on a pin)
        if (
            e.target === containerRef.current ||
            e.target === containerRef.current?.querySelector('img')
        ) {
            setIsClickPending(true);
        }
    };

    // Function to handle pin click
    const handlePinClick = (e: React.MouseEvent, pin: Pin) => {
        e.stopPropagation();
        setIsClickPending(false);
        if (onExistingPin) {
            onExistingPin(pin);
        }
        setActivePinId(pin.id);
    };

    // Function to delete a pin with right click
    const handlePinRightClick = (e: React.MouseEvent, deletedPin: Pin) => {
        e.preventDefault();
        e.stopPropagation();

        // Skip in view-only mode
        if (viewOnly) return;

        setLocalPins((prevPins) =>
            prevPins.filter((pin) => pin.id !== deletedPin.id),
        );

        if (onDeletedPin) {
            onDeletedPin(deletedPin);
        }

        setActivePinId(null);
        setIsClickPending(false);
    };

    // Functions for dragging pins
    const handlePinMouseDown = (e: React.MouseEvent, pinId: string) => {
        // Skip in view-only mode or if dragging is disabled
        if (viewOnly || !draggable) return;

        e.stopPropagation();
        setIsClickPending(false);
        setActivePinId(pinId);
        setIsDragging(true);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        // Skip in view-only mode
        if (viewOnly || !isDragging || !activePinId || !containerRef.current)
            return;

        // Cancel any pending clicks when we start dragging
        setIsClickPending(false);

        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        // Limit the values between 0 and 1
        const positionX = Math.max(0, Math.min(1, x));
        const positionY = Math.max(0, Math.min(1, y));

        const updatedPins = localPins.map((pin) =>
            pin.id === activePinId ? { ...pin, positionX, positionY } : pin,
        );

        setLocalPins(updatedPins);

        const updatedPin = updatedPins.find((pin) => pin.id === activePinId);
        if (updatedPin && onDraggedPin) {
            onDraggedPin(updatedPin);
        }
    };

    const handleMouseUp = () => {
        if (isDragging) {
            setIsDragging(false);
        }
    };

    // Prevent default behavior for dragstart
    const handleDragStart = (e: React.DragEvent) => {
        e.preventDefault();
    };

    // Add and remove event listeners
    useEffect(() => {
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    const handlePinEdit = (pin: Pin) => {
        if (onEditPin) {
            onEditPin(pin);
        }
    };

    return (
        <div
            ref={containerRef}
            className='relative h-full w-full select-none'
            onClick={handleContainerClick}
            onMouseDown={handleContainerMouseDown}
            onMouseMove={handleMouseMove}
            onDragStart={handleDragStart}
        >
            <img
                src={image}
                alt={imageAlt}
                className='h-full w-full object-cover'
                draggable='false'
                onDragStart={(e) => e.preventDefault()}
            />

            {localPins &&
                localPins.map((pin) => (
                    <div
                        key={pin.id}
                        className={`absolute -mt-6 -ml-3 h-6 w-6 cursor-pointer ${isDragging && pin.id === activePinId ? 'z-20' : 'z-10'}`}
                        style={{
                            left: `${pin.positionX * 100}%`,
                            top: `${pin.positionY * 100}%`,
                        }}
                    >
                        <MapPin
                            pin={pin}
                            isActive={pin.id === activePinId}
                            onClick={handlePinClick}
                            onRightClick={handlePinRightClick}
                            onMouseDown={handlePinMouseDown}
                            onEdit={handlePinEdit}
                            disableHoverCard={isDragging}
                        />
                    </div>
                ))}

            {/* {draggable && !viewOnly && (
                <div className='bg-opacity-75 absolute right-2 bottom-2 rounded bg-white p-2 text-xs text-gray-700'>
                    <p>Double Click: Add pin</p>
                    <p>Drag: Move pin</p>
                    <p>Right-click: Delete pin</p>
                </div>
            )} */}
        </div>
    );
};

export default ImagePinContainer;
