type User = {
    id: string;
    email: string;
    displayName: string;
};

type Campaign = {
    id: string;
    name: string;
    mapUrl: string;
    dungeonMaster: User;
    players: User[];
};

type Photo = {
    id: string;
    url: string;
};
