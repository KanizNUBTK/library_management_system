import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Alert} from '@mui/material';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const MakeAdmin = () => {
    const[email,setEmail]=useState('');
    const[displayAdmin,setDisplayAdmin]=useState([]);
    const [success, setSuccess] = useState(false);
   
    const handleMakeAdmin = e =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('email',email);
        fetch('https://radiant-oasis-30989.herokuapp.com/users/admin',{
            method:'PUT',
            body: formData
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.modifiedCount){
                console.log(data);
                setEmail('');
                setSuccess(true);
            }  
        })
    }
    useEffect(()=>{
        fetch('https://radiant-oasis-30989.herokuapp.com/users')
        .then(res=>res.json())
        .then(data=>{
            console.log('user data=',data[0].role);
            setDisplayAdmin(data);
        })
    },[])
    const exactAdmin=displayAdmin.filter(da=>da.role === 'admin');
    const handleDeleteUser = id =>{
        const proceed = window.confirm('Are sure you want to delete a Admin?');
        if(proceed){
         const url = `https://radiant-oasis-30989.herokuapp.com/users/${id}`;
         fetch(url,{
             method:'DELETE'
         })
         .then(res=>res.json())
         .then(data=>{
             if(data.deletedCount > 0){
                 alert('Delete successfully');
                 const remainingusers = displayAdmin.filter(order => order._id !== id);
                 setDisplayAdmin(remainingusers);
             }
         })
        }
     }
    return (
        <div>
            <Container>
                <Grid style={{marginTop:'10px'}} container spacing={{ xs: 12, md: 3 }} columns={{ xs: 12, sm: 8, md: 12 }}>
                    <Grid xs={12} md={6}>
                        <Box>
                            <Typography variant="h5" sx={{color:'blue', fontWeight:'bold'}} component="div">
                                Are You Want to Make Someone Admin???
                            </Typography>
                                <form onSubmit={handleMakeAdmin}>
                                    <TextField 
                                        sx={{width:"60%",mt:2}}
                                        label="Enter Email Address" 
                                        name="email"
                                        type="email"
                                        onChange={e=>setEmail(e.target.value)}
                                        variant="standard" />     
                                    <Button variant="contained" type="submit" sx={{width:"30%",mt:2}}>Make Admin</Button>
                                </form>
                                {success && <Alert severity="success">Admin added successfully!</Alert>}
                            </Box>
                    </Grid>
                    <Grid xs={12} md={6}>
                        <Box sx={{width:{xs:300,sm:400, md:'100%'}}}>
                            <Typography variant="h5" sx={{color:'blue', fontWeight:'bold'}} component="div">
                                All Admin...
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table sx={{width:{xs:100,sm:200, md:'100%'}}} aria-label="simple table">
                                    <TableHead>
                                        <TableRow sx={{width:{xs:50,sm:100}}}>
                                            <TableCell>Admin Name</TableCell>
                                            <TableCell>Admin Email</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody sx={{width:{xs:50,sm:100}}}>
                                        {exactAdmin.map((row) => (
                                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 },width:{xs:50,sm:100} }}>
                                                <TableCell component="th" scope="row">
                                                    {row.displayName}
                                                </TableCell>
                                                <TableCell>{row.email}</TableCell>
                                                <TableCell>
                                                    <Button variant="contained" onClick={()=>handleDeleteUser(row._id)}  sx={{ bgcolor:'red'}}>Delete</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Grid>
                </Grid>  
            </Container>
        </div>
    );
};

export default MakeAdmin;