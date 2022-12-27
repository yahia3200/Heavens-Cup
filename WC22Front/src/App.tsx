import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './Components/Navbar';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import MatchPage from './pages/MatchPage';
import Fixtures from './pages/Fixtures';
import Profile from './pages/Profile';
interface ApplicationProps {

}

const Application: React.FunctionComponent<ApplicationProps> = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/match/:id" element={<MatchPage />} />
        <Route path="/fixtures" element={<Fixtures />} />
        <Route path="/profile" element={<Profile user={
          {
            firstName: 'Gon',
            lastName: 'Freecss',
            username: 'gonfreecss',
            email: 'gon@gmail.com',
            age: 15,
            nationality: 'Japan',
            type: 'fan',
            birthDate: "Tuesday 1 January 2020",
            gender: 'male'
          }
        } />} />
      </Routes>
    </BrowserRouter>

  );
}

export default Application;