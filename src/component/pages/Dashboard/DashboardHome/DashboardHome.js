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
             <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Customer Name</TableCell>
                            <TableCell>Cusmoter Email</TableCell>
                            <TableCell>Book name</TableCell>
                            <TableCell>Book Price</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {books.map((row) => (
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                            {row.customerName}
                        </TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.productName}</TableCell>
                        <TableCell>{row.productPrice}</TableCell>
                        <TableCell>
                            <Button variant="contained">Pay</Button>
                        </TableCell>
                        <TableCell>
                            <Button variant="contained" onClick={()=>handleDeleteUser(row._id)}  sx={{ bgcolor:'red'}}>Delete</Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default DashboardHome;