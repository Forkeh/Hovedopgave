import { useState, useRef, useEffect } from 'react';
import MapPin from './MapPin';
import { Pin } from '@/lib/types';

type Props = {
    image: string;
    imageAlt: string;
    draggable: boolean;
    pins?: Pin[];
    viewOnly?: boolean;
    onNewPin?: (pin: Pin) => void;
    onExistingPin?: (pin: Pin) => void;
    onDraggedPin?: (pin: Pin) => void;
    onEditPin?: (pin: Pin) => void;
    isPanning: boolean;
};

const MapPinCanvas = ({
    image,
    imageAlt,
    draggable,
    pins = [],
    viewOnly = false,
    onNewPin,
    onExistingPin,
    onDraggedPin,
    onEditPin,
    isPanning,
}: Props) => {
    const [localPins, setLocalPins] = useState<Pin[]>(pins);
    const [activePin, setActivePin] = useState<Pin | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isClickPending, setIsClickPending] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Update local pins when props pins change
    useEffect(() => {
        setLocalPins(pins);
    }, [pins]);

    // Add global mouse up listener
    useEffect(() => {
        const handleGlobalMouseUp = () => {
            if (isDragging) {
                setIsDragging(false);
            }
        };

        document.addEventListener('mouseup', handleGlobalMouseUp);
        return () => {
            document.removeEventListener('mouseup', handleGlobalMouseUp);
        };
    }, [isDragging]);

    const isTargetContainer = (target: EventTarget) => {
        return (
            target === containerRef.current ||
            target === containerRef.current?.querySelector('img')
        );
    };

    const getRelativePosition = (clientX: number, clientY: number) => {
        if (!containerRef.current) return { positionX: 0, positionY: 0 };

        const rect = containerRef.current.getBoundingClientRect();

        // Calculate and clamp coordinates between 0 and 1
        const positionX = Math.max(
            0,
            Math.min(1, (clientX - rect.left) / rect.width),
        );
        const positionY = Math.max(
            0,
            Math.min(1, (clientY - rect.top) / rect.height),
        );

        return { positionX, positionY };
    };

    // Event handlers
    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (
            viewOnly ||
            isDragging ||
            isPanning ||
            !isClickPending ||
            !isTargetContainer(e.target)
        ) {
            return;
        }

        const { positionX, positionY } = getRelativePosition(
            e.clientX,
            e.clientY,
        );

        const newPin: Pin = {
            title: '',
            description: '',
            id: Date.now().toString(),
            positionX,
            positionY,
            icon: 'default',
        };

        onNewPin?.(newPin);
        setLocalPins((prevPins) => [...prevPins, newPin]);
        setIsClickPending(false);
    };

    const handleContainerMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!viewOnly && isTargetContainer(e.target)) {
            setIsClickPending(true);
        }
    };

    const handlePinMouseDown = (e: React.MouseEvent, pin: Pin) => {
        if (viewOnly || !draggable) return;

        e.stopPropagation();
        setIsClickPending(false);
        setActivePin(pin);
        setIsDragging(true);
        onExistingPin?.(pin);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (viewOnly || !isDragging || !activePin || !containerRef.current)
            return;

        setIsClickPending(false);
        const { positionX, positionY } = getRelativePosition(
            e.clientX,
            e.clientY,
        );

        const updatedPins = localPins.map((pin) =>
            pin.id === activePin.id ? { ...pin, positionX, positionY } : pin,
        );

        setLocalPins(updatedPins);

        const updatedPin = updatedPins.find((pin) => pin.id === activePin.id);
        if (updatedPin) {
            onDraggedPin?.(updatedPin);
        }
    };

    return (
        <div
            ref={containerRef}
            className='relative h-full w-full select-none'
            onClick={handleContainerClick}
            onMouseDown={handleContainerMouseDown}
            onMouseMove={handleMouseMove}
            onDragStart={(e) => e.preventDefault()}
        >
            <img
                src={image}
                alt={imageAlt}
                className='h-full w-full object-cover'
                draggable='false'
                onDragStart={(e) => e.preventDefault()}
            />

            {localPins.map((pin) => (
                <div
                    key={pin.id}
                    className={`absolute -mt-6 -ml-3 h-6 w-6 cursor-pointer ${
                        isDragging && pin.id === activePin?.id ? 'z-20' : 'z-10'
                    }`}
                    style={{
                        left: `${pin.positionX * 100}%`,
                        top: `${pin.positionY * 100}%`,
                    }}
                >
                    <MapPin
                        pin={pin}
                        isActive={pin.id === activePin?.id}
                        onMouseDown={handlePinMouseDown}
                        onEdit={onEditPin}
                        disableHoverCard={isDragging}
                        isViewOnly={viewOnly}
                    />
                </div>
            ))}
        </div>
    );
};

export default MapPinCanvas;
