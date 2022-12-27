import PageHeader from '../Components/PageHeader'
import FixturesTable from '../Components/Fixtures/FixturesTable'
import '../styles/Profile.scss'
import { User } from '../Types'

interface ProfileProps {
    user: User
}

const Profile: React.FunctionComponent<ProfileProps> = ({ user }) => {
    return (
        <div className="profile">
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
                                        <div className="profile__info__item__value">{user.username}</div>
                                    </div>
                                </div>
                                <div className="profile__info__row">
                                    <div className="profile__info__item">
                                        <div className="profile__info__item__label">Email: </div>
                                        <div className="profile__info__item__value">{user.email}</div>
                                    </div>
                                </div>
                                <div className="profile__info__row">
                                    <div className="profile__info__item">
                                        <div className="profile__info__item__label">First Name: </div>
                                        <div className="profile__info__item__value">{user.firstName}</div>
                                    </div>
                                    <div className="profile__info__item">
                                        <div className="profile__info__item__label">Last Name: </div>
                                        <div className="profile__info__item__value">{user.lastName}</div>
                                    </div>

                                </div>

                                <div className="profile__info__row">
                                    <div className="profile__info__item">
                                        <div className="profile__info__item__label">Age: </div>
                                        <div className="profile__info__item__value">{user.age}</div>
                                    </div>
                                </div>
                            </div>

                            <img src='/src/assets/Chars/Gon.png' />
                        </div>

                    </div>
                </div>

                <div className='page-section'>
                    <h2 className="page-section__header">My Matches</h2>
                    <FixturesTable matches={
                        [
                            {
                                date: 'Saturday 13 December 2012',
                                time: '14:30',
                                team1: "First Team",
                                team2: "Second Team",
                                referees: ["referee 1", "referee 2", "referee 3"],
                                stadium: "Stadium Name"
                            },
                            {
                                date: 'Saturday 12 December 2012',
                                time: '14:30',
                                team1: "First Team",
                                team2: "Second Team",
                                referees: ["referee 1", "referee 2", "referee 3"],
                                stadium: "Stadium Name"
                            },
                            {
                                date: 'Saturday 12 December 2012',
                                time: '14:30',
                                team1: "First Team",
                                team2: "Second Team",
                                referees: ["referee 1", "referee 2", "referee 3"],
                                stadium: "Stadium Name"
                            },
                        ]
                    } />
                </div>
            </div>
        </div>
    );
}

export default Profile;