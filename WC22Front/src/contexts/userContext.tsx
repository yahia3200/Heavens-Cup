import React, { createContext, useState } from 'react';
import { User } from '../Types';

export type UserContextType = { user: User | null, setUser: (user: User | null) => void };
export const UserContext = createContext<UserContextType>({ user: null, setUser: () => { } });

type Props = { children: React.ReactNode }

export default function UserContextProvider(props: Props) {
    const userString = localStorage.getItem('user');
    const storedUser = userString ? JSON.parse(userString) : null;

    const [user, setUser] = useState<User | null>(storedUser);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {props.children}
        </UserContext.Provider>
    );
}
