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

const DashboardHome = () => {
    const[books,setBooks]=useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/cart')
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            setBooks(data);
        })
    },[])
    const handleDeleteUser = id =>{
        const proceed = window.confirm('Are sure you want to delete the customer?');
        if(proceed){
         const url = `http://localhost:5000/cart/${id}`;
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
                            <TableCell>Customer Name</TableCell>
                            <TableCell>Cusmoter Email</TableCell>
                            <TableCell>Book name</TableCell>
                            <TableCell>Book Price</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{width:{xs:50,sm:100}}}>
                    {books.map((row) => (
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 },width:{xs:50,sm:100} }}>
                        <TableCell component="th" scope="row">
                            {row.customerName}
                        </TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.productName}</TableCell>
                        <TableCell>{row.productPrice}</TableCell>
                        <Link to="/dashboard/payment" style={{textDecoration:'none'}}>
                        <TableCell>
                            <Button variant="contained" sx={{ bgcolor:'red'}}>Pay</Button>
                        </TableCell>
                        </Link>
                        <TableCell>
                            <Button variant="contained" onClick={()=>handleDeleteUser(row._id)}  sx={{ bgcolor:'red'}}>Delete</Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Box>
        </div>
    );
};

export default DashboardHome;