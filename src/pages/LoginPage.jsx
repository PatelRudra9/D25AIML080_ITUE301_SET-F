import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('attendee');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || 'Unable to sign in.');
      signIn(data.attendee, data.token, role);
      navigate('/events');
    } catch (loginError) {
      setError(loginError.message || 'The API is unavailable. Start the backend and try again.');
    } finally {
      setLoading(false);
    }
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
        <button className="book-button" type="submit" disabled={loading}>{loading ? 'Signing in…' : 'Continue'}</button>
        {error && <p className="api-error" role="alert">{error}</p>}
        <p className="form-note">Use an attendee email registered in the EventHub database.</p>
      </form>
    </section>
  );
}
