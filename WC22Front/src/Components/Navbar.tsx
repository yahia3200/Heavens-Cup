import '../styles/Navbar.scss'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../contexts/userContext'
import { useNavigate } from 'react-router-dom'
import { apiBaseUrl } from '../config.json'
import { charsData } from '../Components/MatchPage/chars'


interface NavbarProps {

}

const Navbar: React.FunctionComponent<NavbarProps> = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSignOut = async () => {

        const response = await fetch(`${apiBaseUrl}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: user?.token })
        });

        if (response.status === 200) {
            localStorage.removeItem('user');
            setUser(null);
            navigate('/');
        }
        else {
            const data = await response.json();
            alert(data.error)
        }

    }


    return (
        <div className="navbar">
            <Link className="navbar__logo" to='/'>
                <img src="/src/assets/logo2.png" alt="" />
            </Link>

            <div className="navbar__rapper">
                <div className="navbar__teams-logos">

                    {

                        Array.from(charsData.keys()).map(char => {
                            return (
                                <a href={charsData.get(char)!.hunterpedia} key={char}>
                                    <img key={char} src={`/src/assets/Chars/${char}.png`} alt="" />
                                </a>
                            )
                        })
                    }
                </div>
            </div>

            <div className="navbar__main">
                <div className="navbar__main__links">
                    <Link to="/">Home</Link>
                    {user && <Link to="/profile">Profile</Link>}
                    <Link to="/fixtures">Fixtures</Link>
                    {!user && <Link to="/signin">Sign in</Link>}
                    {user && <button onClick={
                        () => {
                            handleSignOut()
                        }
                    }>Sign out</button>}
                </div>
            </div>
        </div>
    );
}

export default Navbar;