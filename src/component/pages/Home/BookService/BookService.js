import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Container} from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import middleBanner from '../../../../images/middleBanner.jpg';


const BookService = () => {
    const[booksData, setBooksData]=useState([]);
    
    useEffect(()=>{
        fetch('https://radiant-oasis-30989.herokuapp.com/addBookData')
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            setBooksData(data);
        })
    },[]);
    return (
        <div>
            <Container sx={{my:5 , boxShadow:3}}>
            <Box sx={{ flexGrow: 1, pb:5 }}>
                <Box sx={{ display:'flex', my:5 ,justifyContent:'center'}}>
                    <Typography variant="h3" sx={{color:'blue',my:'auto',fontWeight:'bold'}} component="div">
                        Our
                    </Typography>
                    <img style={{width:'50%',height:'150px'}} src={middleBanner} alt="" />
                </Box>
                    <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
                        {booksData.map(bd=> 
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
            </Container>    
        </div>
    );
};

export default BookService;