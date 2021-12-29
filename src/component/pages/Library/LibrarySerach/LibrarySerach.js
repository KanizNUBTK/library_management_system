import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import { Container} from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Navbar from '../../../shared/Navbar/Navbar';
import Footer from '../../../shared/Footer/Footer';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';

const LibrarySerach = () => {
    const[booksData, setBooksData]=useState([]);
    const[searchBooks, setSearchBooks]=useState([]);
    const[name, setName]=useState('');
    const[authorName, setAuthorName]=useState('');
    const[publisherName, setPublisherName]=useState('');
    
    useEffect(()=>{
        fetch('http://localhost:5000/addBookData')
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            setBooksData(data);
            setSearchBooks(data);
        })
    },[]);

     //search books
    const handleBookSearchByName = e =>{
        const searchText=e.target.value;
        const matchedbook = booksData?.filter(book=>book.bookName.toLowerCase().includes(searchText.toLowerCase()));
        // const matchedbook = booksData?.filter(book=>book.bookName.toLowerCase().includes(name.toLowerCase()))?.filter(author=>author.authorName.toLowerCase().includes(authorName.toLowerCase()))?.filter(publisher=>publisher.publisherName.toLowerCase().includes(publisherName.toLowerCase()));
        console.log(matchedbook.length);
        setSearchBooks(matchedbook);
        e.preventDefault();
    }
    const handleBookSearchByAuthorName = e =>{
        const authorName=e.target.value;
        const matchedbook = booksData?.filter(author=>author.authorName.toLowerCase().includes(authorName.toLowerCase()));
        console.log(matchedbook.length);
        setSearchBooks(matchedbook);
        e.preventDefault();
    }
    const handleBookSearchByPublisherName = e =>{
        const publisherName=e.target.value;
        const matchedbook = booksData?.filter(publisher=>publisher.publisherName.toLowerCase().includes(publisherName.toLowerCase()));
        console.log(matchedbook.length);
        setSearchBooks(matchedbook);
        e.preventDefault();
    }
    
    return (
        <div>   
            <Navbar></Navbar>
            <Container>
                <Typography variant ="h4" sx={{fontWeight:'bold', color:'blue', m:5}}>Find Books Here...</Typography>
                <Box sx={{width: '100%',my:3}}>
                    <div>
                        <TextField type="text" onChange={handleBookSearchByName} label="Please Enter Book Name" sx={{width:'32%'}} />
                        <TextField type="text" onChange={handleBookSearchByAuthorName} label="Please Enter Book Author Name" sx={{width:'32%',mx:2}} />
                        <TextField type="text" onChange={handleBookSearchByPublisherName} label="Please Enter Book Publisher Name" sx={{width:'32%'}} />
                        {/* <TextField type="text" onChange={e=>setName(e.target.value)} label="Please Enter Book Name" />
                        <TextField type="text" onChange={e=>setAuthorName(e.target.value)} label="Please Enter Book Author Name" />
                        <TextField type="text" onChange={e=>setPublisherName(e.target.value)} label="Please Enter Book Publisher Name" />
                        <Button variant="contained" onClick={()=>handleBookSearch()}>Search</Button> */}
                    </div>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
                        {searchBooks.map(bd=> 
                            <Grid item xs={12} sm={3} md={4}>
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardActionArea>
                                        <CardMedia
                                        component="img"
                                        height="250"
                                        weight="100%"
                                        image={`data:image/png;base64,${bd.bookImage}`}
                                        alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h6" component="div">
                                                {bd.bookName}
                                            </Typography>
                                            <Typography gutterBottom variant="body1" component="div">
                                                {bd.authorName}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {bd.publisherName}
                                            </Typography> 
                                            <Typography variant="body2" color="text.secondary">
                                                {bd.bookType}
                                            </Typography> 
                                            <Button><Link to={`https://drive.google.com/file/d/1gwOrZsU-mwIT1eKiQi6A8JztpHw1D2vD/view?usp=sharing`} target="_blank" download>Download</Link></Button>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            )
                        }
                    </Grid>
                </Box>
            </Container>
            <Footer></Footer>
        </div>
    );
};

export default LibrarySerach;