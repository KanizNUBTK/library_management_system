import { Typography,Box,Container,Divider } from '@mui/material';
import React from 'react';
import Footer from '../../../shared/Footer/Footer';
import Navbar from '../../../shared/Navbar/Navbar';
import FindBookModal from '../FindBookModal/FindBookModal';
import './Home.css';
const Home = () => {
    const [openbooking, setBookingOpen] = React.useState(false);
    const handleBookingOpen = () => {setBookingOpen(true);};
    const handleBookingClose = () => {setBookingOpen(false);};
    return (
        <>
        <div className="header-banner">
            <Navbar></Navbar>
            <Divider style={{backgroundColor:'white'}} variant="middle"/>
            <Box sx={{mx:{md:20}, my:{md:20}}} className='body-box'>
                <Container>
                    <Typography variant="h6" sx={{color:'white',textAlign:'center',fontWeight:'semibold'}} component="div">
                        Keys to the past… Gateway to the future...
                    </Typography>
                    <Typography variant="h4" sx={{color:'white',textAlign:'center',fontWeight:'bold'}} component="div">
                        Books can be dangerous, the best ones should be labeled, “This could change your life.”
                    </Typography>
                    <div  style={{display:'flex', justifyContent:'center',marginTop:'15px'}} >
                        <button onClick={handleBookingOpen} className="btn-design">Find Books</button>
                    </div>
                </Container>
                <FindBookModal
                openbooking={openbooking}
                handleBookingClose={handleBookingClose}>
                </FindBookModal>
            </Box>
            <Divider style={{backgroundColor:'white', height:'2px'}} variant="middle"/>
            <Footer></Footer>
        </div>
        </>
    );
};

export default Home;