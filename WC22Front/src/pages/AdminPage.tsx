import React from 'react'
import { User } from '../Types'
import UserList from '../Components/AdminPage/userList'
import PageHeader from '../Components/PageHeader'
/*
firstName: string;
lastName: string;
gender: 'male' | 'female';
email: Email;
username: string;
birthDate: CustomDate;
type: userType;
nationality: string | null;
age: number;
token: string;
*/
export default function AdminPage() {
  // list of users
  const users: User[] = [
    {
      firstName: 'John',
      lastName: 'Doe',
      gender: 'male',
      email: 'john.doe@x.d',
      username: 'johndoe',
      birthDate: 'Monday 1 January 2010',
      type: 'fan',
      nationality: 'American',
      age: 11,
      token: '1234567890',
      approved: true
    },
    {
      firstName: 'Jane',
      lastName: 'Doe',
      gender: 'female',
      email: 'jane.faf@x.f',
      username: 'fwfag',
      birthDate: 'Monday 4 February 2000',
      type: 'manager',
      nationality: 'American',
      age: 21,
      token: 'agwgagawcsz',
      approved: true
    },
    {
      firstName: 'Freddy',
      lastName: 'Mercury',
      gender: 'male',
      email: 'gwadac@fwafawf.fwaf',
      username: 'fwafawf',
      birthDate: 'Monday 1 February 1999',
      type: 'fan',
      nationality: 'English',
      age: 22,
      token: 'f1e2rqtqeg',
      approved: false
    },
    {
      // a user from egypt
      firstName: 'Mohamed',
      lastName: 'Salah',
      gender: 'male',
      email: 'sfwafgag@wfaa.waf',
      username: 'solwf',
      birthDate: 'Monday 1 February 1999',
      type: 'fan',
      nationality: 'Egyptian',
      age: 22,
      token: 'f1e2rqtqeg',
      approved: false
    },
    {
      // a user from japan
      firstName: 'Hiroshi',
      lastName: 'Yamaguchi',
      gender: 'male',
      email: 'dwaf@wafawf.waf',
      username: 'wafawf',
      birthDate: 'Monday 1 February 1997',
      type: 'fan',
      nationality: 'Japanese',
      age: 24,
      token: 'f1e2rqtqeg',
      approved: false
    },
  ];


  return (
    <div>
      <PageHeader headerText="Admin Page" />
      <UserList users={users.filter(user => user.approved)} />
      <UserList users={users.filter(user => !user.approved)} />
    </div>



  )
}
