# EventHub Ticket Booking System

Task 1 of the ITUE301 practical examination: a React frontend with Login, Events, and My Tickets pages plus a reusable event card.

## Frontend setup

1. Install Node.js (version 20 or later).
2. From the project folder, run `npm install`.
3. Run `npm run dev` and open the local URL shown by Vite.

## Task 1 implementation

- `src/pages/` contains `LoginPage`, `EventsPage`, and `MyTicketsPage`.
- `src/components/EventCard.jsx` receives `title`, `category`, `date`, `venue`, and `ticketsAvailable` as props.
- Events are passed from `EventsPage` to the reusable card. A card with zero tickets displays a Sold Out badge and no Book button.

Backend and MongoDB setup instructions will be added with their corresponding tasks.
