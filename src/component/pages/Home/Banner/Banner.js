import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './Banner.css';


const Banner = () => {
    return (
        <div>
             <Box className="appointmentBg banner" sx={{ flexGrow: 1,boxShadow:3 }}>
                <Box container spacing={2} sx={{width:{xs:300,sm:400, md:'100%'}}}>
                    <Box item xs={12} md={8} sx={{ 
                        display: 'flex', 
                        justifyContent: 'flex-start',
                        alignItems: 'center', 
                        }}>
                        <Box >
                        <Typography variant="h3" sx={{color:'white', fontWeight:'bold'}} component="div">
                           WHO Library Management System
                        </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </div>
    );
};

export default Banner;