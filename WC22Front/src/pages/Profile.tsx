import PageHeader from '../Components/PageHeader'
import '../styles/Profile.scss'

interface ProfileProps {

}

const Profile: React.FunctionComponent<ProfileProps> = () => {
    return (
        <div className="profile">
            <PageHeader headerText='Your Profile' />
            <div className="profile__info">
                <div className="page-section">
                    <h2 className="page-section__header">Your Details</h2>
                </div>
            </div>
        </div>
    );
}

export default Profile;