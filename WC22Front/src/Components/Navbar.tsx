import '../styles/Navbar.scss'

// react router
import { Link } from 'react-router-dom'

interface NavbarProps {

}

const Navbar: React.FunctionComponent<NavbarProps> = () => {
    const indexes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    return (
        <div className="navbar">
            <div className="navbar__rapper">
                <div className="navbar__teams-logos">

                    {
                        indexes.map((index) => {
                            return (
                                <img src="/src/assets/Chars/Gon.png" alt="" />
                            )
                        })
                    }
                </div>
            </div>

            <div className="navbar__main">
                <div className="navbar__main__logo">Logo</div>
                <div className="navbar__main__links">
                    <Link to="/">Home</Link>
                    <Link to="/signin">Sign in</Link>
                    <Link to="/profile">Profile</Link>
                    <Link to="/fixtures">Fixtures</Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;