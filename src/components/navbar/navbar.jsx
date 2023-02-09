import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import primary from '../../../config/theme';
import secondary from '../../../config/theme';
import { width } from '@mui/system';
import { Grade } from '@mui/icons-material';
import { Box, Button, FormControl, Grid, Modal, TextField, Typography } from '@mui/material';
import style from './navbar.module.css'
import SignInModal from '../signInModal/signInModal';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';


const NavBar = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrollHight, setScrollHight] = React.useState(0)
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const [showNav, setShowNav] = useState(false)
  const drawerWidth = 240;
  const { User } = useSelector(state => state.UserReducer)
  //const item=User.isAuthenticated?{name:null,action:null}:{name:'عضویت/ ورود',action:handleOpen}
  const [navItems, setNavItem] = useState([
    { name: 'خانه', action: '#' },
    { name: 'خدمات', action: '#' },
    { name: 'تجهیزات', action: '#' },
    { name: 'مقالات', action: '#' },
    { name: 'ورود/عضویت', action: handleOpen }
  ]);
  React.useEffect(() => {
    if (User.isAuthenticated) {
      const newNavItem = navItems.filter(item => item.name != 'ورود/عضویت')
      setNavItem(newNavItem)
    }
    else{
      setNavItem([
        { name: 'خانه', action: '#' },
        { name: 'خدمات', action: '#' },
        { name: 'تجهیزات', action: '#' },
        { name: 'مقالات', action: '#' },
        { name: 'ورود/عضویت', action: handleOpen }
      ])
    }
  }, [User.isAuthenticated])
  {
    React.useEffect(() => {
      if (typeof window != 'undefined') {
        window.addEventListener('scroll', controlNavbar)
        return () => {
          window.removeEventListener('scroll', controlNavbar)
        }
      }
    }, [])
    const controlNavbar = () => {
      if (window.scrollY > 350) {
        setShowNav(true)
      } else {
        setShowNav(false)
      }
    }
  }
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} onClick={item.action}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );


  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <AppBar component="nav" color='transparent' position='relative' className={showNav ? (style.alwaysTop) : 'f'} >
          <Toolbar>
            <IconButton
              className={style.Icon_Button}
              aria-label="open drawer"

              onClick={handleDrawerToggle}
              sx={{ display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            {showNav && (User.isAuthenticated && (<button className={style.userProfile} style={{ background: 'transparent', borderColor: 'transparent' }} ><AccountCircleOutlinedIcon color='secondary' /></button>))}
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item) => (
                <Button key={item.name} onClick={item.action}>
                  <p>{item.name}</p>
                </Button>
              ))}
            </Box>
          </Toolbar>
          {showNav && (User.isAuthenticated && (<button style={{ background: 'transparent', borderColor: 'transparent' }} className={style.LogoutButton} onClick={props.logout}><PowerSettingsNewOutlinedIcon color='secondary' /></button>))}
        </AppBar>
        <Box component="nav">
          <Drawer
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
            <img className={style.headerPic} src={'img/heading-cream.svg'} />
            {drawer}
          </Drawer>
        </Box>
      </Box>
      <SignInModal open={open} close={handleClose} />
    </>
  );
}

export default NavBar;