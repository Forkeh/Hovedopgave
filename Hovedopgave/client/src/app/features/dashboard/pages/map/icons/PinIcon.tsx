import { SVGProps } from 'react';
import { PinIconsMap } from './PinIconsMap';

type IconName = keyof typeof PinIconsMap;

type Props = {
    name?: IconName;
} & SVGProps<SVGSVGElement>;

export default function PinIcon({ name = 'default', ...props }: Props) {
    const PinIcon = PinIconsMap[name] || PinIconsMap['default'];
    return <PinIcon {...props} />;
}
