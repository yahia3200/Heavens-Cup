import React from 'react'
import { User } from '../../Types'
import UserRow from './userRow'

export default function userList(props: { users: User[] }) {
    const { users } = props;
  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Type</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <UserRow user={user} key={index} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
