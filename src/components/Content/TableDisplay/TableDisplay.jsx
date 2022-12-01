import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import "./TableDisplay.css"


const TableDisplay = (props) => {
  // console.log(dataTable);
  const { totalPageAlarm, dataTable, setPageSelect } = props;

  return (
    <>
      <TableContainer component={Paper} className="table-container">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Created Time</TableCell>
              <TableCell align="right">Severity</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataTable?.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.originatorName}
                </TableCell>
                <TableCell align="right">
                  {moment(row.createdTime).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell align="right">{row.severity}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">{row.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={4} style={{marginLeft:'1000px'}} >
        <Pagination count={totalPageAlarm} color="primary" onChange={(e,page)=>(setPageSelect(page))}  />
      </Stack>
    </>
  );
  } 

export default TableDisplay;
