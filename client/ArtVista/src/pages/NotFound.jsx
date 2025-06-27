import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-8xl font-bold text-white mb-4">404</h1>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="h-1 w-24 bg-white/30 mx-auto mb-8"></div>
        
        <h2 className="text-3xl font-serif font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-gray-400 max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 mx-auto transition-colors"
          >
            <Home size={18} />
            <span>Return Home</span>
          </motion.button>
        </Link>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute w-full max-w-lg h-64 rounded-full bg-white/5 blur-3xl -z-10"
      ></motion.div>
    </div>
  );
}

export default NotFound;