import React, { useEffect, useState } from "react";
import { User } from "../Types";
import PageHeader from "../Components/PageHeader";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import "../styles/AdminPage.scss";
import { apiBaseUrl } from "../config.json";
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
  // const users: User[] = [
  //   {
  //     firstName: "John",
  //     lastName: "Doe",
  //     gender: "male",
  //     email: "john.doe@x.d",
  //     username: "johndoe",
  //     birthDate: "Monday 1 January 2010",
  //     type: "fan",
  //     nationality: "American",
  //     age: 11,
  //     token: "1234567890",
  //     approved: true,
  //   },
  //   {
  //     firstName: "Jane",
  //     lastName: "Doe",
  //     gender: "female",
  //     email: "jane.faf@x.f",
  //     username: "fwfag",
  //     birthDate: "Monday 4 February 2000",
  //     type: "manager",
  //     nationality: "American",
  //     age: 21,
  //     token: "agwgagawcsz",
  //     approved: true,
  //   },
  //   {
  //     firstName: "John",
  //     lastName: "Doe",
  //     gender: "male",
  //     email: "john.doe@x.d",
  //     username: "johndoe",
  //     birthDate: "Monday 1 January 2010",
  //     type: "fan",
  //     nationality: "American",
  //     age: 11,
  //     token: "1234567890",
  //     approved: true,
  //   },
  //   {
  //     firstName: "Jane",
  //     lastName: "Doe",
  //     gender: "female",
  //     email: "jane.faf@x.f",
  //     username: "fwfag",
  //     birthDate: "Monday 4 February 2000",
  //     type: "manager",
  //     nationality: "American",
  //     age: 21,
  //     token: "agwgagawcsz",
  //     approved: true,
  //   },
  //   {
  //     firstName: "John",
  //     lastName: "Doe",
  //     gender: "male",
  //     email: "john.doe@x.d",
  //     username: "johndoe",
  //     birthDate: "Monday 1 January 2010",
  //     type: "fan",
  //     nationality: "American",
  //     age: 11,
  //     token: "1234567890",
  //     approved: true,
  //   },
  //   {
  //     firstName: "Jane",
  //     lastName: "Doe",
  //     gender: "female",
  //     email: "jane.faf@x.f",
  //     username: "fwfag",
  //     birthDate: "Monday 4 February 2000",
  //     type: "manager",
  //     nationality: "American",
  //     age: 21,
  //     token: "agwgagawcsz",
  //     approved: true,
  //   },
  //   {
  //     firstName: "Freddy",
  //     lastName: "Mercury",
  //     gender: "male",
  //     email: "gwadac@fwafawf.fwaf",
  //     username: "fwafawf",
  //     birthDate: "Monday 1 February 1999",
  //     type: "fan",
  //     nationality: "English",
  //     age: 22,
  //     token: "f1e2rqtqeg",
  //     approved: false,
  //   },
  //   {
  //     // a user from egypt
  //     firstName: "Mohamed",
  //     lastName: "Salah",
  //     gender: "male",
  //     email: "sfwafgag@wfaa.waf",
  //     username: "solwf",
  //     birthDate: "Monday 1 February 1999",
  //     type: "fan",
  //     nationality: "Egyptian",
  //     age: 22,
  //     token: "f1e2rqtqeg",
  //     approved: false,
  //   },
  //   {
  //     // a user from japan
  //     firstName: "Hiroshi",
  //     lastName: "Yamaguchi",
  //     gender: "male",
  //     email: "dwaf@wafawf.waf",
  //     username: "wafawf",
  //     birthDate: "Monday 1 February 1997",
  //     type: "fan",
  //     nationality: "Japanese",
  //     age: 24,
  //     token: "f1e2rqtqeg",
  //     approved: false,
  //   },
  // ];

  const [users, setUsers] = useState([]);

  useEffect(() => {
      fetch(`${apiBaseUrl}/get_all_users`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      }).then(res => res.json())
          .then(data => {
              console.log(data);

              // const returnedUsers: User[] = data.users.map((match: any) => {
              //     const date = new Date(match.start_time);

              //     // get hour and minutes from date in form of 14:30
              //     const time = date.toLocaleTimeString('en-us', { hour: '2-digit', minute: '2-digit' });

              //     // transform date to a string like Tuesday 1 January 2020
              //     const dateStr = `${date.toLocaleString('en-us', { weekday: 'long' })} ${date.getDate()} ${date.toLocaleString('en-us', { month: 'long' })} ${date.getFullYear()}`;
              //     return {
              //         date: dateStr,
              //         time: time,
              //         team1: match.team1_name,
              //         team2: match.team2_name,
              //         referees: [],
              //         stadium: match.stad_name,
              //         id: match.id,
              //     }
              // }
              // );

              // const matchesObj = matches.reduce((acc: any, match: Match) => {
              //     if (acc[match.date]) {
              //         acc[match.date].push(match);
              //     } else {
              //         acc[match.date] = [match];
              //     }
              //     return acc;
              // }, {});
              // setMatches(matchesObj);

          }
          );

  }, []);

  // Memoize users to avoid re-rendering
  const memoizedApprovedUsers = React.useMemo(
    () =>
      users
        .filter((user) => user.approved === true && user.type !== "admin"),
    [users]
  );

  const memoizedUnapprovedUsers = React.useMemo(
    () =>
      users
        .filter((user) => user.approved === false && user.type !== "admin"),
    [users]
  );

  return (
    <div>
      <PageHeader headerText="Admin Page" />
      <div className="wrapper">
        <div className="admin-page">
          <div className="admin-page__approved-users">
            <h1>Approved Users</h1>
            <div
              className="admin-page__approved-users__container"
              style={{
                height:
                  Math.min(
                    memoizedApprovedUsers.length,
                    5
                  ) *
                    52 +
                  56 * 2,
              }}
            >
              <DataGrid
                className="admin-page__approved-users__container__data-grid"
                rows={memoizedApprovedUsers.map((user, index) => ({ ...user, id: index }))}
                columns={[
                  {
                    field: "firstName",
                    headerName: "First name",
                    flex: 1,
                    minWidth: 100,
                  },
                  {
                    field: "lastName",
                    headerName: "Last name",
                    flex: 1,
                    minWidth: 100,
                  },
                  {
                    field: "gender",
                    headerName: "Gender",
                    flex: 0.5,
                    minWidth: 50,
                  },
                  {
                    field: "email",
                    headerName: "Email",
                    flex: 1.5,
                    minWidth: 150,
                  },
                  {
                    field: "username",
                    headerName: "Username",
                    flex: 1,
                    minWidth: 100,
                  },
                  {
                    field: "nationality",
                    headerName: "Nationality",
                    flex: 1,
                    minWidth: 100,
                  },
                  { field: "age", headerName: "Age", flex: 0.5, minWidth: 50 },
                  {
                    field: "type",
                    headerName: "Type",
                    flex: 0.5,
                    minWidth: 50,
                  },
                  // add a column for the delete user button
                  {
                    field: "delete",
                    headerName: "Delete",
                    flex: 0.5,
                    minWidth: 50,
                    renderCell: (params: GridValueGetterParams) => (
                      <button
                        className="admin-page__approved-users__container__data-grid__delete-button"
                        onClick={() => {
                          // delete the user
                          console.log("delete user" + params.row.id);
                        }}
                      >
                        &#10005;
                      </button>
                    ),
                    disableClickEventBubbling: true,
                  },
                ]}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
              />
            </div>
          </div>
          <div className="admin-page__pending-users">
            <h1>Pending Users</h1>
            <div
              className="admin-page__pending-users__container"
              style={{
                height:
                  Math.min(
                    memoizedUnapprovedUsers.length,
                    5
                  ) *
                    52 +
                  56 * 2,
              }}
            >
              <DataGrid
                className="admin-page__pending-users__container__data-grid"
                rows={memoizedUnapprovedUsers.map((user, index) => ({ ...user, id: index }))}
                columns={[
                  {
                    field: "firstName",
                    headerName: "First name",
                    flex: 1,
                    minWidth: 100,
                  },
                  {
                    field: "lastName",
                    headerName: "Last name",
                    flex: 1,
                    minWidth: 100,
                  },
                  {
                    field: "gender",
                    headerName: "Gender",
                    flex: 0.5,
                    minWidth: 50,
                  },
                  {
                    field: "email",
                    headerName: "Email",
                    flex: 1.5,
                    minWidth: 150,
                  },
                  {
                    field: "username",
                    headerName: "Username",
                    flex: 1,
                    minWidth: 100,
                  },
                  {
                    field: "nationality",
                    headerName: "Nationality",
                    flex: 1,
                    minWidth: 100,
                  },
                  { field: "age", headerName: "Age", flex: 0.5, minWidth: 50 },
                  {
                    field: "type",
                    headerName: "Type",
                    flex: 0.5,
                    minWidth: 50,
                  },
                  // add an actions column for the approve and reject buttons for each user
                  {
                    field: "actions",
                    headerName: "Actions",
                    flex: 0.5,
                    minWidth: 50,
                    renderCell: (params: GridValueGetterParams) => (
                      <div className="admin-page__pending-users__container__data-grid__actions">
                        <button
                          className="admin-page__pending-users__container__data-grid__actions__approve-button"
                          onClick={() => {
                            // approve the user
                            console.log("approve user" + params.row.id);
                          }}
                        >
                          &#10003;
                        </button>
                        <button
                          className="admin-page__pending-users__container__data-grid__actions__reject-button"
                          onClick={() => {
                            // reject the user
                            console.log("reject user" + params.row.id);
                          }}
                        >
                          &#10005;
                        </button>
                      </div>
                    ),
                    disableClickEventBubbling: true,
                  },
                ]}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
