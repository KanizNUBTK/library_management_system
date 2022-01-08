import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import useAuth from '../../../hook/useAuth';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

const Navbar = () => {
     const {user,logout} = useAuth();
    const[viewProfile, setViewProfile]=useState([]);
    const theme = useTheme();
    const useStyle = makeStyles({
        nabItemMD:{
            color:'white',
            textDecoration:'none',
        },
        nabItem:{
            color:'white',
            textDecoration:'none',
        },
        // navIcon:{
        //     [theme.breakpoints.up('sm')]: {
        //         display:'none!important',
        //     },
        // },    
        navContainer:{
            display:'inline-flex',
            [theme.breakpoints.down('sm')]: {
                display:'none!important',
            },
        },
        navLogo:{
            [theme.breakpoints.down('sm')]: {
                textAlign:'center',
            },
        },
        mobileNavItem:{
            backgroundColor:'black',
        }
    })
    const {nabItemMD,nabItem,navIcon,navContainer,navLogo,mobileNavItem} = useStyle();
    //drawer style
    const [state, setState] = React.useState(false);

    const list  =(
        <Box
          sx={{ width : 200 ,height:'100%'}}
          role="presentation"
          className={mobileNavItem}
        >
            <List sx={{mt:10, mx:2}}>
                <ListItem button>
                    <ListItemText ><Link className={nabItem} to="/home">Home</Link></ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemText><Link className={nabItem} to="/librarySerach">Find Books</Link></ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemText><Link to="/dashboard" className={nabItem}>Dashboard</Link></ListItemText>
                </ListItem>
                <Divider />
                {user.email ? <Avatar alt="Cindy Baker" src={`data:image/png;base64,${viewProfile[0]?.profilePictute}`} />:null}
                {user.email && <span style={{ padding:'10px', color: 'white' }}>{user.displayName} </span>}
                {
                    user?.email ?
                    <Button onClick={logout} color="inherit">Logout</Button>
                    :
                    <NavLink style={{ textDecoration: 'none', color: 'white' }} to="/login">
                        <Button sx={{color:'black'}}>Login</Button>
                    </NavLink>
                }
            </List>
        </Box>
      );
      //view profile picture
      useEffect(()=>{
        fetch('https://radiant-oasis-30989.herokuapp.com/profile')
        .then(res=>res.json())
        .then(data=>{
            //console.log(data);
            setViewProfile(data);
        })
    },[]);

    return (
        <div>
            <CssBaseline />
            <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{backgroundColor:'transparent',px:5}}>
                <Toolbar>
                    <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    //   sx={{ mr: 2 }}
                    className={navIcon}
                    onClick={()=>setState(true)}
                    >
                    <MenuIcon />
                    </IconButton>
                    <Typography className={navLogo} variant="h6" component="div" sx={{ flexGrow: 1,textAlign:'center' }}>
                        Library Management System
                    </Typography>
                    <Box className={navContainer}>
                        {/* <Link to="/home" className={nabItemMD}><Button color="inherit">Home</Button></Link>
                        <Link to="/librarySerach" className={nabItemMD}><Button color="inherit">Find Books</Button></Link>
                        <Link to="/dashboard" className={nabItemMD}><Button color="inherit">Dashboard</Button></Link> */}
                        {user.email && <Avatar alt="Cindy Baker" src={`data:image/png;base64,${viewProfile[0]?.profilePictute}`} />}
                        {user.email && <span style={{ padding:'10px', color: 'white' }}>{user.displayName} </span>}
                        {
                        user?.email ?
                            <Button onClick={logout} color="inherit">Logout</Button>
                            :
                            <NavLink style={{ textDecoration: 'none', color: 'white' }} to="/login">
                                <Button color="inherit">Login</Button>
                            </NavLink>
                        } 
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
        <div>
            <React.Fragment>
                <Drawer
                    open={state}
                    onClose={()=>setState(false)}
                >
                    {list}
                </Drawer>
            </React.Fragment>
        </div>   
        </div>
    );
};

export default Navbar;