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
import Navbar from '../../../shared/Navbar/Navbar';
import Footer from '../../../shared/Footer/Footer';

const LibrarySerach = () => {
    const[booksData, setBooksData]=useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/addBookData')
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            setBooksData(data);
        })
    },[])
    return (
        <div>   
            <Navbar></Navbar>
            <Container>
                <Typography variant ="h4" sx={{fontWeight:'bold', color:'blue', m:5}}>Find Books Here..</Typography>
                <Box sx={{ flexGrow: 1 }}>
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