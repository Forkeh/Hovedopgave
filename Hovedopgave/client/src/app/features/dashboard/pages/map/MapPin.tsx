import React from 'react';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card';
import PinIcon from './icons/PinIcon';
import { PinIconsMap } from './icons/PinIconsMap';
import { Pin } from '@/lib/types';
import { PencilIcon } from 'lucide-react';

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
        <HoverCard openDelay={200}>
            <HoverCardTrigger asChild>
                <div onMouseDown={(e) => onMouseDown(e, pin)}>{pinIcon}</div>
            </HoverCardTrigger>
            <HoverCardContent className='w-80 p-4'>
                <div className='space-y-2'>
                    <h3 className='font-semibold'>
                        {pin.title || 'Untitled Pin'}
                        {!isViewOnly && (
                            <PencilIcon
                                className='absolute top-4 right-4 cursor-pointer rounded-full bg-gray-200 p-2 transition-colors hover:bg-gray-300'
                                onClick={handleEdit}
                                size={30}
                            />
                        )}
                    </h3>
                    <p className='text-sm'>
                        {pin.description || 'No description'}
                    </p>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
};

export default MapPin;
