import { useEffect, useState } from 'react';
import EventCard from '../components/EventCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const API_URL = 'http://localhost:5000/api/v1/events';

function formatEventDate(date) {
  const parsedDate = new Date(date);
  return Number.isNaN(parsedDate.getTime())
    ? date
    : parsedDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function EventsPage() {
  const { token } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [bookingMessage, setBookingMessage] = useState('');
  const [bookingError, setBookingError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadEvents() {
      try {
        setLoading(true);
        setError('');
        const response = await fetch(API_URL, { signal: controller.signal });
        if (!response.ok) throw new Error(`Events request failed (${response.status}).`);

        const data = await response.json();
        if (!Array.isArray(data.events)) throw new Error('The events API returned an invalid response.');
        setEvents(data.events);
        setSelectedEvent((current) => current || data.events.find((event) => event.ticketsAvailable > 0)?._id || '');
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Unable to load events. Please try again.');
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadEvents();
    return () => controller.abort();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.trim().toLowerCase()),
  );

  async function handleBooking(event) {
    event.preventDefault();
    setBookingMessage('');
    setBookingError(false);
    try {
      const response = await fetch('http://localhost:5000/api/v1/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ eventId: selectedEvent, quantity }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || 'Booking failed. Please try again.');

      const eventTitle = events.find((item) => item._id === selectedEvent)?.title;
      setEvents((currentEvents) => currentEvents.map((item) => (
        item._id === selectedEvent ? { ...item, ticketsAvailable: data.ticketsRemaining } : item
      )));
      setBookingMessage(`${quantity} ticket(s) booked for ${eventTitle}. Find them in My Tickets.`);
    } catch (requestError) {
      setBookingError(true);
      setBookingMessage(requestError.message || 'Booking failed. Please try again.');
    }
  }

  return (
    <section className="page-content">
      <div className="page-heading">
        <div>
          <span className="eyebrow">MAKE A PLAN</span>
          <h1>Events worth showing up for</h1>
          <p>Find your people, discover something new, and make a night of it.</p>
        </div>
        {!loading && !error && <span className="event-count">{filteredEvents.length} events</span>}
      </div>

      <label className="event-search-label" htmlFor="event-search">Search events by title</label>
      <input
        id="event-search"
        className="event-search"
        type="search"
        placeholder="Try “concert”"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      {loading && <p className="api-state" role="status">Loading events…</p>}
      {!loading && error && <p className="api-state api-error" role="alert">Could not load events: {error}</p>}
      {!loading && !error && filteredEvents.length === 0 && (
        <p className="api-state">{events.length ? 'No events match your search.' : 'No events are available right now.'}</p>
      )}
      {!loading && !error && filteredEvents.length > 0 && (
        <div className="event-grid">
          {filteredEvents.map((event) => (
            <EventCard
              key={event._id}
              title={event.title}
              category={event.category}
              date={formatEventDate(event.date)}
              venue={event.venue}
              ticketsAvailable={event.ticketsAvailable}
              onBook={() => {
                if (event.ticketsAvailable > 0) {
                  setSelectedEvent(event._id);
                  setBookingMessage('');
                }
              }}
            />
          ))}
        </div>
      )}

      {!loading && !error && events.some((event) => event.ticketsAvailable > 0) && (
        <form className="booking-form" onSubmit={handleBooking}>
          <div>
            <span className="eyebrow">QUICK BOOKING</span>
            <h2>Reserve your tickets</h2>
          </div>
          <label htmlFor="selected-event">Selected event</label>
          <select id="selected-event" value={selectedEvent} onChange={(event) => setSelectedEvent(event.target.value)} required>
            {events.filter((event) => event.ticketsAvailable > 0).map((event) => (
              <option key={event._id} value={event._id}>{event.title}</option>
            ))}
          </select>
          <label htmlFor="quantity">Quantity</label>
          <input id="quantity" type="number" min="1" max="10" value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} required />
          <button className="book-button" type="submit">Continue booking</button>
          {bookingMessage && <p className={bookingError ? 'booking-message api-error' : 'booking-message'} role={bookingError ? 'alert' : 'status'}>{bookingMessage}</p>}
        </form>
      )}
    </section>
  );
}
