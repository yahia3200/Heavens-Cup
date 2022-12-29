import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './contexts/userContext';
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import MatchPage from './pages/MatchPage';
import Fixtures from './pages/Fixtures';
import Profile from './pages/Profile';
import AdminPage from './pages/AdminPage';
interface ApplicationProps {

}

const Application: React.FunctionComponent<ApplicationProps> = () => {
  const { user } = useContext(UserContext);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {!user && <Route path="/signin" element={<SignIn />} />}
        <Route path="/match/:id" element={<MatchPage />} />
        <Route path="/fixtures" element={<Fixtures />} />
        <Route path="/admin" element={<AdminPage />} />
        {user && <Route path="/profile" element={<Profile />} />}
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>

  );
}

export default Application;