import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MatchPage from './pages/MatchPage';
import './style.css';
interface ApplicationProps {

}

const Application: React.FunctionComponent<ApplicationProps> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/match/:id" element={<MatchPage />} />
      </Routes>
    </BrowserRouter>

  );
}

export default Application;