import React from 'react';
import { motion } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import Navbar from '../components//Navbar';
import Footer from '../components/Footer';
import { ShoppingCart, Trash2, Heart } from 'lucide-react';

function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const isEmpty = wishlistItems.length === 0;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-16 mt-16">
        {isEmpty ? (
          <div className="text-center">
            <Heart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
            <p className="text-gray-400 mb-8">Browse our categories and add items to your wishlist</p>
            <Link to="/">
              <button className="px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors">
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          <>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-serif font-bold mb-8"
            >
              My Wishlist
            </motion.h1>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 },
                },
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {wishlistItems.map((item) => (
                <motion.div
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="bg-gray-900/50 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10"
                >
                  <div className="h-48 sm:h-64 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">By {item.artist}</p>
                    <p className="text-white mb-4">${item.price}</p>

                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addToCart(item)}
                        className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
                      >
                        <ShoppingCart size={16} />
                        <span>Add to Cart</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => removeFromWishlist(item.id)}
                        className="p-2 bg-red-500/10 text-red-500 rounded-full hover:bg-red-500/20 transition-colors"
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default WishlistPage;
