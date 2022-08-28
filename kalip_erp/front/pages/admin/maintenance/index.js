import React from "react";
import { gql, useQuery } from "@apollo/client";
import LoadingComponent from "components/LoadingComponent";
import ErrorComponent from "components/ErrorComponent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Admin from "layouts/Admin.js";

export default function MaintenanceList() {
  const { data, loading, error } = useQuery(query, {});
  if (loading) return <LoadingComponent />;
  if (error)
    return <ErrorComponent message="There was an error loading data" />;
  console.log("data", data);
  const maintenaces = data.maintenances;

  return (
    <>
      <h1>Maintenance</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Machin</TableCell>
              <TableCell align="right">Mold</TableCell>
              <TableCell align="right">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {maintenaces.map((maintenace) => (
              <TableRow
                key={maintenace.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{maintenace.id}</TableCell>
                <TableCell align="right">{maintenace.machine.name}</TableCell>
                <TableCell align="right">{maintenace.mold.name}</TableCell>
                <TableCell align="right">{maintenace.desc}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

const query = gql`
  query maintenances {
    maintenances {
      id
      desc
      mold {
        name
      }
      machine {
        name
      }
    }
  }
`;
MaintenanceList.layout = Admin;
