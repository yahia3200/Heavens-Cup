import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './contexts/userContext';
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import MatchPage from './pages/MatchPage';
import Fixtures from './pages/Fixtures';
import Profile from './pages/Profile';
interface ApplicationProps {

}

const Application: React.FunctionComponent<ApplicationProps> = () => {
  const { user } = useContext(UserContext);
  console.log(user);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {!user && <Route path="/signin" element={<SignIn />} />}
        <Route path="/match/:id" element={<MatchPage />} />
        <Route path="/fixtures" element={<Fixtures />} />
        {user && <Route path="/profile" element={<Profile user={user} />} />}
      </Routes>
    </BrowserRouter>

  );
}

export default Application;