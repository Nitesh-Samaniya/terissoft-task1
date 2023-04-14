import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import AddEntry from './AddEntry';
import axios from 'axios';
import { AiFillDelete } from 'react-icons/ai';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function Home() {
  const [empList, setEmpList] = React.useState([]);

  async function getData(){
    await axios.get("https://tericsoft-fake-backend.onrender.com/employee")
      .then((res)=>setEmpList(res.data))
      .catch((e)=>{
        console.log(e);
      })
  }

  const handleDelete = async(id)=>{
    await axios.delete(`https://tericsoft-fake-backend.onrender.com/employee/${id}`)
      .then((res)=>getData())
      .catch((e)=>console.log(e))
  }

  React.useEffect(()=>{
    getData()
  },[])

  return (
    <TableContainer component={Paper}>
      <AddEntry getData={getData}/>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Phone</StyledTableCell>
            <StyledTableCell>DOB</StyledTableCell>
            <StyledTableCell>Gender</StyledTableCell>
            <StyledTableCell>Hobbies</StyledTableCell>
            <StyledTableCell>Edit</StyledTableCell>
            <StyledTableCell>Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {empList.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell>{row.email}</StyledTableCell>
              <StyledTableCell>{row.phone}</StyledTableCell>
              <StyledTableCell>{row.dob}</StyledTableCell>
              <StyledTableCell>{row.gender}</StyledTableCell>
              <StyledTableCell>{row.hobbies.map((el)=><p>{el}</p>)}</StyledTableCell>
              <StyledTableCell>Edit</StyledTableCell>
              <StyledTableCell sx={{cursor:"pointer"}}>{<AiFillDelete onClick={()=>handleDelete(row.id)} size={25}/>}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}