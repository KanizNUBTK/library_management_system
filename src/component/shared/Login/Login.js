import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { CircularProgress, Alert} from '@mui/material';
import useAuth from '../../../hook/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const [loginData, setLogindata] = useState({});
    const {user,authError,isLoading,loginUser} = useAuth();
    const locaction = useLocation();
    const navigate = useNavigate();

    const handleOnBlur = e =>{
        const field = e.target.name;
        const value = e.target.value;
        console.log(field,value);
        const newRegistrationData = {...loginData};
        newRegistrationData[field] = value;
        setLogindata(newRegistrationData);
    }
    const handleLoginSubmit = e =>{
        e.preventDefault();
        loginUser(loginData.email, loginData.password, locaction,navigate);
        console.log(loginData.email, loginData.password);
    }
    return (
        <div>
            <Container>
                <Box sx={{ flexGrow: 1, my: 5 ,mx:2 }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 8 }}>
                        <Grid xs={12} sm={12} md={4}>
                            <Box sx={{my: 10}}>
                                <Typography variant="h3" sx={{color:'blue', fontWeight:'bold'}} component="div">
                                    Please Login ...
                                </Typography>
                                <form onSubmit={handleLoginSubmit}>
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
                                    <Button variant="contained" type="submit" sx={{width:"100%",mt:2}}>login</Button>
                                </form>
                                {isLoading && <CircularProgress />}
                                {user?.email && <Alert severity="success">Login successfully!</Alert>}
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

export default Login;