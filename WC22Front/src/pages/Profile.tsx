import { useState, useContext, useRef } from 'react'
import { UserContext } from '../contexts/userContext'
import PageHeader from '../Components/PageHeader'
import FixturesTable from '../Components/Fixtures/FixturesTable'
import '../styles/Profile.scss'
import { User, Gender, formatDate } from '../Types'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CreateMatch from '../Components/CreateMatch'
import AddStadium from '../Components/AddStadium'
import { charsData } from '../Components/MatchPage/chars'
import { apiBaseUrl } from '../config.json'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    borderWidth: '10px 1px 1px',
    borderStyle: 'solid',
    borderBottomLeftRadius: '3px',
    borderBottomRightRadius: '3px',
    borderColor: '#e8e8e8',
    borderTopColor: '#e90052',
    boxShadow: 24,
    p: 4,
};

interface ProfileProps {
}

const Profile: React.FunctionComponent<ProfileProps> = () => {
    const { user, setUser } = useContext(UserContext);

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [createMatchOpen, setCreateMatchOpen] = useState(false);
    const [addStadiumOpen, setAddStadiumOpen] = useState(false);

    const [firstName, setFirstName] = useState(user?.firstName)
    const [lastName, setLastName] = useState(user?.lastName)
    const [birthDate, setBirthDate] = useState(formatDate(user?.birthDate))
    const [gender, setGender] = useState(user?.gender)


    // chose a random character for the characters data
    const charsNames = Array.from(charsData.keys());
    const randomChar = charsData.get(charsNames[Math.floor(Math.random() * charsNames.length)]);
    const randomCharRef = useRef(randomChar);

    const handleEdit = () => {
        const dob = new Date(birthDate);

        // calculate user age
        const age = new Date().getFullYear() - parseInt(birthDate.split('T')[0].split('-')[0]);

        const userData = {
            fname: firstName,
            lname: lastName,
            email: user?.email,
            gender: gender === 'male' ? 0 : 1,
            birthdate: dob.toISOString(),
            nationality: user?.nationality,
            username: user?.username,
        }

        fetch(`${apiBaseUrl}/edit_data`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user?.token}`
            },
            body: JSON.stringify({ user: userData })
        }).then(res => {
            if (res.status === 200) {
                setUser({
                    ...user,
                    firstName: firstName as string,
                    lastName: lastName as string,
                    birthDate: dob,
                    gender: gender!,
                    age: age
                } as User)
                handleClose();
            }
            else {
                alert('Something went wrong')
            }
        })

    }

    return (
        <div className="profile">
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h2 className="page-section__header">Edit Your Data</h2>
                    <div className="modal-container">
                        <div className="modal-col">
                            <label htmlFor='fname'>First name: </label>
                            <label htmlFor='lname'>Last name: </label>
                        </div>

                        <div className="modal-col">
                            <input name='fname' id='fname' type="text" value={firstName} onChange={
                                (e) => {
                                    setFirstName(e.target.value)
                                }
                            } />
                            <input name='lname' id='lname' type="text" value={lastName} onChange={
                                (e) => {
                                    setLastName(e.target.value)
                                }
                            } />
                        </div>

                        <div className="modal-col">
                            <label htmlFor='dob'>Date of birth: </label>
                            <label htmlFor='gender'>Gender: </label>
                        </div>
                        <div className="modal-col">
                            <input name='dob' id='dob' type="date" value={birthDate} onChange={
                                (e) => {
                                    setBirthDate(e.target.value)
                                }
                            } />
                            <select name="gender" id="gender" value={gender} onChange={
                                (e) => {
                                    setGender(e.target.value as ("male" | "female"))
                                }
                            }>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>


                    </div>
                    <div className='SignIn__form__button'>
                        <button
                            className='match-page__match__stadium__button-container__button'
                            type='submit' onClick={
                                (e) => {
                                    e.preventDefault()
                                    handleEdit()
                                }
                            }>Save Changes</button>
                    </div>

                </Box>
            </Modal>

            <PageHeader headerText='My Account' />
            <div className="profile__info">

                <div className="page-section">
                    <h2 className="page-section__header">Profile Details</h2>
                    <div className="page-section__content">

                        <div className='profile__info__wrapper'>
                            <div>
                                <div className="profile__info__row">
                                    <div className="profile__info__item">
                                        <div className="profile__info__item__label">Username: </div>
                                        <div className="profile__info__item__value">{user?.username}</div>
                                    </div>
                                </div>
                                <div className="profile__info__row">
                                    <div className="profile__info__item">
                                        <div className="profile__info__item__label">Email: </div>
                                        <div className="profile__info__item__value">{user?.email}</div>
                                    </div>
                                </div>
                                <div className="profile__info__row">
                                    <div className="profile__info__item fixed-width">
                                        <div className="profile__info__item__label">First Name: </div>
                                        <div className="profile__info__item__value">{user?.firstName}</div>
                                    </div>
                                    <div className="profile__info__item">
                                        <div className="profile__info__item__label">Last Name: </div>
                                        <div className="profile__info__item__value">{user?.lastName}</div>
                                    </div>

                                </div>

                                <div className="profile__info__row">
                                    <div className="profile__info__item">
                                        <div className="profile__info__item__label">Age: </div>
                                        <div className="profile__info__item__value">{user?.age}</div>
                                    </div>
                                </div>
                                <div className="profile__info__row">
                                    <div className="profile__info__item">
                                        <div className="profile__info__item__label">Role: </div>
                                        <div className="profile__info__item__value">{user?.type}</div>
                                    </div>
                                </div>
                                <div className="profile__info__row">
                                    <div className="profile__info__item fixed-width">
                                        <div className="profile__info__item__label">Gender: </div>
                                        <div className="profile__info__item__value">{user?.gender}</div>
                                    </div>
                                    <div className="profile__info__item">
                                        <div className="profile__info__item__label">Status: </div>
                                        <div className="profile__info__item__value">{user?.approved ? "Approved" : "Pending"}</div>
                                    </div>
                                </div>



                            </div>
                            {
                                // choose a random character
                                <img src={randomCharRef.current?.image} />
                            }

                        </div>
                        <div className="profile__info__row">
                            <div className="profile__info__item">
                                <button className='match-page__match__stadium__button-container__button'
                                    onClick={handleOpen}>Edit your information</button>
                            </div>
                        </div>

                    </div>
                </div>

                {user?.type === "fan" && <div className='page-section'>
                    <h2 className="page-section__header">My Matches</h2>
                    <FixturesTable matches={
                        [
                            {
                                date: 'Saturday 13 December 2012',
                                time: '14:30',
                                team1: "First Team",
                                team2: "Second Team",
                                referees: ["referee 1", "referee 2", "referee 3"],
                                stadium: "Stadium Name",
                                id: "1",
                            },
                            {
                                date: 'Saturday 12 December 2012',
                                time: '14:30',
                                team1: "First Team",
                                team2: "Second Team",
                                referees: ["referee 1", "referee 2", "referee 3"],
                                stadium: "Stadium Name",
                                id: "1",
                            },
                            {
                                date: 'Saturday 12 December 2012',
                                time: '14:30',
                                team1: "First Team",
                                team2: "Second Team",
                                referees: ["referee 1", "referee 2", "referee 3"],
                                stadium: "Stadium Name",
                                id: "1",
                            },
                        ]
                    } />
                </div>}

                {user?.type === "manager" && <div className='page-section'>
                    <h2 className="page-section__header">My Actions</h2>
                    <div className="profile__info__row manger-action">
                        <div className="profile__info__item">
                            <button className='match-page__match__stadium__button-container__button'
                                onClick={
                                    () => {
                                        setCreateMatchOpen(true)
                                    }
                                }>Create new match</button>
                            <CreateMatch open={createMatchOpen} setOpen={setCreateMatchOpen} />
                        </div>
                        <div className="profile__info__item">
                            <button className='match-page__match__stadium__button-container__button'
                                onClick={
                                    () => {
                                        setAddStadiumOpen(true)
                                    }
                                }>Add new stadium</button>
                            <AddStadium open={addStadiumOpen} setOpen={setAddStadiumOpen} />
                        </div>
                    </div>

                </div>
                }
            </div>
        </div>
    );
}

export default Profile;