import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import useAuth from '../../../../hook/useAuth';
import CsvFileDownload from '../../CsvFile/CsvFileDownload';

const DashboardHome = () => {
    const{user}=useAuth();
    const[books,setBooks]=useState([]);
    useEffect(()=>{
        fetch(`https://radiant-oasis-30989.herokuapp.com/cart`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            setBooks(data);
        })
    },[])
    console.log(user.email);
    const exactData = books.filter(book=>book.receiverEmail===user.email);
    console.log(exactData);
    const handleDeleteUser = id =>{
        const proceed = window.confirm('Are sure you want to delete the customer?');
        if(proceed){
         const url = `https://radiant-oasis-30989.herokuapp.com/cart/${id}`;
         fetch(url,{
             method:'DELETE'
         })
         .then(res=>res.json())
         .then(data=>{
             if(data.deletedCount > 0){
                 alert('Delete successfully');
                 const remainingusers = books.filter(order => order._id !== id);
                 setBooks(remainingusers);
             }
         })
        }
     }
   
    return (
        <div>
            <Box sx={{width:{xs:300,sm:400, md:'100%'}}}>
             <TableContainer component={Paper}>
                <Table sx={{width:{xs:100,sm:200, md:'100%'}}} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{width:{xs:50,sm:100}}}>
                            <TableCell>Student Name</TableCell>
                            <TableCell>Student Email</TableCell>
                            <TableCell>Book name</TableCell>
                            <TableCell>receive date</TableCell>
                            <TableCell>return date</TableCell>
                            <TableCell>Student Phone Number</TableCell>
                            {/* <TableCell>Book Publisher name</TableCell> */}
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{width:{xs:50,sm:100}}}>
                    {exactData.map((row) => (
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 },width:{xs:50,sm:100} }}>
                        <TableCell component="th" scope="row">
                            {row.receiverName}
                        </TableCell>
                        <TableCell>{row.receiverEmail}</TableCell>
                        <TableCell>{row.bookName}</TableCell>
                        <TableCell>{row.receiveDate}</TableCell>
                        <TableCell>{row.returnDate}</TableCell>
                        <TableCell>{row.receiverPhoneNumber}</TableCell>
                        {/* <Link to="/dashboard/payment" style={{textDecoration:'none'}}> */}
                        <TableCell>
                            <Button variant="contained" sx={{ bgcolor:'red'}}>Pending</Button>
                        </TableCell>
                        {/* </Link> */}
                        <TableCell>
                            <Button variant="contained" onClick={()=>handleDeleteUser(row._id)}  sx={{ bgcolor:'red'}}>Delete</Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Box>
            <div><CsvFileDownload></CsvFileDownload> </div>
        </div>
    );
};

export default DashboardHome;