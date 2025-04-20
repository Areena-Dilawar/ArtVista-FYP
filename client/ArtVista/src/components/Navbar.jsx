import React, { useState, useEffect } from 'react';
import AV from '../assets/Images/AV1.png';
import { IconButton, Drawer, List, ListItem, ListItemText, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const handleAccountClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccountClose = () => {
    setAnchorEl(null);
  };

  const handleHamburgerClick = () => {
    setHamburgerOpen(true);
  };

  const handleCloseHamburger = () => {
    setHamburgerOpen(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 w-full z-50 ${
      scrolled ? 'bg-white/70 backdrop-blur-md shadow-md' : 'bg-black'
    } transition-all duration-300`}>
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img src={AV} alt="Logo" className="w-12 h-12" />
        </div>

        {/* Search Bar */}
        <div className="flex-grow flex justify-center">
          <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2 w-120">
            <SearchIcon className="text-gray-500" />
            <input
              type="text"
              placeholder="Search products..."
              className="ml-2 w-full bg-transparent outline-none"
            />
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">

          {/* Shopping Cart Icon */}
          <IconButton aria-label="Cart">
            <ShoppingCartIcon sx={{ fontSize: 30, color: scrolled ? 'black' : 'white' }} />
          </IconButton>

          {/* Account Icon with Menu */}
          <IconButton aria-label="Account" onClick={handleAccountClick}>
            <AccountCircleIcon sx={{ fontSize: 30, color: scrolled ? 'black' : 'white' }} />
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
          >
            <MenuItem onClick={handleAccountClose}>
              <LoginIcon sx={{ mr: 1, fontSize: 20 }} />
              Login
            </MenuItem>
            <MenuItem onClick={handleAccountClose}>
              <PersonAddIcon sx={{ mr: 1, fontSize: 20 }} />
              Sign Up
            </MenuItem>
          </Menu>

          {/* Hamburger Menu Icon */}
          <IconButton aria-label="Menu" onClick={handleHamburgerClick}>
            <MenuIcon sx={{ fontSize: 30, color: scrolled ? 'black' : 'white' }} />
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