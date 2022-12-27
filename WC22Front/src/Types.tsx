// match type
export type Match = {
    date: string;
    time: string;
    team1: string;
    team2: string;
    refrees: string[3];
    stadium: string;
};

// stadium type
export type Stadium = {
    name: string;
    width: number;
    height: number;
    reservedSeats: { x: number, y: number }[];
};

// user type
export type User = {
    firstName: string;
    lastName: string;
    gender: 'male' | 'female';
    email: string;
    username: string;
    birthDate: string;
    type: 'fan' | 'manager';
    nationality: string | null;
}