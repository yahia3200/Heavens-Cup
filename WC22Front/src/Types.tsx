// match type
// type date like Tuesday 1 January 2020
// enforce the first string to be a day of the week
// enforce the third string to be a month of the year
type Date = `${'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'}\
 ${number}\
 ${'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December'}\
 ${number}`;
type Email = `${string}@${string}.${string}`;
type Time = `${number}:${number}`;

export type Match = {
    date: Date;
    time: Time;
    team1: string;
    team2: string;
    referees: string[];
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
    email: Email;
    username: string;
    birthDate: Date;
    type: 'fan' | 'manager';
    nationality: string | null;
}