import React from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingBag, Heart, ShoppingCart, User, Settings, Home, Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';

const CustomerSidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: <Home size={18} /> },
    { id: 'orders', label: 'My Orders', icon: <ShoppingBag size={18} /> },
    { id: 'wishlist', label: 'Wishlist', icon: <Heart size={18} /> },
    { id: 'cart', label: 'Cart', icon: <ShoppingCart size={18} /> }, // ✅ Replaced "Purchased Art" with "Cart"
    { id: 'profile', label: 'My Profile', icon: <User size={18} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <motion.div
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.15 }}
      className="w-64 bg-gray-900 border-r border-gray-800 h-[calc(100vh-64px)] p-5"
    >
      {/* Navigation */}
      <nav className="space-y-2 mb-8">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors 
              ${
                activeTab === item.id
                  ? 'bg-green-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Events */}
      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <h3 className="text-sm font-semibold mb-2 text-white">Upcoming Events</h3>
        <p className="text-gray-400 text-xs mb-3">
          Explore virtual exhibitions and artist workshops.
        </p>
        <Link to="/events">
          <button className="w-full flex items-center justify-center bg-white text-black text-xs font-semibold py-2 rounded hover:bg-gray-200 transition">
            <Calendar size={14} className="mr-2" />
            View Events
          </button>
        </Link>
      </div>

      {/* Support */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-sm font-semibold mb-2 text-white">Need Help?</h3>
        <p className="text-gray-400 text-xs mb-3">
          Have questions or need assistance with your purchases?
        </p>
        <Link to="/contact">
          <button className="w-full bg-gray-700 text-white text-xs font-semibold py-2 rounded hover:bg-gray-600 transition">
            Contact Support
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default CustomerSidebar;