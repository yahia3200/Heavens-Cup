import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
interface ApplicationProps {

}

const Application: React.FunctionComponent<ApplicationProps> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>

  );
}

export default Application;