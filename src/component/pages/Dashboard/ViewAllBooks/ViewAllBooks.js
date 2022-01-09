import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ViewAllBooks = () => {
    const[books,setBooks]=useState([]);
    useEffect(()=>{
        fetch('https://radiant-oasis-30989.herokuapp.com/addBookData')
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            setBooks(data);
        })
    },[])
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
                            <TableCell>Book Name</TableCell>
                            <TableCell>Author Name</TableCell>
                            <TableCell>Publisher Name</TableCell>
                            <TableCell>Book Type</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{width:{xs:50,sm:100}}}>
                    {books.map((row) => (
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 },width:{xs:50,sm:100} }}>
                        <TableCell component="th" scope="row">
                            {row.bookName}
                        </TableCell>
                        <TableCell>{row.authorName}</TableCell>
                        <TableCell>{row.publisherName}</TableCell>
                        <TableCell>{row.bookType}</TableCell>
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

export default ViewAllBooks;