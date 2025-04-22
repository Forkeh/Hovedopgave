import React from 'react';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card';

type PinComponentProps = {
    pin: Pin;
    isActive: boolean;
    onClick: (e: React.MouseEvent, pin: Pin) => void;
    onRightClick: (e: React.MouseEvent, pinId: string) => void;
    onMouseDown: (e: React.MouseEvent, pinId: string) => void;
    onEdit?: (pin: Pin) => void;
    disableHoverCard?: boolean;
};

const MapPin = ({
    pin,
    isActive,
    onClick,
    onRightClick,
    onMouseDown,
    onEdit,
    disableHoverCard = false,
}: PinComponentProps) => {
    const pinIcon = (
        <div
            className={`flex h-6 w-6 items-center justify-center ${
                isActive ? 'text-blue-500' : 'text-red-500'
            }`}
        >
            <svg
                viewBox='0 0 24 24'
                fill='currentColor'
                className='h-6 w-6'
            >
                <path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z' />
            </svg>
        </div>
    );

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onEdit) {
            onEdit(pin);
        }
    };

    if (disableHoverCard) {
        return (
            <div
                onClick={(e) => onClick(e, pin)}
                onContextMenu={(e) => onRightClick(e, pin.id)}
                onMouseDown={(e) => onMouseDown(e, pin.id)}
            >
                {pinIcon}
            </div>
        );
    }

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <div
                    onClick={(e) => onClick(e, pin)}
                    onContextMenu={(e) => onRightClick(e, pin.id)}
                    onMouseDown={(e) => onMouseDown(e, pin.id)}
                >
                    {pinIcon}
                </div>
            </HoverCardTrigger>
            <HoverCardContent className='w-80 p-4'>
                <div className='space-y-2'>
                    <h3 className='font-semibold'>
                        {pin.title || 'Untitled Pin'}
                    </h3>
                    <p className='text-sm'>
                        {pin.description || 'No description'}
                    </p>
                    <button
                        onClick={handleEdit}
                        className='text-xs text-blue-500 hover:text-blue-700'
                    >
                        Edit
                    </button>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
};

export default MapPin;
