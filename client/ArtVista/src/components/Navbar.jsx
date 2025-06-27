import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AV from '../assets/Images/AV.png';
import AV1 from '../assets/Images/AV1.png';
import {
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Menu,
  MenuItem,
  Badge,
  Divider,
  Typography,
  Box,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAdmin, isArtist } = useAuth();
  const { cartItems, removeFromCart, total, updateQuantity } = useCart();
  const { wishlistItems } = useWishlist();

  const [scrolled, setScrolled] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [accountMenuAnchor, setAccountMenuAnchor] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const totalItems = useMemo(() => {
    return cartItems.reduce((total, item) => total + (item.quantity || 0), 0) || 0;
  }, [cartItems]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAccountClick = (event) => {
    setAccountMenuAnchor(event.currentTarget);
  };

  const handleAccountClose = () => {
    setAccountMenuAnchor(null);
  };

  const handleHamburgerClick = () => {
    setHamburgerOpen(true);
  };

  const handleCloseHamburger = () => {
    setHamburgerOpen(false);
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const handleLogin = () => {
    handleAccountClose();
    navigate('/login', { state: { from: location } });
  };

  const handleSignup = () => {
    handleAccountClose();
    navigate('/signup', { state: { from: location } });
  };

  const handleLogout = () => {
    handleAccountClose();
    logout();
  };

  const handleDashboard = () => {
    handleAccountClose();
    if (isAdmin) {
      navigate('/admin-dashboard');
    } else if (isArtist) {
      navigate('/artist-dashboard');
    } else {
      navigate('/customer-dashboard');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setHamburgerOpen(false);
    }
  };

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Shop', path: '/category/Painting' },
    { title: 'Events', path: '/events' },
    { title: 'About', path: '/about' },
    { title: 'Services', path: '/services' },
    { title: 'Contact', path: '/contact' },
  ];

  if (user && !isArtist && !isAdmin) {
    navLinks.push({ title: 'Become a Seller', path: '/become-seller' });
  }

  return (
    <Box component="header" className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-black'}`}>
      <Box className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center" aria-label="Home">
          <img
            src={scrolled ? AV : AV1}
            alt="ArtVista Logo"
            className="h-10 w-auto transition-all duration-300"
          />

        </Link>

        <Box component="nav" className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              to={link.path}
              className={`font-medium ${scrolled ? 'text-gray-800 hover:text-black' : 'text-gray-300 hover:text-white'} transition-colors`}
            >
              {link.title}
            </Link>
          ))}
        </Box>

        <Box component="div" className="hidden md:flex flex-grow justify-center mx-8">
          <form onSubmit={handleSearch} className="flex items-center bg-gray-100 rounded-lg px-4 py-2 w-full max-w-md">
            <SearchIcon className="text-gray-500" />
            <input
              type="text"
              placeholder="Search products..."
              className="ml-2 w-full bg-transparent outline-none text-gray-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search products"
            />
          </form>
        </Box>

        <Box component="div" className="flex items-center space-x-4">
          <IconButton aria-label="Wishlist" onClick={() => navigate('/wishlist')}>
            <Badge badgeContent={wishlistItems.length} color="error" invisible={!wishlistItems.length}>
              <FavoriteIcon sx={{ fontSize: 26, color: scrolled ? 'black' : 'white' }} />
            </Badge>
          </IconButton>

          <IconButton aria-label="Shopping Cart" onClick={toggleCart}>
            <Badge badgeContent={totalItems} color="error" invisible={totalItems === 0}>
              <ShoppingCartIcon sx={{ fontSize: 26, color: scrolled ? 'black' : 'white' }} />
            </Badge>
          </IconButton>

          <IconButton aria-label="Account" onClick={handleAccountClick}>
            <AccountCircleIcon sx={{ fontSize: 30, color: scrolled ? 'black' : 'white' }} />
          </IconButton>

          <Menu
            id="account-menu"
            anchorEl={accountMenuAnchor}
            open={Boolean(accountMenuAnchor)}
            onClose={handleAccountClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            {user
              ? [
                <MenuItem key="email" disabled>{user.email}</MenuItem>,
                <Divider key="divider" />,
                <MenuItem key="dashboard" onClick={handleDashboard}>Dashboard</MenuItem>,
                <MenuItem key="profile" onClick={() => { handleAccountClose(); navigate('/profile'); }}>Manage Profile</MenuItem>,
                <MenuItem key="settings" onClick={() => { handleAccountClose(); navigate('/settings'); }}>Settings</MenuItem>,
                <MenuItem key="logout" onClick={handleLogout}>Logout</MenuItem>,
              ]
              : [
                <MenuItem key="login" onClick={handleLogin}>Login</MenuItem>,
                <MenuItem key="signup" onClick={handleSignup}>Sign Up</MenuItem>,
              ]}
          </Menu>

          <IconButton aria-label="Main menu" onClick={handleHamburgerClick} className="md:hidden">
            <MenuIcon sx={{ fontSize: 30, color: scrolled ? 'black' : 'white' }} />
          </IconButton>
        </Box>
      </Box>

      <AnimatePresence>
        <Drawer
          anchor="right"
          open={hamburgerOpen}
          onClose={handleCloseHamburger}
          sx={{
            '& .MuiDrawer-paper': {
              width: '100%',
              maxWidth: '400px',
              backgroundColor: 'black',
              color: 'white',
            },
          }}
        >
          <Box className="p-4 h-full flex flex-col">
            <Box className="flex justify-end">
              <IconButton onClick={handleCloseHamburger} aria-label="Close menu">
                <CloseIcon sx={{ color: 'white' }} />
              </IconButton>
            </Box>

            <form onSubmit={handleSearch} className="px-4 mb-6">
              <Box className="flex items-center bg-gray-800 rounded-lg px-4 py-2">
                <SearchIcon className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="ml-2 w-full bg-transparent outline-none text-white placeholder-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search products"
                />
              </Box>
            </form>

            <List className="space-y-2">
              {navLinks.map((link) => (
                <ListItem key={link.title} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      navigate(link.path);
                      handleCloseHamburger();
                    }}
                    selected={location.pathname === link.path}
                    sx={{
                      backgroundColor: location.pathname === link.path ? 'rgba(255,255,255,0.1)' : 'transparent',
                      borderRadius: '4px',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.05)',
                      },
                    }}
                  >
                    <ListItemText
                      primary={link.title}
                      primaryTypographyProps={{
                        style: {
                          fontSize: '1.25rem',
                          fontWeight: location.pathname === link.path ? 'bold' : 'normal',
                          color: 'white',
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}

              <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 2 }} />

              {user ? (
                <>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        handleDashboard();
                        handleCloseHamburger();
                      }}
                    >
                      <ListItemText primary="Dashboard" primaryTypographyProps={{ style: { color: 'white' } }} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        handleLogout();
                        handleCloseHamburger();
                      }}
                    >
                      <ListItemText primary="Logout" primaryTypographyProps={{ style: { color: 'white' } }} />
                    </ListItemButton>
                  </ListItem>
                </>
              ) : (
                <>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate('/login');
                        handleCloseHamburger();
                      }}
                    >
                      <ListItemText primary="Login" primaryTypographyProps={{ style: { color: 'white' } }} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate('/signup');
                        handleCloseHamburger();
                      }}
                    >
                      <ListItemText primary="Sign Up" primaryTypographyProps={{ style: { color: 'white' } }} />
                    </ListItemButton>
                  </ListItem>
                </>
              )}
            </List>
          </Box>
        </Drawer>
      </AnimatePresence>

      <Drawer
        anchor="right"
        open={cartOpen}
        onClose={toggleCart}
        sx={{
          '& .MuiDrawer-paper': {
            width: '100%',
            maxWidth: '400px',
            backgroundColor: 'white',
            color: 'black',
          },
        }}
      >
        <Box className="p-4 h-full flex flex-col">
          <Box className="flex justify-end">
            <IconButton onClick={toggleCart} aria-label="Close cart">
              <CloseIcon sx={{ color: 'black' }} />
            </IconButton>
          </Box>
          <Typography variant="h6">Shopping Cart</Typography>
          {cartItems.length === 0 ? (
            <Typography>Your cart is empty.</Typography>
          ) : (
            <>
              {cartItems.map((item) => (
                <Box key={item.id} className="flex items-center my-4">
                  <img
                    src={item.image}
                    alt={item.title || item.name}
                    style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 8, marginRight: 16 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {item.title || item.name}
                    </Typography>
                    {item.artist && (
                      <Typography variant="body2" color="text.secondary">
                        by {item.artist}
                      </Typography>
                    )}
                    {item.selectedOptions && (
                      <Typography variant="body2" color="text.secondary">
                        {Object.values(item.selectedOptions).join(' / ')}
                      </Typography>
                    )}
                    <Typography variant="body2" color="text.secondary">
                      ${item.price} x {item.quantity} = <b>${(item.price * item.quantity).toFixed(2)}</b>
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.id, item.selectedOptions || {}, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >-</IconButton>
                      <Typography variant="body2" sx={{ mx: 1 }}>{item.quantity}</Typography>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.id, item.selectedOptions || {}, item.quantity + 1)}
                      >+</IconButton>
                      <IconButton
                        size="small"
                        onClick={() => removeFromCart(item.id, item.selectedOptions || {})}
                        sx={{ ml: 2 }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              ))}
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" fontWeight="bold">
                Subtotal: ${total}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <button
                  className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                  onClick={() => {
                    setCartOpen(false);
                    navigate('/checkout');
                  }}
                >
                  Checkout
                </button>
                <button
                  className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
                  onClick={() => {
                    setCartOpen(false);
                  }}
                >
                  Continue Shopping
                </button>
              </Box>
            </>
          )}
        </Box>
      </Drawer>
    </Box>
  );
};

export default Navbar;