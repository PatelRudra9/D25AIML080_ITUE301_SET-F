import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navigation() {
  const { attendee, role, signOut } = useAuth();

  return (
    <nav aria-label="Main navigation">
      <Link to="/">Login</Link>
      <Link to="/events">Events</Link>
      <Link to="/my-tickets">My Tickets</Link>
      <Link to="/organizer">Organizer</Link>
      {attendee && <span className="nav-user">{attendee.name} · {role}</span>}
      {attendee && <button className="nav-login" type="button" onClick={signOut}>Sign out</button>}
    </nav>
  );
}
