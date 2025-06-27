import React from 'react';
import { motion } from 'framer-motion';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { ShoppingCart, Trash2, Heart } from 'lucide-react';

const WishlistTab = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-xl font-bold mb-6">My Wishlist</h2>
      
      {wishlistItems.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-12 text-center">
          <Heart className="h-16 w-16 mx-auto text-gray-600 mb-4" />
          <h3 className="text-xl font-medium mb-2">Your Wishlist is Empty</h3>
          <p className="text-gray-400 mb-6">Browse our shop and add items you love to your wishlist.</p>
          <button 
            onClick={() => window.location.href = '/category/Painting'}
            className="px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
          >
            Browse Shop
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-colors"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title || item.name} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-4">
                <h3 className="font-medium text-lg mb-1">{item.title || item.name}</h3>
                <p className="text-gray-400 text-sm mb-3">
                  {item.artist && `By ${item.artist}`}
                </p>
                <p className="text-xl font-bold mb-4">${item.price}</p>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => addToCart(item)}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <ShoppingCart size={16} />
                    <span>Add to Cart</span>
                  </button>
                  
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                    title="Remove from wishlist"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default WishlistTab;