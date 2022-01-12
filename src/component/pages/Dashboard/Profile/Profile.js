import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { Container , Alert} from '@mui/material';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import Divider from '@mui/material/Divider';
import useAuth from '../../../../hook/useAuth';

const Input = styled('input')({
    display: 'none',
  });

const Profile = () => {
    const{user}=useAuth();
    const[name, setName] = useState(user.displayName);
    const[email, setEmail] = useState(user.email);
    const[phoneNumber, setPhoneNumber] = useState('');
    const[address, setAddress] = useState('');
    const[personOne, setpersonOne] = useState('');
    const[personTow, setPersonTwo] = useState('');
    const[profilePictute, setProfilePictute] = useState(null);
    const[success, setSuccess] = useState(false);
    //view user profile data
    const[viewProfile, setViewProfile]=useState([]);
     console.log(user.email);
    const handleUserProfile = e=>{
        e.preventDefault();
        if(!profilePictute){
            return;
        }
        const formData = new FormData();
        formData.append('name',name);
        formData.append('email',email);
        formData.append('phoneNumber',phoneNumber);
        formData.append('address',address);
        formData.append('personOne',personOne);
        formData.append('personTow',personTow);
        formData.append('profilePictute',profilePictute);

        fetch('https://radiant-oasis-30989.herokuapp.com/profile', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
            setSuccess(true);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    console.log(user.email);
    useEffect(()=>{
        fetch(`https://radiant-oasis-30989.herokuapp.com/profile`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            setViewProfile(data);
        })
    },[]);
    console.log(viewProfile);
    const exactProfile = viewProfile.filter(ep=>ep.userEmail===user.email);
    console.log(exactProfile);
    return (
        <div>
            <Container>
                <Typography variant ="h4" sx={{fontWeight:'bold', color:'blue',m:3}}> Your Profile...</Typography> 
                <Grid style={{marginTop:'10px'}} container spacing={{ xs: 12, md: 3 }} columns={{ xs: 12, sm: 8, md: 12 }}>
                    <Grid xs={12} md={6} sx={{mb:3}}>
                        <Box sx={{mx:10}}>
                            <img style={{height:'300px',width:'300px',borderRadius:'50%'}} src={`data:image/png;base64,${viewProfile[0]?.profilePictute}`} alt="" />
                        </Box>
                    </Grid>
                    { user.email &&
                    <Grid xs={12} md={6}>
                        {exactProfile.map(vp=>
                            <Box>
                            <Typography variant ="h5" sx={{fontWeight:'bold', color:'blue',my:1}}>Your Information..</Typography>
                            <Typography variant ="h6" sx={{my:1}}>Name : {vp?.userName}</Typography>
                            <Typography variant ="h6" sx={{my:1}}>Email : {vp?.userEmail}</Typography>
                            <Typography variant ="h6" sx={{my:1}}>Phone Number : {vp?.userPhoneNumber}</Typography>
                            <Typography variant ="h6" sx={{my:1}}>Address : {vp?.userAddress}</Typography>
                            <Typography variant ="h6" sx={{my:1}}>Neighbor : {vp?.memberOne}</Typography>
                            <Typography variant ="h6" sx={{my:1}}>Neighbor : {vp?.memberTow}</Typography>
                            </Box>)}
                    </Grid>
                    }
                </Grid>
            </Container>
            <Divider variant="middle" />
            <Container>
            <Box sx={{mx:5, my:5}}>
                <Typography variant ="h4" sx={{fontWeight:'bold', color:'blue'}}>Update Your Profile...</Typography>
                <form onSubmit={handleUserProfile}>
                <br />
                <label htmlFor="contained-button-file" >
                    <Input accept="image/*" 
                    id="contained-button-file" 
                    type="file" 
                    onChange = {e => setProfilePictute(e.target.files[0])}/>
                    <Button variant="contained" sx={{ mt:1}} component="span">Upload Your Profile Picture</Button>
                </label>
                <br />
                <TextField 
                sx={{width:'75%'}}
                required  
                defaultValue={user.displayName}
                //label="Enter your name"
                name="name"
                type="text"
                onChange = {e => setName(e.target.value)}
                variant="standard" />
                <TextField 
                sx={{width:'75%'}} 
                required 
                defaultValue={user.email} 
                //label="Enter your email"
                name="email"
                type="email"
                onChange = {e => setEmail(e.target.value)}
                variant="standard" />
                <TextField 
                required
                sx={{width:'75%'}} 
                label="Enter Your Phone Number" 
                name="phoneNumber"
                type="number"
                onChange = {e => setPhoneNumber(e.target.value)}
                variant="standard" />
                <TextField 
                required
                sx={{width:'75%'}} 
                label="Enter Your Address" 
                name="address"
                type="text"
                onChange = {e => setAddress(e.target.value)}
                variant="standard" />
                <TextField 
                required
                sx={{width:'75%'}} 
                label="Email someone you know who is a library member(person one) " 
                name="personOne"
                type="email"
                onChange = {e => setpersonOne(e.target.value)}
                variant="standard" />
                <TextField 
                required
                sx={{width:'75%'}} 
                label="Email someone you know who is a library member(person two) " 
                name="personTow"
                type="email"
                onChange = {e => setPersonTwo(e.target.value)}
                variant="standard" />
                <Button type="submit" variant="contained" sx={{width: '75%', mt:1}}>Added</Button>
                </form>
                {success && <Alert severity="success">Profile is completed</Alert>}
            </Box>
        </Container>
        </div>
    );
};

export default Profile;