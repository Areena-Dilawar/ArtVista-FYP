import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, Badge, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CustomerHeader = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleMenuClose();
    logout();
    // navigate('/');
  };

  return (
    <div className="bg-black p-4 shadow-md">
      <div className="flex justify-between items-center">
        <motion.h1
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-2xl font-bold"
        >
          Customer Dashboard
        </motion.h1>

        <div className="flex items-center space-x-4">
          <Tooltip title="Notifications">
            <IconButton color="inherit">
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          
          <div className="flex items-center">
            <Avatar 
              src={user?.avatar || "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"} 
              alt={user?.name || 'Customer'}
              className="cursor-pointer"
              onClick={handleMenuClick}
            />
            <IconButton size="small" onClick={handleMenuClick} color="inherit">
              <ChevronDown size={16} />
            </IconButton>
            
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={() => {
                handleMenuClose();
                navigate('/become-seller');
              }}>Become a Seller</MenuItem>
              <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerHeader;