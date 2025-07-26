// src/Theme.js
import { createTheme } from '@mui/material/styles';

// Define your custom color palette
// Using a sky-bluish primary, a soft pink/rose for secondary, and a muted red for error/accents.
const theme = createTheme({
  palette: {
    primary: {
      main: '#78b5e2', // A pleasant sky blue/aqua
      light: '#a9d0f0',
      dark: '#4a82af',
      contrastText: '#fff',
    },
    secondary: {
      main: '#e57373', // A soft, muted red/rose
      light: '#ffcdd2',
      dark: '#b04a4a',
      contrastText: '#fff',
    },
    error: {
      main: '#d32f2f', // Standard strong red for errors
    },
    background: {
      default: '#ffffff', // Clean white background
      paper: '#f5f5f5', // Slightly off-white for cards/modals
    },
    text: {
      primary: '#333333', // Dark grey for main text
      secondary: '#666666', // Lighter grey for secondary text
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Material UI default, or you can change
    h4: {
      fontWeight: 600,
      color: '#333333',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
  },
  // You can also define custom component styles here if needed globally
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Slightly rounded buttons
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12, // More rounded cards/dialogs
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)', // Subtle shadow for depth
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10, // Rounded text fields
          },
        },
      },
    },
  },
});

export default theme;
