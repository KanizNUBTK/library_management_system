import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Container,Alert} from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';
import useAuth from '../../../../hook/useAuth';
import Navbar from '../../../shared/Navbar/Navbar';
import Footer from '../../../shared/Footer/Footer';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const BookDisplay = () => {
    const{user}=useAuth();
    const [bookKey, setBookKey] = useState([]);
    const initialInfo = {customerName:user.displayName, email:user.email}
    const [bookingInfo, setBookingInfo] = useState(initialInfo); 
    const { bookId } = useParams();
    const[success, setSuccess]=useState(false);
    const [openbooking, setBookingOpen] = React.useState(false);
    const handleBookingOpen = () => {setBookingOpen(true);};
    const handleBookingClose = () => {setBookingOpen(false);};
    console.log(bookId);
    useEffect(() => {
        fetch('https://radiant-oasis-30989.herokuapp.com/addBookData')
          .then((res) => res.json())
          .then((data) => {
              console.log(data);
              setBookKey(data)});
      }, [bookId]);
    const exactData = bookKey.filter(pd=> pd._id == bookId);
    console.log(exactData);

    const handleOnBlur = e =>{
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = {...bookingInfo};
        newInfo[field]=value;
        console.log(newInfo);
        setBookingInfo(newInfo);
      }
  

    const handleBookSubmit=e=>{
        const orders ={
            ...bookingInfo,
            productName: exactData[0]?.bookName,
            productPrice: exactData[0]?.price,
          }
          //send server
          fetch('https://radiant-oasis-30989.herokuapp.com/cart', {
              method: 'POST',
              headers: {
                  'content-type': 'application/json'
              },
              body: JSON.stringify(orders)
          })
          .then(res => res.json())
          .then(data => {
              console.log(data);
            if(data.insertedId){
              setSuccess(true);
              handleBookingClose();
            }
          });
          e.preventDefault();
    }
    return (
        <div>
            <Navbar></Navbar>
            <Container>
                <Typography variant ="h4" sx={{fontWeight:'bold', color:'blue', m:5}}>Book...</Typography>
                <Box sx={{ flexGrow: 1 }}>
                    <div style={{display:'flex'}}>
                        <div>
                            <img style={{width:'500px', height:'400px'}} src={`data:image/png;base64,${exactData[0]?.bookImage}`} alt="pic" />
                        </div>
                        <div style={{paddingLeft:'30px',paddingTop:'20px'}}>
                            <Typography gutterBottom variant="h4" component="div" sx={{fontWeight:'bold'}}>
                                {exactData[0]?.bookName}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div">
                                Price: <span>$</span> {exactData[0]?.price}
                            </Typography>
                            <Typography variant="body1">
                                Author name: {exactData[0]?.authorName}
                            </Typography>
                            <Typography variant="body1">
                                Publisher name: {exactData[0]?.publisherName}
                            </Typography>
                            <Typography variant="body1">
                                Type: {exactData[0]?.bookType}
                            </Typography>
                            <Button sx={{mt:1}} onClick={handleBookingOpen} variant="contained">Add To Cart</Button> 
                        </div>
                    </div>
                </Box>
            </Container>
            <Container>
                <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openbooking}
                onClose={handleBookingClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
                >
                    <Fade in={openbooking}>
                        <Box sx={style}>
                            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                <form onSubmit={handleBookSubmit}>
                                    <TextField
                                        sx={{width: '90%', m: 1}}
                                        id="outlined-size-small"
                                        onBlur={handleOnBlur}
                                        value={exactData[0]?.bookName}
                                        size="small"
                                    />
                                    <TextField
                                        sx={{width: '90%', m: 1}}
                                        id="outlined-size-small"
                                        onBlur={handleOnBlur}
                                        value={exactData[0]?.price}
                                        size="small"
                                    />
                                    <TextField
                                        sx={{width: '90%', m: 1}}
                                        id="outlined-size-small"
                                        name="customerName"
                                        onBlur={handleOnBlur}
                                        defaultValue={user.displayName}
                                        size="small"
                                    />
                                    <TextField
                                        sx={{width: '90%', m: 1}}
                                        id="outlined-size-small"
                                        name="email"
                                        onBlur={handleOnBlur}
                                        defaultValue={user.email}
                                        size="small"
                                    />
                                    <TextField
                                        sx={{width: '90%', m: 1}}
                                        id="outlined-size-small"
                                        name="phone"
                                        onBlur={handleOnBlur}
                                        defaultValue="Your phone number"
                                        size="small"
                                    />
                                    <Button sx={{mt:2}} type ="submit" variant="contained">Submit cart</Button>
                                </form>
                            </Typography>
                        </Box>
                    </Fade>
                </Modal>
                {success && <Alert severity="success">Book order submited successfully!</Alert>}
            </Container> 
            <Footer></Footer>  
        </div>
    );
};

export default BookDisplay;