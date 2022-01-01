import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Alert} from '@mui/material';

const MakeAdmin = () => {
    const[email,setEmail]=useState('');
    const [success, setSuccess] = useState(false);
    const handleOnBlur = e =>{
        setEmail(e.target.value);
    }
    const handleMakeAdmin = e =>{
        const user ={email};
        fetch('https://radiant-oasis-30989.herokuapp.com/users/admin',{
            method:'PUT',
            headers:{'content-type':'application/json'},
            body:JSON.stringify(user)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.modifiedCount){
                console.log(data);
                setEmail('');
                setSuccess(true);
            }  
        })
    }
    return (
        <div>
            <Container>
                <Box>
                    <Typography variant="h3" sx={{color:'blue', fontWeight:'bold'}} component="div">
                        Are You Want to Make Someone Admin???
                    </Typography>
                    <form onSubmit={handleMakeAdmin}>
                        <TextField 
                            sx={{width:"70%",mt:2}}
                            label="Enter Email Address" 
                            name="email"
                            type="email"
                            onBlur={handleOnBlur}
                            variant="standard" />     
                        <Button variant="contained" type="submit" sx={{width:"20%",mt:2}}>Make Admin</Button>
                    </form>
                    {success && <Alert severity="success">Admin added successfully!</Alert>}
                </Box>
            </Container>    
        </div>
    );
};

export default MakeAdmin;