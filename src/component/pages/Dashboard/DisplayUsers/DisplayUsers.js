import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const DisplayUsers = () => {
    const[user,setUser]=useState([]);
    useEffect(()=>{
        fetch('https://radiant-oasis-30989.herokuapp.com/users')
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            setUser(data);
        })
    },[])
    const handleDeleteUser = id =>{
        const proceed = window.confirm('Are sure you want to delete a user?');
        if(proceed){
         const url = `https://radiant-oasis-30989.herokuapp.com/users/${id}`;
         fetch(url,{
             method:'DELETE'
         })
         .then(res=>res.json())
         .then(data=>{
             if(data.deletedCount > 0){
                 alert('Delete successfully');
                 const remainingusers = user.filter(order => order._id !== id);
                 setUser(remainingusers);
             }
         })
        }
     }
    return (
        <div>
            <Container>
            <Box sx={{width:{xs:300,sm:400, md:'100%'}}}>
                            <Typography variant="h5" sx={{color:'blue', fontWeight:'bold'}} component="div">
                                All Admin...
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table sx={{width:{xs:100,sm:200, md:'100%'}}} aria-label="simple table">
                                    <TableHead>
                                        <TableRow sx={{width:{xs:50,sm:100}}}>
                                            <TableCell>User Name</TableCell>
                                            <TableCell>User Email</TableCell>
                                            <TableCell>User Role</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody sx={{width:{xs:50,sm:100}}}>
                                        {user.map((row) => (
                                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 },width:{xs:50,sm:100} }}>
                                                <TableCell component="th" scope="row">
                                                    {row.displayName}
                                                </TableCell>
                                                <TableCell>{row.email}</TableCell>
                                                <TableCell>{row.role}</TableCell>
                                                <TableCell>
                                                    <Button variant="contained" onClick={()=>handleDeleteUser(row._id)}  sx={{ bgcolor:'red'}}>Delete</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
            </Container>
        </div>
    );
};

export default DisplayUsers;