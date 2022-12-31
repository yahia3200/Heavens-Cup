// match type
// type date like Tuesday 1 January 2020
// enforce the first string to be a day of the week
// enforce the third string to be a month of the year
export type CustomDate = `${'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'}\
 ${number}\
 ${'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December'}\
 ${number}`;
export type Email = `${string}@${string}.${string}`;
export type userType = 'fan' | 'manager' | 'admin';
export type Gender = "male" | "female"
type Time = `${number}:${number}`;

export type Match = {
    date: CustomDate;
    time: Time;
    team1: string;
    team2: string;
    referees: string[];
    stadium: string;
    id: string;
};

// stadium type
export type Stadium = {
    name: string;
    width: number;
    height: number;
    reservedSeats: { x: number, y: number }[];
    id: string;
};

// user type
export type User = {
    firstName: string;
    lastName: string;
    gender: 'male' | 'female';
    email: Email;
    username: string;
    birthDate: Date;
    type: userType;
    nationality: string | null;
    age: number;
    token: string;
    approved?: boolean;
    id?: string;
}

// refre type
export type Referee = {
    name: string;
    id: string;
}

export type Character = {
    name: string;
    id: string;
    image: string;
    nen: string;
    hunterpedia: string | null;
    hueRotate: string;
}

export const fromCustomDateToISO = (date: CustomDate): string => {
    let transformedDate = date.split(' ');
    // map month to 2-digit number of month
    const monthMap = new Map([
        ['January', '01'],
        ['February', '02'],
        ['March', '03'],
        ['April', '04'],
        ['May', '05'],
        ['June', '06'],
        ['July', '07'],
        ['August', '08'],
        ['September', '09'],
        ['October', '10'],
        ['November', '11'],
        ['December', '12'],
    ]);

    transformedDate[2] = monthMap.get(transformedDate[2])!;

    // make sure that day is 2 digits
    if (transformedDate[1].length === 1) {
        transformedDate[1] = '0' + transformedDate[1];
    }

    let formattedDate = transformedDate[3] + '-' + transformedDate[2] + '-' + transformedDate[1];
    return formattedDate;

}

// format date to a string like 2021-01-01 and make sure that day is 2 digits
export const formatDate = (date: Date | undefined): string => {
    if (!date) return '';
    let formattedDate = date.getFullYear().toString();
    formattedDate += '-';
    formattedDate += date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    formattedDate += '-';
    formattedDate += date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return formattedDate;
}