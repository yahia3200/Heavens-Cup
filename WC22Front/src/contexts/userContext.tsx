import React, { createContext, useState } from 'react';
import { User } from '../Types';

export type UserContextType = { user: User | null, setUser: (user: User | null) => void };
export const UserContext = createContext<UserContextType>({ user: null, setUser: () => { } });

type Props = { children: React.ReactNode }

export default function UserContextProvider(props: Props) {
    const userString = localStorage.getItem('user');
    const storedUser = userString ? JSON.parse(userString) : null;

    // create a fake user for testing
    const fakeUser = {
        firstName: 'Yahia',
        lastName: 'Zakaria',
        gender: 'male',
        email: 'yahiazakaria3200@gmail.com',
        username: 'yahia3200',
        birthDate: '1999-12-31',
        type: 'fan',
        nationality: 'Egyptian',
        age: '20',
        token: 'sss'
    }

    const [user, setUser] = useState<User | null>(storedUser);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {props.children}
        </UserContext.Provider>
    );
}
