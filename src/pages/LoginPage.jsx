import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('attendee');

  function handleSubmit(event) {
    event.preventDefault();
    signIn(email, role);
    navigate('/events');
  }

  return (
    <section className="login-layout">
      <div className="login-intro">
        <span className="eyebrow">YOUR NEXT EXPERIENCE STARTS HERE</span>
        <h1>Good times are closer than you think.</h1>
        <p>Sign in to discover events and keep all your tickets in one place.</p>
      </div>
      <form className="login-card" onSubmit={handleSubmit}>
        <span className="eyebrow">WELCOME BACK</span>
        <h2>Sign in to EventHub</h2>
        <label htmlFor="email">Email address</label>
        <input id="email" name="email" type="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" placeholder="Enter your password" required />
        <label htmlFor="role">Demo role</label>
        <select id="role" name="role" value={role} onChange={(event) => setRole(event.target.value)}>
          <option value="attendee">Attendee</option>
          <option value="organizer">Organizer</option>
          <option value="admin">Admin</option>
        </select>
        <button className="book-button" type="submit">Continue</button>
        <p className="form-note">Demo sign-in sets local auth state for this routing exercise.</p>
      </form>
    </section>
  );
}
