import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { CircularProgress, Alert} from '@mui/material';
import useAuth from '../../../hook/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';

const Registration = () => {
    const [registarData, setRegistardata] = useState({});
    const {user,authError,isLoading,registerUser} = useAuth();
    const locaction = useLocation();
    const navigate = useNavigate();

    const handleOnBlur = e =>{
        const field = e.target.name;
        const value = e.target.value;
        console.log(field,value);
        const newRegistrationData = {...registarData};
        newRegistrationData[field] = value;
        setRegistardata(newRegistrationData);
    }
    const handleregistarSubmit = e =>{
        e.preventDefault();
        if( registarData.password !== registarData.password2){
            alert('Your password did not match');
            return
        }
        registerUser(registarData.email, registarData.password, registarData.name, locaction,navigate);
        console.log(registarData.email, registarData.password, registarData.name);
    }
    return (
        <div>
            <Container sx={{my:5}}>
                <Box sx={{ flexGrow: 1 , mx:2}}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 8 }}>
                        <Grid xs={12} sm={12} md={4}>
                            <Box sx={{ my:5}}>
                                <Typography variant="h3" sx={{color:'blue', fontWeight:'bold'}} component="div">
                                    Please Registration ...
                                </Typography>
                                <form onSubmit={handleregistarSubmit}>
                                    <TextField 
                                    sx={{width:"100%",mt:2}}
                                    label="Enter Your Name" 
                                    name="name"
                                    type="name"
                                    onBlur={handleOnBlur}
                                    variant="standard" />
                                    <TextField 
                                    sx={{width:"100%",mt:2}}
                                    label="Enter Your Email Address" 
                                    name="email"
                                    type="email"
                                    onBlur={handleOnBlur}
                                    variant="standard" />
                                    <TextField 
                                    sx={{width:"100%",mt:2}}
                                    label="Enter Password" 
                                    name="password"
                                    type="password"
                                    onBlur={handleOnBlur}
                                    variant="standard" />
                                    <TextField 
                                    sx={{width:"100%",mt:2}}
                                    label="ReType Password" 
                                    name="password2"
                                    type="password"
                                    onBlur={handleOnBlur}
                                    variant="standard" />
                                    <Button variant="contained" type="submit" sx={{width:"100%",mt:2}}>Register</Button>
                                </form>
                                {isLoading && <CircularProgress />}
                                {user?.email && <Alert severity="success">Register successfully!</Alert>}
                                {authError && <Alert severity="error">{authError}</Alert>}
                            </Box>
                        </Grid>
                        <Grid xs={12} sm={12} md={4}></Grid>
                    </Grid>
                </Box>
            </Container>
        </div>
    );
};

export default Registration;