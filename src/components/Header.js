// src/components/Header.js
import React, { useState } from 'react'; // Import useState
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton, // Import IconButton
  Drawer,     // Import Drawer for mobile menu
  List,       // Import List for drawer items
  ListItem,   // Import ListItem for individual drawer items
  ListItemText // Import ListItemText for text in drawer items
} from '@mui/material';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import MenuIcon from '@mui/icons-material/Menu'; // Import MenuIcon (hamburger)
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false); // State to control mobile drawer open/close

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle} // Close drawer on item click
      sx={{ textAlign: 'center' }}
    >
      <Typography variant="h6" sx={{ my: 2, color: 'primary.main' }}>
        MediGuid NYC
      </Typography>
      <List>
        <ListItem button onClick={() => navigate('/')}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => navigate('/select-symptoms')}>
          <ListItemText primary="Get Guidance" />
        </ListItem>
        <ListItem button onClick={() => navigate('/about')}>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button onClick={() => navigate('/contact')}>
          <ListItemText primary="Contact" />
        </ListItem>
        <ListItem button onClick={() => navigate('/resources')}>
          <ListItemText primary="Resources" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position='static' elevation={0} sx={{ background: 'white', borderBottom: '1px solid #eee', py: 1}}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo/Title - Always visible, links to home */}
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <MedicalInformationIcon sx={{ mr: 1, color: 'primary.main'}} fontSize='large'/>
          <Typography variant='h6' component="div" sx={{ color: 'text.primary', fontWeight: 600}}>
            MediGuid NYC
          </Typography>
        </Box>

        {/* Desktop Navigation - Hidden on small screens */}
        <Box sx={{ display: { xs: 'none', sm: 'block' }, gap: 2 }}>
          <Button color='inherit' onClick={() => navigate('/about')} sx={{ color: 'text.secondary'}}>About</Button>
          <Button color='inherit' onClick={() => navigate('/contact')} sx={{ color: 'text.secondary'}}>Contact</Button>
          <Button color='inherit' onClick={() => navigate('/resources')} sx={{ color: 'text.secondary'}}>Resources</Button>
        </Box>

        {/* Mobile Hamburger Icon - Hidden on large screens, right-aligned */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end" // Puts it on the right
          onClick={handleDrawerToggle}
          sx={{
            display: { sm: 'none' }, // Show only on small screens
            color: 'text.primary' // Ensure icon color is visible on white background
          }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right" // Position drawer on the right
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' }, // Show only on small screens
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 }, // Width of the drawer
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}

export default Header;