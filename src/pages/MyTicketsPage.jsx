import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function MyTicketsPage() {
  const { token } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadTickets() {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/v1/tickets/my', {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error?.message || 'Unable to load your tickets.');
        setTickets(data.tickets);
      } catch (requestError) {
        if (requestError.name !== 'AbortError') setError(requestError.message || 'Unable to load your tickets.');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadTickets();
    return () => controller.abort();
  }, [token]);

  if (loading) return <p className="loading-state" role="status">Loading your tickets…</p>;
  if (error) return <p className="api-state api-error page-content" role="alert">Could not load tickets: {error}</p>;

  return (
    <section className="page-content">
      <div className="page-heading">
        <div>
          <span className="eyebrow">YOUR PLANS</span>
          <h1>My tickets</h1>
          <p>Your EventHub bookings, all in one place.</p>
        </div>
        <span className="event-count">{tickets.length} tickets</span>
      </div>

      {tickets.length === 0 ? (
        <div className="empty-state">
          <span className="ticket-icon" aria-hidden="true">✦</span>
          <h2>Your tickets will live here</h2>
          <p>Once you book an event, its details and status will appear here.</p>
        </div>
      ) : (
        <div className="ticket-list">
          {tickets.map((ticket) => (
            <article className="ticket-card" key={ticket._id}>
              <div>
                <span className="category-pill">{ticket.eventId?.category || 'Event'}</span>
                <h2>{ticket.eventId?.title || 'Event no longer available'}</h2>
                <p>{ticket.eventId?.venue || 'Venue unavailable'}</p>
                <p>{ticket.eventId?.date ? new Date(ticket.eventId.date).toLocaleDateString() : ''}</p>
              </div>
              <div className="ticket-meta">
                <strong>{ticket.quantity} {ticket.quantity === 1 ? 'ticket' : 'tickets'}</strong>
                <span className={`ticket-status status-${ticket.status}`}>{ticket.status}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
