import React from 'react'
import { User } from '../../Types'

export default function userRow(props: { user: User }) {
  return (
    <tr>
        <td>{props.user.firstName} {props.user.lastName}</td>
        <td>{props.user.username}</td>
        <td>{props.user.email}</td>
        <td>{props.user.type}</td>
        <td
            style={{
                color: props.user.approved ? 'green' : 'red',
                fontWeight: 'bold',
            }}
        >
            {props.user.approved ? 'Approved' : 'Not Approved'}
        </td>
        <td>
            <button
                className="btn btn-primary"
                style={{
                    backgroundColor: props.user.approved ? 'red' : 'green',
                    color: 'white',
                }}
            >
                {props.user.approved ? 'Disapprove' : 'Approve'}
            </button>
        </td>
    </tr>
  )
}
