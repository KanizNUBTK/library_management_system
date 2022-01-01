import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

const HomeHeaders = () => {
    return (
        <div>
            <Box sx={{m:10,p:5, boxShadow:1}}>
                <Typography variant="h4" sx={{color:'blue', textAlign:'center',fontWeight:'bold'}} component="div">
                    Who we are
                </Typography>
                <Typography variant="Body2" sx={{color:'black',textAlign:'center'}} component="div">
                Founded in 1948, WHO is the United Nations agency that connects nations, partners and people to promote health, keep the world safe and serve the vulnerable – so everyone, everywhere can attain the highest level of health. 
                </Typography>
            </Box>
            
        </div>
    );
};

export default HomeHeaders;