import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Button,
  Divider
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import players from '../data/draftDataWrapper';
import ScoutRankingTable from './ScoutRankingTable';

const PlayerProfile = () => {
  const { id } = useParams();
  const player = players.find(p => String(p.playerId) === id);

  const [statsView, setStatsView] = useState('perGame');
  const [reports, setReports] = useState([]);
  const [newReport, setNewReport] = useState('');

  if (!player) return <Typography>No player found.</Typography>;

  const age = Math.floor((new Date() - new Date(player.birthDate)) / (365.25 * 24 * 60 * 60 * 1000));

  const totalGames = player.games?.length || 1;
  const summedStats = player.games?.reduce(
    (acc, g) => {
      for (const key of ['pts', 'ast', 'reb', 'stl', 'blk', 'tov']) {
        acc[key] = (acc[key] || 0) + (g[key] || 0);
      }
      return acc;
    },
    {}
  );

  const averages = Object.fromEntries(
    Object.entries(summedStats || {}).map(([key, value]) => [key, (value / totalGames).toFixed(1)])
  );

  const handleAddReport = () => {
    if (newReport.trim()) {
      setReports([...reports, newReport]);
      setNewReport('');
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1200px',
        px: 2,
        mx: 'auto',
        mt: 3
      }}
    >
      <Grid container spacing={3} justifyContent="center">
        {/* Bio Section */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" flexDirection="column" alignItems="center">
                <img
                  src={player.photoUrl || '/placeholder.png'}
                  alt={player.name}
                  style={{
                    width: '100%',
                    maxWidth: '300px',
                    height: 'auto',
                    borderRadius: '8px'
                  }}
                  onError={(e) => (e.target.src = '/placeholder.png')}
                />
                <Typography variant="h5" mt={2}>{player.name}</Typography>
                <Typography variant="body1">{player.currentTeam} ({player.league})</Typography>
                <Typography variant="body2">Age: {age}</Typography>
                <Typography variant="body2">
                  Height: {player.height}" • Weight: {player.weight} lbs
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Info Section */}
        <Grid item xs={12} md={8}>
          <ScoutRankingTable rankings={player.scoutRankings} />

          <Box mt={2}>
            <Typography variant="subtitle2">Measurements</Typography>
            <Typography variant="body2" component="ul" sx={{ pl: 2 }}>
              <li>Wingspan: {player.measurements?.wingspan}"</li>
              <li>Max Vert: {player.measurements?.maxVertical}"</li>
              <li>No-Step Vert: {player.measurements?.noStepVertical}"</li>
              <li>Agility: {player.measurements?.agility}s</li>
              <li>Sprint: {player.measurements?.sprint}s</li>
            </Typography>
          </Box>

          <Box mt={3}>
            <Typography variant="subtitle2">Game Stats</Typography>
            <ToggleButtonGroup
              value={statsView}
              exclusive
              onChange={(_, val) => val && setStatsView(val)}
              size="small"
              sx={{ mt: 1 }}
            >
              <ToggleButton value="perGame">Per Game</ToggleButton>
              <ToggleButton value="totals">Totals</ToggleButton>
            </ToggleButtonGroup>

            <Box mt={1}>
              {Object.entries(statsView === 'perGame' ? averages : summedStats).map(([key, val]) => (
                <Typography key={key} variant="body2">
                  {key.toUpperCase()}: {val}
                </Typography>
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Reports Section */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Box>
            <Typography variant="h6">Scouting Reports</Typography>
            {reports.map((report, i) => (
              <Card key={i} sx={{ my: 1 }}>
                <CardContent>
                  <Typography variant="body2">{report}</Typography>
                </CardContent>
              </Card>
            ))}
            <Box display="flex" gap={2} mt={2} flexDirection={{ xs: 'column', sm: 'row' }}>
              <TextField
                fullWidth
                label="Add Scouting Report"
                value={newReport}
                onChange={(e) => setNewReport(e.target.value)}
              />
              <Button variant="contained" onClick={handleAddReport}>
                Add
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlayerProfile;
