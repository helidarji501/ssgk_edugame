import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './shared/components/Navbar.jsx';
import HomePage from './pages/HomePage.jsx';
import GameHubPage from './pages/GameHubPage.jsx';
import TugOfWarGame from './features/tug-of-war/TugOfWarGame.jsx';
import MathZumaGame from './features/math-zuma/MathZumaGame.jsx';
import KnifeThrowerGame from './features/knife-thrower/KnifeThrowerGame.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen w-screen overflow-x-hidden flex flex-col">
        <Navbar />
        <div className="flex-1">

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/games" element={<GameHubPage />} />
            <Route path="/tug-of-war" element={<TugOfWarGame />} />
            <Route path="/math-zuma" element={<MathZumaGame />} />
            <Route path="/knife-thrower" element={<KnifeThrowerGame />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
