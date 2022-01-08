import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import sideImg from '../../../../images/images11.jpg';
import { Divider } from '@mui/material';
import { Link } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height:'70%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


const FindBookModal = ({openbooking,handleBookingClose}) => {

    return (
        <div>
            <Modal
        open={openbooking}
        onClose={handleBookingClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid xs={12} sm={12} md={6} sx={{my:5}}>
                        <img width={'100%'} height={'100%'} src={sideImg} alt="" />
                    </Grid>
                    <Grid xs={12} sm={12} md={6} sx={{display:'flex',justifyContent:'center', alignItems:'center'}}>
                        <Box sx={{mx:6}}>
                        <Typography variant="h4" sx={{color:'black',fontWeight:'bold'}} component="div">
                            Read, Learn, Discover.
                        </Typography>
                        <Divider/>
                            <Link to="/serachByBookName" style={{textDecoration:'none'}}>
                            <Button variant="outlined" sx={{color:'black',my:2, fontSize:'20px', textTransform: 'capitalize' ,py:2,px:4}}>Search by book name</Button></Link>
                            <Link to="/serachByAuthorName" style={{textDecoration:'none'}}>
                            <Button variant="outlined" sx={{color:'black',mb:2,fontSize:'20px',textTransform: 'capitalize',py:2}}>Search by book author name</Button></Link>
                            <Link to="/serachByPublisherName" style={{textDecoration:'none'}}>
                            <Button variant="outlined" sx={{color:'black',fontSize:'20px',textTransform: 'capitalize',py:2}}>Search by book publisher name</Button></Link>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
      </Modal>
        </div>
    );
};

export default FindBookModal;