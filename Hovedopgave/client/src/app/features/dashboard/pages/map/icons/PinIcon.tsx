import { SVGProps } from 'react';
import { IconsMap } from './PinIconsMap';

type Props = {
    name?: string;
} & SVGProps<SVGSVGElement>;

export default function PinIcon({ name = 'default', ...props }: Props) {
    const PinIcon =
        IconsMap[name as keyof typeof IconsMap] || IconsMap['default'];
    return <PinIcon {...props} />;
}
