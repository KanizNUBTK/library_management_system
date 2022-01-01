import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Link,Outlet} from "react-router-dom";
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../../hook/useAuth';

const drawerWidth = 200;
const Dashboard = (props) => {
    const {user, logout, admin} = useAuth();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    //const {user,logOut, admin } = useAuth();
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <Link to="/" style={{textDecoration:'none'}}><Button color="inherit">Home</Button></Link> <br />
            <Link to="/dashboard" style={{textDecoration:'none'}}><Button color="inherit">Dashboard</Button></Link> <br />
            <Link to="/dashboard/addBooks" style={{textDecoration:'none'}}><Button color="inherit">Add Books</Button></Link> <br />
            <Link to="/dashboard/profile" style={{textDecoration:'none'}}><Button color="inherit">Profile</Button></Link> <br />
            {admin && <Box>
                <Link to={`/dashboard/makeAdmin`} style={{textDecoration:'none'}}><Button color="inherit">Make Admin</Button></Link>
                <Link to={`/dashboard/bookCharts`} style={{textDecoration:'none'}}><Button color="inherit">Book Charts</Button></Link>
                <Link to={`/dashboard/addExcerice`} style={{textDecoration:'none'}}><Button color="inherit">Add Gym Equipment </Button></Link>
            </Box>}
            {user.email && <span style={{ padding:'10px' }}>{user.displayName} </span>} <br />
            {
                    user?.email ?
                    <Button onClick={logout} color="inherit">Logout</Button>
                    :
                    <NavLink style={{ textDecoration: 'none', color: 'white' }} to="/login">
                        <Button color="inherit">Login</Button>
                    </NavLink>
                }
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <div>
            <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Outlet></Outlet>
            </Box>
        </Box>       
        </div>
    );
};
Dashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Dashboard;