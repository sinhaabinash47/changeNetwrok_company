import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export const Leaderboard = ({ score, percentageScore }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Correct Answer</TableCell>
            <TableCell align="right">Wrong Answer</TableCell>
            <TableCell align="right">Average</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
          >
            <TableCell component="th" scope="row">
                Abinash 
            </TableCell>
            <TableCell align="right">sinha@gmal.cm</TableCell>
            <TableCell align="right">{score}</TableCell>
            <TableCell align="right">2</TableCell>
            <TableCell align="right">{percentageScore}</TableCell>
          </TableRow>
          {/* ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
