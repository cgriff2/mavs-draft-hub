import { useNavigate } from 'react-router-dom';
import players from '../data/draftDataWrapper';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import ScoutRankingTable from './ScoutRankingTable';

const BigBoard = () => {
  const navigate = useNavigate();

  const sortedPlayers = [...players].sort((a, b) => a.scoutRankings.average - b.scoutRankings.average);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1200px',
        px: 2,
        mx: 'auto',
      }}
    >
      <Grid
        container
        spacing={3}
        justifyContent="center"
      >
        {sortedPlayers.map(player => (
          <Grid
            item
            key={player.playerId}
            xs={12}
            sm={6}
            md={4}
            display="flex"
            justifyContent="center"
          >
            <Card
              onClick={() => navigate(`/player/${player.playerId}`)}
              sx={{
                width: '100%',
                maxWidth: 330,
                cursor: 'pointer',
                boxShadow: 1,
                '&:hover': {
                  boxShadow: 3,
                  transform: 'translateY(-2px)',
                  transition: 'all 0.2s ease-in-out',
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight={600}>
                  {player.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {player.school || player.currentTeam}
                </Typography>
                <ScoutRankingTable rankings={player.scoutRankings} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BigBoard;
