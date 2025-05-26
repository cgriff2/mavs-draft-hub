// JS Wrapper for draft data
import data from './intern_project_data.json';

function combinePlayerData() {
  const { bio, scoutRankings, measurements, game_logs } = data;

  return bio.map(player => {
    const playerId = player.playerId;

    const rankings = scoutRankings.find(r => r.playerId === playerId) || {};
    const measurement = measurements.find(m => m.playerId === playerId) || {};
    const games = game_logs.filter(g => g.playerId === playerId);

    // Calculate average scout rank
    const rankValues = Object.entries(rankings)
      .filter(([key]) => key !== 'playerId')
      .map(([, rank]) => rank);
    const averageRank =
      rankValues.length > 0
        ? rankValues.reduce((a, b) => a + b, 0) / rankValues.length
        : null;

    return {
      ...player,
      scoutRankings: {
        ...rankings,
        average: averageRank,
      },
      measurements: measurement,
      games: games,
    };
  });
}

const players = combinePlayerData();
export default players;