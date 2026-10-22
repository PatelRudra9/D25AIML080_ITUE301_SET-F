import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [attendee, setAttendee] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  function signIn(attendeeDetails, authToken, selectedRole) {
    setAttendee(attendeeDetails);
    setToken(authToken);
    setRole(selectedRole);
  }

  function signOut() {
    setAttendee(null);
    setToken(null);
    setRole(null);
  }

  const value = useMemo(() => ({ attendee, token, role, signIn, signOut }), [attendee, token, role]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
