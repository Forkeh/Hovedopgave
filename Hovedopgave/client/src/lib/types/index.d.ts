import { CharacterClass } from '../enums/CharacterClass';
import { CharacterRace } from '../enums/CharacterRace';
import { WikiEntryType } from '../enums/wikiEntryType';

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
    id?: string;
    campaignId: string;
    name: string;
    content: string;
    isVisible: boolean;
    type: WikiEntryType;
    xmin?: number;
    photo?: Photo;
    photoId?: string;
};

type Character = {
    id?: string;
    name: string;
    race: CharacterRace;
    class: CharacterClass;
    backstory: string;
    isRetired?: boolean;
    campaignId: string;
    userId: string;
    photoId?: string;
    photo?: Photo;
};
