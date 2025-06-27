import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, ShoppingBag, Image, Settings, DollarSign, Home, ChevronDown } from 'lucide-react';
import { Avatar, Badge, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useAuth } from '../context/AuthContext';

// Admin Pages
import Overview from '../components/Admin/Overview';
import UsersManagement from '../components/Admin/UsersManagement';
import ArtworksManagement from '../components/Admin/ArtworksManagement';
import OrdersManagement from '../components/Admin/OrdersManagement';
import Reports from '../components/Admin/Reports';
import SettingsPage from '../components/Admin/SettingsPage';
import AdminProfile from '../components/Admin/AdminProfile';

function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate('/login');
  };
  const toggleNotifications = () => setShowNotifications(!showNotifications);

  const pathSegments = location.pathname.split('/').filter(Boolean);
  const activeTab = pathSegments.includes('admin-dashboard') ? pathSegments[pathSegments.length - 1] : 'overview';

  const navItems = [
    { id: 'overview', label: 'Overview', icon: <Home size={20} />, path: '/admin-dashboard/overview' },
    { id: 'users', label: 'Users', icon: <Users size={20} />, path: '/admin-dashboard/users' },
    { id: 'artworks', label: 'Artworks', icon: <Image size={20} />, path: '/admin-dashboard/artworks' },
    { id: 'orders', label: 'Orders', icon: <ShoppingBag size={20} />, path: '/admin-dashboard/orders' },
    { id: 'reports', label: 'Reports', icon: <DollarSign size={20} />, path: '/admin-dashboard/reports' },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} />, path: '/admin-dashboard/settings' },
  ];

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Header */}
      <div className="bg-black text-white p-4 shadow-md">
        <div className="flex justify-between items-center">
          <motion.h1
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-2xl font-bold"
          >
            ArtVista Admin
          </motion.h1>
          <div className="flex items-center space-x-4">
            <Tooltip title="Notifications">
              <IconButton onClick={toggleNotifications}>
                <Badge badgeContent={4} color="error">
                  <NotificationsIcon className="text-white" />
                </Badge>
              </IconButton>
            </Tooltip>
            {showNotifications && (
              <div className="absolute right-20 top-16 w-64 bg-white text-black border border-gray-300 rounded shadow z-20">
                <div className="p-2 border-b">🖼️ New artwork uploaded</div>
                <div className="p-2 border-b">📦 Order placed</div>
                <div className="p-2">👤 New user registered</div>
              </div>
            )}
            <div className="relative flex items-center">
              <Avatar
                src={user?.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'}
                alt={user?.name || 'Admin'}
                onClick={handleMenuClick}
                className="cursor-pointer"
              />
              <IconButton size="small" onClick={handleMenuClick}>
                <ChevronDown size={16} className="text-white" />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={() => navigate('/admin-dashboard/profile')}>Profile</MenuItem>
                <MenuItem onClick={() => navigate('/admin-dashboard/settings')}>Settings</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar + Routes */}
      <div className="flex">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-64 bg-[#f5f5f5] text-black border-r border-gray-300 h-[calc(100vh-64px)] p-4 sticky top-0"
        >
          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition duration-200 ${
                  activeTab === item.id
                    ? 'bg-black text-white font-semibold shadow-md'
                    : 'hover:bg-gray-200'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </motion.div>

        <div className="flex-1 p-6 bg-white min-h-screen">
          <Routes>
            <Route index element={<Overview />} />
            <Route path="overview" element={<Overview />} />
            <Route path="users" element={<UsersManagement />} />
            <Route path="artworks" element={<ArtworksManagement />} />
            <Route path="orders" element={<OrdersManagement />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="profile" element={<AdminProfile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;