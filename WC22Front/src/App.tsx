import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import MatchPage from './pages/MatchPage';
import Fixtures from './pages/Fixtures';
interface ApplicationProps {

}

const Application: React.FunctionComponent<ApplicationProps> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/match/:id" element={<MatchPage />} />
        <Route path="/fixtures" element={<Fixtures />} />
      </Routes>
    </BrowserRouter>

  );
}

export default Application;