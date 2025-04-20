import React, { useState, useEffect } from 'react';
import AV from '../assets/Images/AV1.png';
import { IconButton, Drawer, List, ListItem, ListItemText, Box, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // For Account Menu

  // More sensitive scroll detection
  const handleScroll = () => {
    if (window.scrollY > 10) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const handleAccountClick = (event) => {
    setAnchorEl(event.currentTarget); // Open menu
  };

  const handleAccountClose = () => {
    setAnchorEl(null); // Close menu
  };

  const handleHamburgerClick = () => {
    setHamburgerOpen(true);
  };

  const handleCloseHamburger = () => {
    setHamburgerOpen(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    // Check initial scroll position when component mounts
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Create explicit style objects to ensure proper application
  const navbarStyle = {
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 50,
    transition: 'all 0.5s ease-in-out',
    backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.7)' : 'black',
    backdropFilter: scrolled ? 'blur(12px)' : 'none',
    boxShadow: scrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
    color: scrolled ? 'black' : 'white',
  };

  const iconStyle = {
    color: scrolled ? 'black' : 'white',
    transition: 'color 0.3s ease'
  };

  // Console log to debug scroll state
  console.log('Scrolled state:', scrolled);

  return (
    <div style={navbarStyle}>
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center">
          <img src={AV} alt="Logo" className="w-12 h-12" />
        </div>

        {/* Search Bar */}
        <div className="flex-grow flex justify-center">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            borderRadius: '0.5rem',
            padding: '0.5rem 1rem',
            width: '100%',
            maxWidth: '480px',
            backgroundColor: scrolled ? 'rgba(229, 231, 235, 0.8)' : 'rgb(243, 244, 246)'
          }}>
            <SearchIcon style={{ color: scrolled ? '#374151' : '#6B7280' }} />
            <input
              type="text"
              placeholder="Search products..."
              style={{
                marginLeft: '0.5rem',
                width: '100%',
                background: 'transparent',
                outline: 'none',
                color: scrolled ? 'black' : 'black'
              }}
            />
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <IconButton aria-label="Cart">
            <ShoppingCartIcon sx={{ fontSize: 30, ...iconStyle }} />
          </IconButton>

          {/* Account Icon with MUI Menu */}
          <IconButton aria-label="Account" onClick={handleAccountClick}>
            <AccountCircleIcon sx={{ fontSize: 30, ...iconStyle }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleAccountClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            PaperProps={{
              sx: {
                mt: 1.5,
                backgroundColor: scrolled ? 'white' : 'black',
                color: scrolled ? 'black' : 'white',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                '& .MuiMenuItem-root:hover': {
                  backgroundColor: scrolled ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)',
                },
                borderRadius: '8px'
              }
            }}
          >
            <MenuItem onClick={handleAccountClose}>Login</MenuItem>
            <MenuItem onClick={handleAccountClose}>Sign Up</MenuItem>
          </Menu>

          {/* Hamburger Icon */}
          <IconButton aria-label="Menu" onClick={handleHamburgerClick}>
            <MenuIcon sx={{ fontSize: 30, ...iconStyle }} />
          </IconButton>
        </div>
      </div>

      {/* Hamburger Drawer */}
      <Drawer
        anchor="top"
        open={hamburgerOpen}
        onClose={handleCloseHamburger}
        sx={{
          '.MuiDrawer-paper': {
            height: '100%',
            backgroundColor: 'black',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem',
          },
        }}
      >
        {/* Close Icon */}
        <div className="flex justify-end w-full p-4">
          <IconButton onClick={handleCloseHamburger}>
            <CloseIcon sx={{ fontSize: 30, color: 'white' }} />
          </IconButton>
        </div>

        {/* Menu Items */}
        <List className="space-y-6 text-center">
          {['Home', 'Shop', 'About', 'Contact'].map((text) => (
            <ListItem button key={text} onClick={handleCloseHamburger}>
              <ListItemText
                primary={text}
                sx={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default Navbar;