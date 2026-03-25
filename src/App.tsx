import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import PlayerRoom from './pages/PlayerRoom';
import AdminDashboard from './pages/AdminDashboard';
import AdminCreateRoom from './pages/AdminCreateRoom';
import ThemeToggle from './components/ThemeToggle';

function App() {
  return (
    <>
      <Toaster position="top-right" toastOptions={{ style: { background: 'var(--panel-bg)', color: 'var(--text-primary)', border: '1px solid var(--panel-border)', backdropFilter: 'blur(10px)' } }} />
      <ThemeToggle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/professor" element={<AdminCreateRoom />} />
          <Route path="/player/:roomId/:playerId" element={<PlayerRoom />} />
          <Route path="/admin/:roomId" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
