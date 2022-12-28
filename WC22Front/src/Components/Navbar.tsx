import '../styles/Navbar.scss'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../contexts/userContext'

interface NavbarProps {

}

const Navbar: React.FunctionComponent<NavbarProps> = () => {
    const { user } = useContext(UserContext);
    const chars = ['Gon', 'Hisoka', 'Killua', 'Kurapika']
    return (
        <div className="navbar">
            <div className="navbar__rapper">
                <div className="navbar__teams-logos">

                    {
                        chars.map((char) => {
                            return (
                                <img src={`/src/assets/Chars/${char}.png`} alt="" />
                            )
                        })
                    }
                    {
                        chars.map((char) => {
                            return (
                                <img src={`/src/assets/Chars/${char}.png`} alt="" />
                            )
                        })
                    }
                    {
                        chars.map((char) => {
                            return (
                                <img src={`/src/assets/Chars/${char}.png`} alt="" />
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
                </div>
            </div>
        </div>
    );
}

export default Navbar;