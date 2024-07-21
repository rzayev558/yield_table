import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { InterpolatedRow } from "../interfaces";

interface InterpolatedTableProps {
  data: InterpolatedRow[];
}

const InterpolatedTable: React.FC<InterpolatedTableProps> = ({ data }) => {
  const headers = Object.keys(data[0] || {});

  return (
    <TableContainer component={Paper} sx={{ width: "80%" }}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header}>{header.replace(/_/g, " ")}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {headers.map((header) => (
                <TableCell key={`${header}-${rowIndex}`}>
                  {row[header as keyof InterpolatedRow]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InterpolatedTable;
