import '../styles/Navbar.scss'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../contexts/userContext'
import { useNavigate } from 'react-router-dom'


interface NavbarProps {

}

const Navbar: React.FunctionComponent<NavbarProps> = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const chars = ['Gon', 'Hisoka', 'Killua', 'Kurapika']

    const handleSignOut = async () => {

        const response = await fetch('https://7ae6-197-52-11-114.eu.ngrok.io/logout', {
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
            <div className="navbar__rapper">
                <div className="navbar__teams-logos">

                    {
                        chars.map((char) => {
                            return (
                                <img key={char} src={`/src/assets/Chars/${char}.png`} alt="" />
                            )
                        })
                    }
                    {
                        chars.map((char, index) => {
                            return (
                                <img key={index + 1} src={`/src/assets/Chars/${char}.png`} alt="" />
                            )
                        })
                    }
                    {
                        chars.map((char, index) => {
                            return (
                                <img key={index + 10} src={`/src/assets/Chars/${char}.png`} alt="" />
                            )
                        })
                    }
                </div>
            </div>

            <div className="navbar__main">
                <div className="navbar__main__logo">Logo</div>
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