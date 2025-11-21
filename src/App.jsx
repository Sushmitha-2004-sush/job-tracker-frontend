import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { CircularProgress, Box } from '@mui/material';

// Protected Route Component
function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return user ? children : <Navigate to="/login" />;
}

// Component to handle refresh detection
function RefreshHandler({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if this is a page refresh (not a navigation)
    const isPageRefresh = !window.history.state || window.history.state.idx === 0;
    
    // If it's a refresh and NOT already on landing page
    if (isPageRefresh && location.pathname !== '/') {
      // Store the intended page
      sessionStorage.setItem('intendedPage', location.pathname);
      // Redirect to landing page
      navigate('/', { replace: true });
    }
  }, []);

  return children;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Landing page - ALWAYS shows on refresh */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Login page */}
      <Route path="/login" element={<Login />} />
      
      {/* Register page */}
      <Route path="/register" element={<Register />} />
      
      {/* Dashboard - only accessible when logged in */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <RefreshHandler>
        <AppRoutes />
      </RefreshHandler>
    </Router>
  );
}

export default App;
