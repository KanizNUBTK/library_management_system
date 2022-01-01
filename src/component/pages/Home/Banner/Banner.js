import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import bg from '../../../../images/headerBanner.jpg';
import { Link } from 'react-router-dom';


const appointmentBg = {
    background: `url(${bg})`,
    backgroundColor: 'rgba(128, 128, 160, 0.11)',
    backgroundBlendMode: 'darken, luminosity',
    padding: 110,
}


const Banner = () => {
    return (
        <div>
             <Box style={appointmentBg} sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} sx={{width:{xs:300,sm:400, md:'100%'}}}>
                    <Grid item xs={12} md={8} sx={{ 
                        display: 'flex', 
                        justifyContent: 'flex-start',
                        alignItems: 'center', 
                        }}>
                        <Box >
                        <Typography variant="h3" sx={{color:'blue', fontWeight:'bold'}} component="div">
                            Library Management System
                        </Typography>
                            <Link to="/ourProduct" style={{textDecoration:'none'}}>
                            <Button  variant="contained" style={{padding:'5px 30px', fontSize:'20px', backgroundColor: 'rgb(129, 129, 236)'}}>explore</Button>
                            </Link>
                            
                        </Box>
                        <Grid item xs={12} md={4}>
                    </Grid>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default Banner;