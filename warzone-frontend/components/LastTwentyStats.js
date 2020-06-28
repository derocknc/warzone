import {
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  TableSortLabel
} from "@material-ui/core";
import { useEffect, useState, useRef } from 'react';
import "../styles/styles.scss"

export default function LastTwentyStats(props) {
  const { playerWeeklyData } = props;

  const getRounded = (number) => {
    return number.toFixed(2);
  };

  return (
    <div className="table-container">
      <Table>
        <TableHead >
          <TableCell>
            Name
          </TableCell>
          <TableCell>
            K
          </TableCell>
          <TableCell>
            D
          </TableCell>
          <TableCell>
            K/D
          </TableCell>
          <TableCell>
            K/G
          </TableCell>
          <TableCell>
            Gulag
          </TableCell>
        </TableHead>
        <TableBody>
          {playerWeeklyData && playerWeeklyData.map((player) => {
            return (
              <TableRow>
                <TableCell>
                  {player.playerName}
                </TableCell>
                <TableCell>
                  {player.summary.all.kills}
                </TableCell>
                <TableCell>
                  {player.summary.all.deaths}
                </TableCell>
                <TableCell>
                  {getRounded(player.summary.all.kdRatio)}
                </TableCell>
                <TableCell>
                  {player.summary.all.killsPerGame}
                </TableCell>
                <TableCell>
                  {getRounded(player.summary.all.gulagKills / player.summary.all.gulagDeaths)}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
