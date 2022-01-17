import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Container,Alert} from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import useAuth from '../../../../hook/useAuth';
import Navbar from '../../../shared/Navbar/Navbar';
import Footer from '../../../shared/Footer/Footer';
import Grid from '@mui/material/Grid';
import './BookDisplay.css';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';


const BookDisplay = () => {
    const{user}=useAuth();
    const { bookId } = useParams();
    const [displayBook, setDisplayBooks] = useState([]);
    useEffect(()=>{
        fetch('https://radiant-oasis-30989.herokuapp.com/addBookData')
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            setDisplayBooks(data);
        })
    },[bookId])
    console.log(displayBook);
    const exactData = displayBook.filter(pd=> pd._id == bookId);
    const filterBook = exactData[0]?.bookName;
    console.log( user.displayName,user.email,filterBook);

    const[receiverName,setReceiverName] = useState(user.displayName)
    const[receiverEmail,setReceiverEmail] = useState(user.email);
    const[receiverPhoneNumber,setReceiverPhoneNumber] = useState('');
    const[receiveDate,setReceiverDate] = useState(new Date().toDateString());
    const[returnDate,setReturnDate] = useState(new Date().toDateString());
    const[success, setSuccess]=useState(false);
    const[nameBook,setNameBook] = useState(exactData);

    const handleBookSubmit=e=>{
          e.preventDefault();
        const formData = new FormData();
        formData.append('receiverName',receiverName);
        formData.append('receiverEmail',receiverEmail);
        formData.append('receiverPhoneNumber',receiverPhoneNumber);
        formData.append('receiveDate',receiveDate);
        formData.append('returnDate',returnDate);
        formData.append('bookName',exactData[0].bookName);
        
          //send server
          fetch('https://radiant-oasis-30989.herokuapp.com/cart', {
             method: 'POST',
            body: formData
        })
          .then(res => res.json())
          .then(data => {
              console.log(data);
            if(data.insertedId){
              setSuccess(true);
            }
          });
          e.preventDefault();
    }
    return (
        <div style={{backgroundColor:'rgba(153, 118, 5, 0.3)', paddingBottom:'60px'}}>
        <Navbar></Navbar>
        <div className='bg-openbook-image'>
            <Container sx={{m:10}}>
             {exactData[0]?.bookName}
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={12} sm={12} md={6}> 
                            <Box sx={{md:{pl:'30px',pt:'20px'}}}>
                                <img style={{width:'150px', height:'150px'}} src={`data:image/png;base64,${exactData[0]?.bookImage}`} alt="pic" />
                                    <Typography gutterBottom variant="h4" component="div" sx={{fontWeight:'bold'}}>
                                        {exactData[0]?.bookName}
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
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <Box sx={{mx:'5'}}>
                                <form onSubmit={handleBookSubmit}>
                                    <TextField
                                        sx={{width: '90%', m: 1}}
                                        id="outlined-size-small"
                                        name="bookName"
                                        onChange = {e => setNameBook(e.target.value)}
                                        value={exactData[0]?.bookName}
                                        size="small"
                                    />
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label="Receive date"
                                            value={receiveDate}
                                            name="receiveDate"
                                            onChange = {newDate => setReceiverDate(newDate)}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label="Return Date"
                                            value={returnDate}
                                            name="checkOutTime"
                                            onChange={newDate => setReturnDate(newDate)}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                    <TextField
                                        sx={{width: '90%', m: 1}}
                                        id="outlined-size-small"
                                        name="receiverName"
                                        onChange={e => setReceiverName(e.target.value)}
                                        value={user.displayName}
                                        size="small"
                                    />
                                    <TextField
                                        sx={{width: '90%', m: 1}}
                                        id="outlined-size-small"
                                        name="receiverEmail"
                                        onChange={e => setReceiverEmail(e.target.value)}
                                        value={user.email}
                                        size="small"
                                    />
                                    <TextField
                                        sx={{width: '90%', m: 1}}
                                        id="outlined-size-small"
                                        name="receiverPhoneNumber"
                                        onChange={e => setReceiverPhoneNumber(e.target.value)}
                                        label="Your phone number"
                                        size="small"
                                    />
                                    <Button sx={{mt:2}} type ="submit" variant="contained">Booking</Button>
                                </form>
                                {success && <Alert severity="success">Booking request submited successfully!</Alert>}
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>  
        </div>
        <Footer></Footer>
        </div>
    );
};

export default BookDisplay;