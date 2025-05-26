import { Table, TableBody, TableCell, TableRow, TableHead, Typography, Tooltip } from '@mui/material';

const ScoutRankingTable = ({ rankings }) => {
  if (!rankings) return null;

  const average = rankings.average;

  const allRankings = Object.entries(rankings).filter(
    ([key]) =>
      key !== 'average' &&
      key !== 'playerId' &&
      rankings[key] !== null &&
      rankings[key] !== undefined
  );

  return (
    <>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Scout</TableCell>
            <TableCell align="right">Rank</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allRankings.map(([scout, rank]) => {
            const diff = rank - average;
            let color;
            if (diff <= -1) color = 'green';
            else if (diff >= 1) color = 'red';
            else color = 'inherit';

            const tooltip =
              diff <= -1
                ? 'High on this player'
                : diff >= 1
                ? 'Low on this player'
                : 'Near average';

            return (
              <Tooltip key={scout} title={tooltip}>
                <TableRow>
                  <TableCell>{scout}</TableCell>
                  <TableCell align="right" style={{ color }}>{rank}</TableCell>
                </TableRow>
              </Tooltip>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default ScoutRankingTable;
