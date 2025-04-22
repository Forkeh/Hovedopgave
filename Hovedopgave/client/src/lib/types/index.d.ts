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
};

type Photo = {
    id: string;
    url: string;
    publicId: string;
    userId: string;
};

type Pin = {
    id: string;
    positionX: number;
    positionY: number;
};
