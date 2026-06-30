import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { TicketProvider } from './context/TicketContext';
import RequireAdmin from './components/common/RequireAdmin';

import Dashboard from './pages/Dashboard';
import CreateTicket from './pages/CreateTicket';
import Tickets from './pages/Tickets';
import TicketDetails from './pages/TicketDetails';
import AdminDashboard from './pages/AdminDashboard';
import ManageTickets from './pages/ManageTickets';
import Analytics from './pages/Analytics';
import NotFound from './pages/NotFound';

/**
 * Root application component. Sets up global providers (theme, role,
 * ticket data) once at the top of the tree, then defines every route
 * the app supports. Admin routes are wrapped in <RequireAdmin> so they
 * always respect the active workspace.
 */
export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TicketProvider>
          <BrowserRouter>
            <Routes>
              {/* Employee routes */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/create-ticket" element={<CreateTicket />} />
              <Route path="/tickets" element={<Tickets />} />
              <Route path="/tickets/:id" element={<TicketDetails />} />

              {/* Admin routes */}
              <Route
                path="/admin"
                element={
                  <RequireAdmin>
                    <AdminDashboard />
                  </RequireAdmin>
                }
              />
              <Route
                path="/admin/tickets"
                element={
                  <RequireAdmin>
                    <ManageTickets />
                  </RequireAdmin>
                }
              />
              <Route
                path="/admin/analytics"
                element={
                  <RequireAdmin>
                    <Analytics />
                  </RequireAdmin>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>

          <Toaster
            position="top-right"
            richColors
            closeButton
            toastOptions={{
              className: 'font-sans',
            }}
          />
        </TicketProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
