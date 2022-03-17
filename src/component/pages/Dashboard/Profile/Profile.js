import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { Container , Alert, CircularProgress} from '@mui/material';
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
    const{user,isLoading}=useAuth();
    const[name, setName] = useState(user.displayName);
    const[email, setEmail] = useState(user.email);
    const[phoneNumber, setPhoneNumber] = useState('');
    const[address, setAddress] = useState('');
    const[teacherEmail, setTeacherEmail] = useState('');
    const[friendEmail, setFriendEmail] = useState('');
    const[profilePictute, setProfilePictute] = useState(null);
    const[success, setSuccess] = useState(false);
    const[complete,setComplete]=useState(localStorage.getItem('myValueInLocalStorage') || false);
    //view user profile data
    const[viewProfile, setViewProfile]=useState([]);
     console.log(email);
    const handleUserProfile = e=>{
        e.preventDefault();
        if(!profilePictute){
            alert('Please upload your picture')
            return;
        }
        const formData = new FormData();
        formData.append('name',name);
        formData.append('email',email);
        formData.append('phoneNumber',phoneNumber);
        formData.append('address',address);
        formData.append('teacherEmail',teacherEmail);
        formData.append('friendEmail',friendEmail);
        formData.append('profilePictute',profilePictute);
        formData.append('status',true);

        fetch('https://radiant-oasis-30989.herokuapp.com/users', {
            method: 'PUT',
            body: formData
        })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
            setSuccess(true);
            //localStorage.setItem(setComplete(true));
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    console.log(user.email);
    useEffect(()=>{
        fetch(`https://radiant-oasis-30989.herokuapp.com/users`)
        .then(res=>res.json())
        .then(data=>{
            console.log('profile data',data);
            setViewProfile(data);
        })
    },[]);
    console.log('view profile',viewProfile);
    const exactProfile = viewProfile.filter(ep=>ep.email===email);
    let status=false;
     console.log(exactProfile);
    //console.log(exactProfile[0].status);
    if(exactProfile.length>0){status=exactProfile[0].status}
    return (
        <div>
            <Container>
                <Typography variant ="h4" sx={{fontWeight:'bold', color:'blue',m:3}}> Your Profile...</Typography> 
                <Grid style={{marginTop:'10px'}} container spacing={{ xs: 12, md: 3 }} columns={{ xs: 12, sm: 8, md: 12 }}>
                    <Grid xs={12} md={6} sx={{mb:3}}>
                        <Box sx={{mx:10}}>
                            <img style={{height:'300px',width:'300px',borderRadius:'50%'}} src={`data:image/png;base64,${exactProfile[0]?.profilePictute}`} alt="" />
                        </Box>
                    </Grid>
                    {isLoading && <CircularProgress />}
                    {<Grid xs={12} md={6}>
                        {exactProfile.map(vp=>
                            <Box>
                            <Typography variant ="h5" sx={{fontWeight:'bold', color:'blue',my:1}}>Your Information..</Typography>
                            <Typography variant ="h6" sx={{my:1}}>Name : {vp?.displayName}</Typography>
                            <Typography variant ="h6" sx={{my:1}}>Email : {vp?.email}</Typography>
                            <Typography variant ="h6" sx={{my:1}}>Phone Number : {vp?.userPhoneNumber}</Typography>
                            <Typography variant ="h6" sx={{my:1}}>Address : {vp?.userAddress}</Typography>
                            <Typography variant ="h6" sx={{my:1}}>Teacher Email : {vp?.teacherEmail}</Typography>
                            <Typography variant ="h6" sx={{my:1}}>Friends Email : {vp?.friendEmail}</Typography>
                            </Box>)}
                    </Grid>
                    }
                </Grid>
            </Container>
            <Divider variant="middle" />
            <Container>
            <Box sx={{mx:5, my:5}}>
            {!status?<div>
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
                label="Enter your Teacher Email " 
                name="teacherEmail"
                type="email"
                onChange = {e => setTeacherEmail(e.target.value)}
                variant="standard" />
                <TextField 
                required
                sx={{width:'75%'}} 
                label="Email someone you know who is a library member or your friend" 
                name="friendEmail"
                type="email"
                onChange = {e => setFriendEmail(e.target.value)}
                variant="standard" />
                <Button type="submit" variant="contained" sx={{width: '75%', mt:1}}>Added</Button>
                </form>
                </div>
                :
                <Typography variant ="h4" sx={{fontWeight:'bold', color:'blue'}}>Your Profile is up to date</Typography>
                }
                {success && <Alert severity="success">Profile is completed</Alert>}
            </Box> 
        </Container>
        </div>
    );
};

export default Profile;