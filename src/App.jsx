import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CssBaseline, Container, AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import BigBoard from './components/BigBoard';
import PlayerProfile from './components/PlayerProfile';

function Navbar() {
  return (
    <AppBar
      position="sticky"
      color="primary"
      sx={{
        backgroundColor: '#00538C',
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
        px: 2,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Mavericks Draft Hub
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/" sx={{ fontWeight: 500 }}>
            Big Board
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function App() {
  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <Box sx={{ 
        justifyContent: 'center'
      }}>
        <Container maxWidth="100%">
          <Box py={4}>
            <Routes>
              <Route path="/" element={<BigBoard />} />
              <Route path="/player/:id" element={<PlayerProfile />} />
              <Route path="*" element={<Typography variant="h6">Page not found</Typography>} />
            </Routes>
          </Box>
        </Container>
      </Box>
    </Router>
  );
}

export default App;