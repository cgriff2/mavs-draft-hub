import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './index.css'
import App from './App.jsx'


const theme = createTheme({
  palette: {
    primary: {
      main: '#00538C', // Mavs dark blue
    },
    secondary: {
      main: '#00538C', // Mavs light blue
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h6: {
      fontWeight: 600,
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
