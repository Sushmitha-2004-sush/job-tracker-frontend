import { createTheme } from '@mui/material/styles';

// Professional color palette - Blue/Purple gradient theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',      // Professional blue
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#fff',
    },
    secondary: {
      main: '#9c27b0',      // Purple accent
      light: '#ba68c8',
      dark: '#7b1fa2',
      contrastText: '#fff',
    },
    success: {
      main: '#2e7d32',      // Green for offers
      light: '#4caf50',
      dark: '#1b5e20',
    },
    error: {
      main: '#d32f2f',      // Red for rejections
      light: '#ef5350',
      dark: '#c62828',
    },
    warning: {
      main: '#ed6c02',      // Orange for pending
      light: '#ff9800',
      dark: '#e65100',
    },
    info: {
      main: '#0288d1',      // Light blue
      light: '#03a9f4',
      dark: '#01579b',
    },
    background: {
      default: '#f5f7fa',   // Light gray background
      paper: '#ffffff',
    },
    text: {
      primary: '#2c3e50',
      secondary: '#546e7a',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    button: {
      textTransform: 'none',  // Disable uppercase buttons
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,  // Rounded corners
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

export default theme;
