import React from 'react';
import { motion } from 'framer-motion';
import { 
  Image, Upload, DollarSign, TrendingUp, Settings, 
  Home, Percent 
} from 'lucide-react';
import { LinearProgress } from '@mui/material';

const ArtistSidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: <Home size={20} /> },
    { id: 'my-artwork', label: 'My Art', icon: <Image size={20} /> },
    // { id: 'artworks', label: 'My Artworks', icon: <Image size={20} /> },
    { id: 'upload', label: 'Upload Artwork', icon: <Upload size={20} /> },
    { id: 'earnings', label: 'Earnings', icon: <DollarSign size={20} /> },
    // { id: 'analytics', label: 'Analytics', icon: <TrendingUp size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <motion.div 
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="w-64 bg-gray-900 border-r border-gray-800 h-[calc(100vh-64px)] p-4"
    >
      <nav className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              activeTab === item.id ? 'bg-purple-600' : 'hover:bg-gray-800'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="mt-8 bg-gray-800 p-4 rounded-lg">
        <h3 className="font-medium text-sm text-gray-300 mb-3">Completion Status</h3>
        <div className="space-y-4">
          <ProgressItem label="Profile" value={80} />
          <ProgressItem label="Portfolio" value={60} />
          <ProgressItem label="Verification" value={100} />
        </div>
      </div>
    </motion.div>
  );
};

const ProgressItem = ({ label, value }) => (
  <div>
    <div className="flex justify-between text-xs mb-1">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <LinearProgress 
      variant="determinate" 
      value={value} 
      className="h-1.5 rounded-full" 
      color="secondary" 
    />
  </div>
);

export default ArtistSidebar;