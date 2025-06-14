import { SVGProps } from 'react';

const DefaultIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width='1em'
            height='1em'
            {...props}
        >
            <path
                fill='currentColor'
                fillRule='evenodd'
                d='M11.906 1.994a8 8 0 0 1 8.09 8.421a8 8 0 0 1-1.297 3.957a1 1 0 0 1-.133.204l-.108.129q-.268.365-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18 18 0 0 1-.309-.38l-.133-.163a1 1 0 0 1-.13-.202a7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0a3 3 0 0 1 5.999 0'
                clipRule='evenodd'
            ></path>
        </svg>
    );
};

const DungeonIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 512 512'
            width='1em'
            height='1em'
            {...props}
        >
            <path
                fill='currentColor'
                d='M336.6 156.5c1.3 1.1 2.7 2.2 3.9 3.3c9.3 8.2 23 10.5 33.4 3.6l67.6-45.1c11.4-7.6 14.2-23.2 5.1-33.4c-16.6-18.3-35.7-34.3-56.9-47.3c-11.9-7.3-26.9-1.4-32.1 11.6l-30.5 76.2c-4.5 11.1.2 23.6 9.5 31.2zM328 36.8c5.1-12.8-1.6-27.4-15-30.5C294.7 2.2 275.6 0 256 0s-38.7 2.2-57 6.4c-13.5 3-20.2 17.6-15 30.4l30.3 75.8c4.5 11.3 16.8 17.2 29 16c4.2-.4 8.4-.6 12.7-.6s8.6.2 12.7.6c12.1 1.2 24.4-4.7 29-16zM65.5 85c-9.1 10.2-6.3 25.8 5.1 33.4l67.6 45.1c10.3 6.9 24.1 4.6 33.4-3.6c1.3-1.1 2.6-2.3 4-3.3c9.3-7.5 13.9-20.1 9.5-31.2l-30.7-76.2c-5.2-12.9-20.3-18.8-32.1-11.6c-21.2 13-40.3 29-56.8 47.4m314 137.1c.9 3.3 1.7 6.6 2.3 10c2.5 13 13 23.9 26.2 23.9h80c13.3 0 24.1-10.8 22.9-24c-2.5-27.2-9.3-53.2-19.7-77.3c-5.5-12.9-21.4-16.6-33.1-8.9l-68.6 45.7c-9.8 6.5-13.2 19.2-10 30.5zM53.9 145.8c-11.6-7.8-27.6-4-33.1 8.9C10.4 178.8 3.6 204.8 1.1 232c-1.2 13.2 9.6 24 22.9 24h80c13.3 0 23.8-10.8 26.2-23.9c.6-3.4 1.4-6.7 2.3-10c3.1-11.4-.2-24-10-30.5zM104 288H24c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24v-48c0-13.3-10.7-24-24-24m304 0c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24v-48c0-13.3-10.7-24-24-24zM24 416c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24v-48c0-13.3-10.7-24-24-24zm384 0c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24v-48c0-13.3-10.7-24-24-24zM272 192c0-8.8-7.2-16-16-16s-16 7.2-16 16v272c0 8.8 7.2 16 16 16s16-7.2 16-16zm-64 32c0-8.8-7.2-16-16-16s-16 7.2-16 16v240c0 8.8 7.2 16 16 16s16-7.2 16-16zm128 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v240c0 8.8 7.2 16 16 16s16-7.2 16-16z'
            ></path>
        </svg>
    );
};

const ForestIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width='1em'
            height='1em'
            {...props}
        >
            <path
                fill='currentColor'
                d='M16 12L9 2L2 12h1.86L0 18h7v4h4v-4h7l-3.86-6z'
            ></path>
            <path
                fill='currentColor'
                d='M20.14 12H22L15 2l-2.39 3.41L17.92 13h-1.95l3.22 5H24zM13 19h4v3h-4z'
            ></path>
        </svg>
    );
};

const CampIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 14 14'
            width='1em'
            height='1em'
            {...props}
        >
            <path
                fill='currentColor'
                fillRule='evenodd'
                d='M4.67.13a.75.75 0 0 1 1.037.218L7 2.325L8.293.348a.75.75 0 1 1 1.255.82L7.896 3.697l5.973 9.135a.75.75 0 0 1-.627 1.16H8v-3.019a1 1 0 1 0-2 0v3.02H.758a.75.75 0 0 1-.627-1.16l5.973-9.136L4.452 1.17A.75.75 0 0 1 4.669.13Z'
                clipRule='evenodd'
            ></path>
        </svg>
    );
};

const CastleIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width='1em'
            height='1em'
            {...props}
        >
            <path
                fill='currentColor'
                d='M22 9c-.55 0-1 .45-1 1v1h-2V4c0-.55-.45-1-1-1s-1 .45-1 1v1h-2V4c0-.55-.45-1-1-1s-1 .45-1 1v1h-2V4c0-.55-.45-1-1-1s-1 .45-1 1v1H7V4c0-.55-.45-1-1-1s-1 .45-1 1v7H3v-1c0-.55-.45-1-1-1s-1 .45-1 1v9c0 1.1.9 2 2 2h7v-3c0-1.1.9-2 2-2s2 .9 2 2v3h7c1.1 0 2-.9 2-2v-9c0-.55-.45-1-1-1m-11 3H9V9h2zm4 0h-2V9h2z'
            ></path>
        </svg>
    );
};

const HutIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 32 32'
            width='1em'
            height='1em'
            {...props}
        >
            <path
                fill='currentColor'
                d='M29 18.976c.53-.099.93-.563.93-1.121c0-.16-.03-.31-.06-.45a2 2 0 0 1-.098-.163l-.032-.057q-.365-.585-.74-1.163V16h-.015a62 62 0 0 0-1.735-2.525c-2.58-3.59-5.48-6.69-8.66-9.52c-1.43-1.27-3.58-1.27-5.03-.02c-3.3 2.84-6.17 5.91-8.82 9.54c-.87 1.18-1.7 2.4-2.48 3.66l-.034.047c-.042.058-.087.12-.126.183c0 .02-.01.03-.02.04c-.05.14-.08.29-.08.45c0 .59.429 1.065 1 1.132V31h26zM26.143 18c.36.056.622.173.857.307V29h-6.011v-3.78c0-1.89-1.706-3.22-3.538-3.22h-2.914C12.723 22 11 23.314 11 25.22V29H5V18.33c.244-.144.514-.271.89-.33h.956c.5.079.811.279 1.123.479c.402.258.805.516 1.611.516c.799 0 1.199-.257 1.6-.514c.313-.2.626-.402 1.13-.481h.956c.5.079.812.279 1.123.479c.402.258.805.516 1.611.516s1.207-.258 1.61-.515c.314-.2.627-.401 1.13-.48h.96c.503.079.817.28 1.13.48c.403.258.805.515 1.61.515s1.207-.258 1.61-.515c.313-.2.627-.401 1.13-.48z'
            ></path>
        </svg>
    );
};

export const PinIconsMap = {
    default: DefaultIcon,
    dungeon: DungeonIcon,
    forest: ForestIcon,
    camp: CampIcon,
    castle: CastleIcon,
    hut: HutIcon,
};
