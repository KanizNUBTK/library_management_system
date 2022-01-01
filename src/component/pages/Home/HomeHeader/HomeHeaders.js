import React from 'react';
import { Typography } from '@mui/material';

const HomeHeaders = () => {
    return (
        <div>
            <Typography variant="h3" sx={{color:'blue', fontWeight:'bold'}} component="div">
                Library Management System
            </Typography>
        </div>
    );
};

export default HomeHeaders;