import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Alert, Button, Input } from '@mui/material';

const AddBooks = () => {
    const[bookName, setBookName]=useState('');
    const[authorName, setAuthorName]=useState('');
    const[bookPrice, setBookPrice]=useState('');
    const[publisherName, setPublisherName]=useState('');
    const[bookType, setBookType]=useState('');
    const[bookImage, setBookImage]=useState(null);
    const[success,setSuccess]=useState(false);
    const handleBookImageUpload =e=>{
        if(!bookImage){
            return <alert>Please Choose an Image</alert>
        }
        const formData = new FormData();
        formData.append('bookName',bookName);
        formData.append('bookPrice',bookPrice);
        formData.append('authorName',authorName);
        formData.append('publisherName',publisherName);
        formData.append('bookType',bookType);
        formData.append('bookImage',bookImage);
        fetch('https://radiant-oasis-30989.herokuapp.com/addBookData', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
            setSuccess(true);
            setBookName('');
            setBookPrice('');
            setAuthorName('');
            setPublisherName('');
            setBookType('');
            setBookImage('');
        })
        .catch(error => {
            console.error('Error:', error);
        });
        e.preventDefault();
    }
    return (
        <div>
            <Container>
                <Box>
                    <Typography variant="h3" sx={{my:3,color:'blue', fontWeight:'bold'}} component="div">
                        Add Book ...
                    </Typography>
                    <form onSubmit={handleBookImageUpload}>
                        <Input 
                        accept="*" 
                        id="contained-button-file" 
                        onChange={e=>setBookImage(e.target.files[0])}
                        multiple type="file" />
                        <br />
                        <TextField 
                        required
                        sx={{width:"50%",mt:1}}
                        label="Book Name" 
                        name="bookName"
                        type="name"
                        onChange={e=>setBookName(e.target.value)}
                        variant="standard" />
                        <br />
                        <TextField 
                        required
                        sx={{width:"50%",mt:1}}
                        label="Book Price" 
                        name="price"
                        type="number"
                        onChange={e=>setBookPrice(e.target.value)}
                        variant="standard" />
                        <br />
                        <TextField 
                        required
                        sx={{width:"50%",mt:1}}
                        label="Author name" 
                        name="authorName"
                        type="name"
                        onChange={e=>setAuthorName(e.target.value)}
                        variant="standard" />
                        <br />
                        <TextField 
                        required
                        sx={{width:"50%",mt:1}}
                        label="Publisher Name" 
                        name="publisherName"
                        type="name"
                        onChange={e=>setPublisherName(e.target.value)}
                        variant="standard" />
                        <br />
                        <TextField 
                        required
                        sx={{width:"50%",mt:1}}
                        label="Book Type" 
                        name="type"
                        type="name"
                        onChange={e=>setBookType(e.target.value)}
                        variant="standard" />
                        <br />
                        <Button variant="contained" type="submit" sx={{mt:1,width:"50%"}}>
                         Upload
                        </Button>
                    </form>
                    {success && <Alert severity="success">Book Uploaded Successfully</Alert>}
                </Box>
            </Container>    
        </div>
    );
};

export default AddBooks;