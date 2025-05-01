import { WikiEntryType } from "../enums/wikiEntryType";

type User = {
    id: string;
    email: string;
    displayName: string;
};

type Campaign = {
    id: string;
    name: string;
    photo: Photo;
    dungeonMaster: User;
    players: User[];
    mapPins: Pin[];
};

type Photo = {
    id: string;
    url: string;
    publicId: string;
    userId: string;
};

type Pin = {
    id: string;
    campaignId?: string;
    positionX: number;
    positionY: number;
    title: string;
    description: string;
    icon: string;
};

type WikiEntry = {
    id: string;
    type: WikiEntryType;
    name: string;
    content: string;
    xmin: number;
    campaignId: string;
    photo: Photo?;
};
