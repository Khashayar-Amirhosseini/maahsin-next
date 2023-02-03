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


const NavBar = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrollHight, setScrollHight] = React.useState(0)
  const handleDrawerToggle = () => {
      setMobileOpen((prevState) => !prevState);
    };
  const [showNav, setShowNav] = React.useState(false)
  const drawerWidth = 240;
  const navItems = [{name:'خانه',action:'#'},
                  {name:'خدمات',action:'#'},
                  {name:'تجهیزات',action:'#'},
                  {name:'مقالات',action:'#'},
                  {name:'درباره ما',action:'#'},
                  {name:'عضویت/ ورود',action:handleOpen}
                ];
    
    {React.useEffect(() => {
      if(typeof window!='undefined'){
      window.addEventListener('scroll', controlNavbar)
      return () => {
          window.removeEventListener('scroll', controlNavbar)
      }
  }}, [])
  const controlNavbar = () => {
    if (window.scrollY > 350) {
        setShowNav(true)
    } else {
        setShowNav(false)
    }
  } }
    const drawer = (
      <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center'}}>
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
      <Box  sx={{ display: 'flex' }}>
        <AppBar component="nav" color='transparent' position='relative' className={showNav?(style.alwaysTop):'f'} >
          <Toolbar>
            <IconButton
              className={style.Icon_Button}
              aria-label="open drawer"
              
              onClick={handleDrawerToggle}
              sx={{  display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: { xs: 'none', sm: 'block'} }}>
              {navItems.map((item) => (
                <Button key={item.name} onClick={item.action}>
                  <p>{item.name}</p>
                </Button>
              ))}
            </Box>
          </Toolbar>
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
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth},
            }}
          >
            <img className={style.headerPic} src={'img/heading-cream.svg'} />
            {drawer}
          </Drawer>
        </Box>
    </Box>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box className={style.modal}>
            <Typography variant="h4">ورود</Typography>
            <Grid container spacing={2} textAlign='center'>
                <Grid sx={{width:'80%'} } item>
                    <FormControl >
                        <TextField required 
                        id="standard-basic" 
                        label="نام کاربری" 
                        variant="standard"/>
                        <TextField required 
                        id="standard-basic" 
                        label="رمز ورود"
                        variant="standard"
                        type='password'
                        sx={{margin:'5px'}}/>
                    </FormControl> 
                </Grid>
                <Grid item sx={{width:'100%'}} textAlign='center'>
                    <Button size="small" variant="outlined" color='primary' >
                           
                    </Button> 
                </Grid>
            </Grid>     
        </Box>
      </Modal>
    </>

    );
}

export default NavBar;