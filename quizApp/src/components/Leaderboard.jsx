import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

export const Leaderboard = ({ refresh, submitted }) => {
  const [userStausScore, setUserStausScore] = React.useState([]);
  React.useEffect(() => {
    getLeaderboard();
  }, [refresh]);

  const getLeaderboard = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/users/getleaderboard"
      );
      setUserStausScore(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
            {userStausScore.map((score, indx) => (
              <TableRow key={indx}>
                <TableCell component="th" scope="row">
                  {score.name}
                </TableCell>
                <TableCell align="right">{score.email}</TableCell>
                <TableCell align="right">{score.correctAnswer}</TableCell>
                <TableCell align="right">{score.wrongAnswer}</TableCell>
                <TableCell align="right">{score.average}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
