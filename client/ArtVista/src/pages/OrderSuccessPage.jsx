import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, Home } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-16 h-16 mx-auto mb-6 text-green-500"
        >
          <CheckCircle className="w-full h-full" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-serif font-bold mb-4"
        >
          Order Placed Successfully!
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-400 mb-8"
        >
          Thank you for your order. We'll contact you shortly to confirm the delivery details.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 mx-auto"
            >
              <Home size={18} />
              <span>Back to Home</span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}

export default OrderSuccessPage;