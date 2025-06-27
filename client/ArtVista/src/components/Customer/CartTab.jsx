import React from 'react';
import { useCart } from '../../context/CartContext';
import { Trash2 } from 'lucide-react';

const CartTab = () => {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-white">My Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-400">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-gray-800 rounded-lg overflow-hidden shadow group">
              <div className="relative h-40">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold text-sm mb-2">{item.title}</h3>
                <p className="text-green-400 font-bold mb-2">${item.price}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="flex items-center text-red-400 text-xs hover:text-red-600 transition"
                >
                  <Trash2 size={14} className="mr-1" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartTab;
