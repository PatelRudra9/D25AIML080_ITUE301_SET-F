import { lazy, Suspense } from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import Navigation from './components/Navigation.jsx';
import LoginPage from './pages/LoginPage.jsx';
import EventsPage from './pages/EventsPage.jsx';
import MyTicketsPage from './pages/MyTicketsPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const OrganizerPanel = lazy(() => import('./pages/OrganizerPanel.jsx'));

export default function App() {
  return (
    <AuthProvider>
      <div className="app-shell">
        <header className="site-header">
          <Link className="brand" to="/" aria-label="EventHub home">
            <span className="brand-mark">E</span> EventHub
          </Link>
          <Navigation />
        </header>

        <main>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/events" element={<ProtectedRoute><EventsPage /></ProtectedRoute>} />
            <Route path="/my-tickets" element={<ProtectedRoute><MyTicketsPage /></ProtectedRoute>} />
            <Route
              path="/organizer"
              element={(
                <ProtectedRoute requiredRole="organizer">
                  <Suspense fallback={<p className="loading-state">Loading Organizer Panel…</p>}>
                    <OrganizerPanel />
                  </Suspense>
                </ProtectedRoute>
              )}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <footer>Find your next great experience.</footer>
      </div>
    </AuthProvider>
  );
}
