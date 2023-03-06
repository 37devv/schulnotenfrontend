import * as React from 'react';
import { useEffect, useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';

export default function BasicTable() {

  const [tableData, setTableData] = useState([]);
  const [subject, setSubject] = useState();
  const [mark, setMark] = useState();

  //Load initial data to be displayed
    useEffect(() => {    
        fetch("https://localhost:7156/grades")
            .then((response) => response.json())
            .then((data) => console.log(data));

            fetch("https://localhost:7156/grades")
            .then((response) => response.json())
            .then((data) => setTableData(data));
    }, []);


  const handleMarkChange = event => {
        setMark(event.target.value);
    };

    const handleSubjectChange = event => {
        setSubject(event.target.value);
    };

  const addMark = async () => {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          { 
            subject: subject,
            mark: mark
          }
        )
    };
    await fetch('https://localhost:7156/grades/', requestOptions);

    window.location.reload(true);
  }

  const deleteMark = async (gradeId) => {
    
    await fetch("https://localhost:7156/grades/" + gradeId, {method: 'DELETE'});

    //Reload page to retrieve new data
    window.location.reload(true);
  }


  return (
    <React.Fragment>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Grade ID</TableCell>
            <TableCell align="right">Fach</TableCell>
            <TableCell align="right">Note</TableCell>
            <TableCell>Löschen</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {
          tableData.map((data) => (
            <TableRow
              key={data.gradeId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{data.gradeId}</TableCell>
              <TableCell align="right">{data.subject}</TableCell>
              <TableCell align="right">{data.mark}</TableCell>
              <TableCell>
                <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => deleteMark(data.gradeId)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <br/>
      <TextField id="standard-basic" label="Fach" variant="standard" onChange={handleSubjectChange}/>
      <TextField id="standard-basic" label="Note" variant="standard" onChange={handleMarkChange}/>
      <br/>
      <Button variant="contained" color="success" onClick={addMark} >Note hinzufügen</Button>
    </Box>

    </React.Fragment>
  );
}