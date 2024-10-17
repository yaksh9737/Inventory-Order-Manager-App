import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CategoryIcon from '@mui/icons-material/Category';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { Path } from './Commen/Path';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { DeliveryDining, Home, LocalMall, Logout, Shop2, SupportAgent } from '@mui/icons-material';
import Constents from './Commen/constents';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const drawerWidth = 240;

function Layout({ Component, setAuth, Auth }) {
    const [orderopen, setorderopen] = React.useState(false);
    const [ProductOpen, setProductOpen] = React.useState(false)
    const [ProfileOpen, setProfileOpen] = React.useState(false)

    const location = useLocation()
    const [mobileOpen, setmobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setmobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setmobileOpen(!mobileOpen);
        }
    };

    const LogoutHandeler = () => {
        localStorage.removeItem("token")
        setAuth(Constents.getUserDetails())

    }

    if (!Auth || Auth?.role > 1) return <Navigate to={Path.login} />


    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <Link to={Path.dashboard}>
                    <ListItemButton selected={location.pathname === Path.dashboard}>
                        <ListItemIcon>
                            <Home color={location.pathname === Path.dashboard ? "primary" : "inherit"} />
                        </ListItemIcon>
                        <ListItemText primary={"Dashboard"} />
                    </ListItemButton>
                </Link>
                {Auth.role === 0 && <Link to={Path.category}>
                    <ListItemButton selected={location.pathname === Path.category}>
                        <ListItemIcon >
                            <CategoryIcon color={location.pathname === Path.category ? "primary" : "inherit"} />
                        </ListItemIcon>
                        <ListItemText primary={"Category"} />
                    </ListItemButton>
                </Link>}
                <ListItemButton onClick={() => setProductOpen(!ProductOpen)}>
                    <ListItemIcon>
                        <ShoppingCartIcon color={location.pathname.toLocaleLowerCase().includes("product") ? "primary" : "inherit"} />                    </ListItemIcon>
                    <ListItemText primary="Product" />
                    {ProductOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={ProductOpen}>
                    <Link to={Path.product}>
                        <ListItemButton sx={{ pl: 4 }} selected={location.pathname === Path.product}>
                            <ListItemIcon>
                                <Shop2 color={location.pathname === Path.product ? "primary" : "inherit"} />
                            </ListItemIcon>
                            <ListItemText primary={"All Products"} />
                        </ListItemButton>
                    </Link>
                    {Auth.role === 1 && <Link to={Path.stock}>
                        <ListItemButton selected={location.pathname === Path.stock} sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <LocalMall color={location.pathname === Path.stock ? "primary" : "inherit"} />
                            </ListItemIcon>
                            <ListItemText primary={"Product Stock"} />
                        </ListItemButton>
                    </Link>}
                </Collapse>
                <ListItemButton onClick={() => setorderopen(!orderopen)}>
                    <ListItemIcon>
                        <LocalShippingIcon color={location.pathname.toLocaleLowerCase().includes("order") ? "primary" : "inherit"} />
                    </ListItemIcon>
                    <ListItemText primary="Order" />
                    {orderopen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={orderopen} unmountOnExit>
                    <Link to={Path.orderlist}>
                        <ListItemButton sx={{ pl: 4 }} selected={location.pathname === Path.orderlist}>
                            <ListItemIcon>
                                <SupportAgent color={location.pathname === Path.orderlist ? "primary" : "inherit"} />
                            </ListItemIcon>
                            <ListItemText primary={Auth.role === 0 ? "Distibuter Orders" : "Customer Orders"} />
                        </ListItemButton>
                    </Link>
                    {Auth.role === 1 && <Link to={Path.yourOrders}>
                        <ListItemButton sx={{ pl: 4 }} selected={location.pathname === Path.yourOrders}>
                            <ListItemIcon>
                                <DeliveryDining color={location.pathname === Path.yourOrders ? "primary" : "inherit"} />
                            </ListItemIcon>
                            <ListItemText primary="Your Orders" />
                        </ListItemButton>
                    </Link>}
                </Collapse>
                <Link to={Path.user}>
                    <ListItemButton selected={location.pathname === Path.user}>
                        <ListItemIcon >
                            <AccountCircleIcon color={location.pathname === Path.user ? "primary" : "inherit"} />
                        </ListItemIcon>
                        <ListItemText primary={"Users"} />
                    </ListItemButton>
                </Link>
                <ListItemButton onClick={LogoutHandeler}>
                    <ListItemIcon>
                        <Logout />
                    </ListItemIcon>
                    <ListItemText primary={"Sign out"} />
                </ListItemButton>
            </List>
        </div>
    );
    const container = document !== undefined ? () => document.getElementById("root") : undefined;



    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `100%` },
                    ml: { sm: `${drawerWidth}px` },
                    zIndex: 1300,
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div className="d-flex align-items-center justify-content-between w-100">
                        <Typography variant="h6" style={{fontSize:"1.4em"}} noWrap component="div">
                            Mevada Kalgi Tea
                        </Typography>
                        <Button
                            color='inherit'
                            id="demo-positioned-button"
                            aria-controls={ProfileOpen ? 'demo-positioned-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={ProfileOpen ? 'true' : undefined}
                            onClick={() => setProfileOpen(true)}
                        >
                            {
                                Auth && Auth.fullName && Auth.role !== undefined ? `${Auth.fullName} (${Constents.roles[Auth.role]})` : ""
                            }
                            <ArrowDropDownIcon />
                        </Button>
                        <Menu
                            id="demo-positioned-menu"
                            aria-labelledby="demo-positioned-button"
                            open={ProfileOpen}
                            onClose={() => setProfileOpen(false)}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            {Auth?.role !== 0 && <div className="d-inline-block px-3">
                                <b>City : </b><span>{Auth.city}</span>
                                <hr className='mb-0' />
                            </div>}
                            <MenuItem onClick={LogoutHandeler} >Logout</MenuItem>
                        </Menu>
                    </div>
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
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true
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
                    open={mobileOpen}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {Component}
            </Box>
        </Box>
    );
}

export default Layout;
