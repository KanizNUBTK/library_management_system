import { Button, Card, CardActionArea, CardContent, CardMedia, Container, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Footer from '../../../shared/Footer/Footer';
import Navbar from '../../../shared/Navbar/Navbar';
import { Link } from 'react-router-dom';
import './AuthorName.css';

const AuthorName = () => {
    const[booksData, setBooksData]=useState([]);
    const[searchBooks, setSearchBooks]=useState([]);
    
    useEffect(()=>{
        fetch('https://radiant-oasis-30989.herokuapp.com/addBookData')
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            setBooksData(data);
            setSearchBooks(data);
        })
    },[]);

     //search books by author name
    const handleBookSearchByAuthorName = e =>{
        const authorName=e.target.value;
        const matchedbook = booksData?.filter(author=>author.authorName.toLowerCase().includes(authorName.toLowerCase()));
        console.log(matchedbook.length);
        setSearchBooks(matchedbook);
        e.preventDefault();
    }
    return (
        <div>
            <div className='bg-image'>
            <Navbar></Navbar>
            <Container>
                <div className='book-box'>
                    <Box sx={{display:'flex',justifyContent:'center'}}>
                        <div>
                            <TextField type="text" onChange={handleBookSearchByAuthorName} label="Search Books by Author Name" sx={{width:'600px',backgroundColor:'whitesmoke',borderRadius:'10px',my:3}} />
                        </div>
                    </Box>
                    <Box sx={{ flexGrow: 1}}>
                        <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
                            {searchBooks.map(bd=> 
                                <Grid item xs={12} sm={3} md={3}>
                                    <Card sx={{ maxWidth: 345 ,backgroundColor:'whitesmoke'}}>
                                        <CardActionArea>
                                            <CardMedia
                                            component="img"
                                            height="250"
                                            weight="100%"
                                            image={`data:image/png;base64,${bd.bookImage}`}
                                            alt="green iguana"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h6" component="div" className='bookNameSort'>
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
                                                <Link to={`/bookDisplay/${bd._id}`} style={{textDecoration:'none'}}>
                                                    <Button sx={{mt:1}} variant="contained">View Details</Button>
                                                </Link>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                )
                            }
                        </Grid>
                    </Box>
                </div>
            </Container>  
            <Footer></Footer> 
            </div>
        </div>
    );
};

export default AuthorName;