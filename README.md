# EventHub Ticket Booking System

React frontend for the ITUE301 practical examination: Login, Events, My Tickets, and a role-protected Organizer Panel.

## Frontend setup

1. Install Node.js (version 20 or later).
2. From the project folder, run `npm install`.
3. Run `npm run dev` and open the local URL shown by Vite.

## Task 1 implementation

- `src/pages/` contains `LoginPage`, `EventsPage`, and `MyTicketsPage`.
- `src/components/EventCard.jsx` receives `title`, `category`, `date`, `venue`, and `ticketsAvailable` as props.
- Events are passed from `EventsPage` to the reusable card. A card with zero tickets displays a Sold Out badge and no Book button.
- React Router handles navigation. `AuthContext` stores the attendee, token, and role, while `ProtectedRoute` separates missing-token redirects from role-mismatch redirects.
- The Organizer Panel is lazy-loaded. The Events page uses state for the selected event and ticket quantity in its booking form.
- The sign-in page uses demo-only local auth state; replace this with the API response in a later task.

## Backend and MongoDB setup

1. Install MongoDB locally, or create a MongoDB Atlas database.
2. Copy `.env.example` to `.env`, then set `MONGODB_URI` and a private, random `JWT_SECRET`.
3. Run `npm run seed` once to add a demo attendee and event to the database.
4. Start the API with `npm start` (equivalent to `node backend/server.js`). It listens on port 5000 by default.
5. The REST API is mounted at `/api/v1`; event listing is public and ticket endpoints require `Authorization: Bearer <token>`.

The demo login email is `demo@eventhub.local`. `npm run seed` prints the sample event id for booking requests.

The `.env` file is ignored by Git; only `.env.example` should be committed.
