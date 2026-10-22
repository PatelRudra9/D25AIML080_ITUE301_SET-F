import { useState } from 'react';
import EventCard from '../components/EventCard.jsx';

const events = [
  { id: 1, title: 'Neon Nights: Live in Concert', category: 'Music', date: 'Nov 14, 2026', venue: 'Riverfront Arena', ticketsAvailable: 124 },
  { id: 2, title: 'The Makers Market', category: 'Community', date: 'Nov 21, 2026', venue: 'Old Mill Courtyard', ticketsAvailable: 38 },
  { id: 3, title: 'City Lights Film Festival', category: 'Film', date: 'Dec 02, 2026', venue: 'Grand Picture House', ticketsAvailable: 0 },
];

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState(String(events[0].id));
  const [quantity, setQuantity] = useState(1);
  const [bookingMessage, setBookingMessage] = useState('');

  function handleBooking(event) {
    event.preventDefault();
    const eventTitle = events.find((item) => String(item.id) === selectedEvent)?.title;
    setBookingMessage(`Your request for ${quantity} ticket(s) to ${eventTitle} is ready.`);
  }

  return (
    <section className="page-content">
      <div className="page-heading">
        <div>
          <span className="eyebrow">MAKE A PLAN</span>
          <h1>Events worth showing up for</h1>
          <p>Find your people, discover something new, and make a night of it.</p>
        </div>
        <span className="event-count">{events.length} upcoming events</span>
      </div>
      <div className="event-grid">
        {events.map((event) => (
          <EventCard
            key={event.id}
            {...event}
            onBook={() => {
              if (event.ticketsAvailable > 0) {
                setSelectedEvent(String(event.id));
                setBookingMessage('');
              }
            }}
          />
        ))}
      </div>
      <form className="booking-form" onSubmit={handleBooking}>
        <div>
          <span className="eyebrow">QUICK BOOKING</span>
          <h2>Reserve your tickets</h2>
        </div>
        <label htmlFor="selected-event">Selected event</label>
        <select id="selected-event" value={selectedEvent} onChange={(event) => setSelectedEvent(event.target.value)}>
          {events.map((event) => (
            <option key={event.id} value={event.id} disabled={event.ticketsAvailable === 0}>
              {event.title}{event.ticketsAvailable === 0 ? ' (Sold Out)' : ''}
            </option>
          ))}
        </select>
        <label htmlFor="quantity">Quantity</label>
        <input id="quantity" type="number" min="1" max="10" value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} required />
        <button className="book-button" type="submit">Continue booking</button>
        {bookingMessage && <p className="booking-message" role="status">{bookingMessage}</p>}
      </form>
    </section>
  );
}
