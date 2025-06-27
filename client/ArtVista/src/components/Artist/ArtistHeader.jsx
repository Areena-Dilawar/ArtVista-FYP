import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, Badge, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
const ArtistHeader = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout } = useAuth();
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };
  return (
    <div className="bg-black p-4 shadow-md">
      <div className="flex justify-between items-center">
        <motion.h1 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-2xl font-bold"
        >
          Artist Dashboard
        </motion.h1>
        
        <div className="flex items-center space-x-4">
          <Tooltip title="Notifications">
            <IconButton color="inherit">
              <Badge badgeContent={2} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          
          <div className="flex items-center">
            <Avatar 
              src={user?.avatar || "https://images.pexels.com/photos/3228339/pexels-photo-3228339.jpeg"} 
              alt={user?.name || 'Artist'}
              className="cursor-pointer"
              onClick={handleMenuClick}
            />
            <IconButton size="small" onClick={handleMenuClick} color="inherit">
              <ChevronDown size={16} />
            </IconButton>
            
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistHeader;