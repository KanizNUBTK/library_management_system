import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Alert} from '@mui/material';

const MakeTeacher = () => {
    const[email,setEmail]=useState('');
    const [success, setSuccess] = useState(false);
    const handleOnBlur = e =>{
        setEmail(e.target.value);
    }
    const handleMakeAdmin = e =>{
        const user ={email};
        // fetch('https://radiant-oasis-30989.herokuapp.com/users/admin',{
        //     method:'PUT',
        //     headers:{'content-type':'application/json'},
        //     body:JSON.stringify(user)
        // })
        fetch('http://localhost:5000/users/teacher',{
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
                        Add New Teacher...
                    </Typography>
                    <form onSubmit={handleMakeAdmin}>
                        <TextField 
                            sx={{width:"70%",mt:2}}
                            label="Enter Email Address" 
                            name="email"
                            type="email"
                            onBlur={handleOnBlur}
                            variant="standard" />     
                        <Button variant="contained" type="submit" sx={{width:"20%",mt:2}}>Make Teacher</Button>
                    </form>
                    {success && <Alert severity="success">Teacher added successfully!</Alert>}
                </Box>
            </Container> 
        </div>
    );
};

export default MakeTeacher;