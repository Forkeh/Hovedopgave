import React from 'react';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card';
import PinIcon from './icons/PinIcon';
import { PinIconsMap } from './icons/PinIconsMap';
import { Pin } from '@/lib/types';

type Props = {
    pin: Pin;
    isActive: boolean;
    onMouseDown: (e: React.MouseEvent, pin: Pin) => void;
    onEdit?: (pin: Pin) => void;
    disableHoverCard?: boolean;
    isViewOnly: boolean;
};

const MapPin = ({
    pin,
    isActive,
    onMouseDown,
    onEdit,
    disableHoverCard = false,
    isViewOnly,
}: Props) => {
    const iconName = pin.icon as keyof typeof PinIconsMap | undefined;

    const pinIcon = (
        <PinIcon
            name={iconName}
            className={`h-6 w-6 ${isActive ? 'text-blue-500' : 'text-red-500'}`}
        />
    );

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onEdit) {
            onEdit(pin);
        }
    };

    if (disableHoverCard) {
        return <div onMouseDown={(e) => onMouseDown(e, pin)}>{pinIcon}</div>;
    }

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <div onMouseDown={(e) => onMouseDown(e, pin)}>{pinIcon}</div>
            </HoverCardTrigger>
            <HoverCardContent className='w-80 p-4'>
                <div className='space-y-2'>
                    <h3 className='font-semibold'>
                        {pin.title || 'Untitled Pin'}
                    </h3>
                    <p className='text-sm'>
                        {pin.description || 'No description'}
                    </p>
                    {!isViewOnly && (
                        <button
                            onClick={handleEdit}
                            className='text-xs text-blue-500 hover:text-blue-700'
                        >
                            Edit
                        </button>
                    )}
                </div>
            </HoverCardContent>
        </HoverCard>
    );
};

export default MapPin;
