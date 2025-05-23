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
import { HtmlContent } from '../../../../../components/HtmlContent';

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
            className={`h-6 w-6 drop-shadow-xs drop-shadow-black ${isActive ? 'text-orange-400' : 'text-orange-300'}`}
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
            <HoverCardContent className='w-80 rounded-2xl border-4 border-double border-black/80 bg-gradient-to-br from-orange-100 to-orange-200 p-0'>
                <div className='space-y-2'>
                    <h3 className='border-b-4 border-double border-black/30 p-4 text-3xl font-bold'>
                        {pin.title || 'Untitled Pin'}
                        {!isViewOnly && (
                            <PencilIcon
                                className='absolute top-4 right-4 cursor-pointer rounded-full bg-stone-700 p-2 text-stone-300 transition-colors hover:bg-stone-600'
                                onClick={handleEdit}
                                size={35}
                            />
                        )}
                    </h3>
                    <div className='max-h-[300px] overflow-y-auto px-4 pb-4'>
                        <HtmlContent
                            content={pin.description}
                            className='max-w-none text-sm text-black'
                        />
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
};

export default MapPin;
