export default function EventCard({ title, category, date, venue, ticketsAvailable }) {
  const isSoldOut = ticketsAvailable === 0;

  return (
    <article className="event-card">
      <div className="event-card-top">
        <span className="category-pill">{category}</span>
        {isSoldOut && <span className="sold-out-badge">Sold Out</span>}
      </div>
      <h2>{title}</h2>
      <dl className="event-details">
        <div><dt>Date</dt><dd>{date}</dd></div>
        <div><dt>Venue</dt><dd>{venue}</dd></div>
        <div><dt>Tickets available</dt><dd>{ticketsAvailable}</dd></div>
      </dl>
      {isSoldOut
        ? <span className="unavailable-label">No tickets available</span>
        : <button className="book-button" type="button">Book</button>}
    </article>
  );
}
