import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import "../styles/Home.scss";
import PageHeader from "../Components/PageHeader";
import { Link } from "react-router-dom";
import Slide0 from "../assets/Chars/Slide0.png";
import Slide1 from "../assets/Chars/Slide1.png";

interface HomeProps { }

const Home: React.FunctionComponent<HomeProps> = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <PageHeader headerText="Heavens Cup" />
      {/* structure page as slides containing image on the side*/}
      <div className="wrapper">
        <div className="home">
          <div className="home__slide slide-1">
            <div className="home__slide__content">
              <h1>Manage Matches!</h1>
              <p>
                In Heaven's Cup, you can manage matches, stadiums, and more.
                Put Kakashi as a refree in the Marineford Stadium and
                see how Hisoka fights with Gonnnn!
                Create your own league and invite your fans to join!
              </p>
            </div>
            <div className="home__slide__image">
              <img src={Slide0} alt="slide 1" />
            </div>
          </div>
          <div className="home__slide slide-2">
            <div className="home__slide__image">
              <img src={Slide1} alt="slide 2" />
            </div>
            <div className="home__slide__content">
              <h1>Fans' League</h1>
              <p>
                View matches and stadiums from everywhere in this fantasy world!
                You can choose which match to watch and which stadium to visit!
                Reserve your seat for the next match and cheer for your favorite
                Character!
              </p>
            </div>
          </div>
          <div className="home__slide slide-3">
            <div className="home__slide__form">
              <p>
                Join the league and start managing matches and stadiums!
                Or just enjoy the fights between your favorite characters!
              </p>
              <div className="home__slide__form__buttons">
                {!user && <Link className="home__slide__form__buttons__login"
                  to="/signin">
                  Login
                </Link>}
                {!user && <Link className="home__slide__form__buttons__signup"
                  to="/signin">
                  Sign Up
                </Link>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
