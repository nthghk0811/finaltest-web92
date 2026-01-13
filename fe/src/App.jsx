import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

import Home from './pages/Home.jsx'
import PositionPage from './pages/PositionPage.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/positions" element={<PositionPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>

      <AppRoutes />

    </BrowserRouter>
  );
}