import EventCard from '../components/EventCard.jsx';

const events = [
  { id: 1, title: 'Neon Nights: Live in Concert', category: 'Music', date: 'Nov 14, 2026', venue: 'Riverfront Arena', ticketsAvailable: 124 },
  { id: 2, title: 'The Makers Market', category: 'Community', date: 'Nov 21, 2026', venue: 'Old Mill Courtyard', ticketsAvailable: 38 },
  { id: 3, title: 'City Lights Film Festival', category: 'Film', date: 'Dec 02, 2026', venue: 'Grand Picture House', ticketsAvailable: 0 },
];

export default function EventsPage() {
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
        {events.map((event) => <EventCard key={event.id} {...event} />)}
      </div>
    </section>
  );
}
