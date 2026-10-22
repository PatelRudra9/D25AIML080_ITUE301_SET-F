import { Link, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import EventsPage from './pages/EventsPage.jsx';
import MyTicketsPage from './pages/MyTicketsPage.jsx';

export default function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/events" aria-label="EventHub home">
          <span className="brand-mark">E</span> EventHub
        </Link>
        <nav aria-label="Main navigation">
          <Link to="/events">Events</Link>
          <Link to="/my-tickets">My Tickets</Link>
          <Link className="nav-login" to="/login">Sign in</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/events" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/my-tickets" element={<MyTicketsPage />} />
          <Route path="*" element={<Navigate to="/events" replace />} />
        </Routes>
      </main>
      <footer>Find your next great experience.</footer>
    </div>
  );
}
