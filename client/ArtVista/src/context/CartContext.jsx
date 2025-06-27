import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [shippingOption, setShippingOption] = useState('standard');
  const [coupon, setCoupon] = useState(null);
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart data:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (item) => {
    setCartItems(prevItems => {
      // Check if item already exists
      const existingItemIndex = prevItems.findIndex(i => 
        i.id === item.id && 
        JSON.stringify(i.selectedOptions) === JSON.stringify(item.selectedOptions)
      );
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + (item.quantity || 1)
        };
        return updatedItems;
      } else {
        // Add new item with default quantity 1 if not specified
        return [...prevItems, { ...item, quantity: item.quantity || 1 }];
      }
    });
    
    toast.success('Added to cart');
  };

  // Remove item from cart
  const removeFromCart = (itemId, options = {}) => {
    setCartItems(prevItems => 
      prevItems.filter(i => {
        if (i.id !== itemId) return true;
        if (options && Object.keys(options).length > 0) {
          return JSON.stringify(i.selectedOptions) !== JSON.stringify(options);
        }
        return false;
      })
    );
    
    toast.success('Removed from cart');
  };

  // Update quantity
  const updateQuantity = (itemId, options = {}, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(i => {
        if (i.id === itemId && JSON.stringify(i.selectedOptions) === JSON.stringify(options)) {
          return { ...i, quantity: newQuantity };
        }
        return i;
      })
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    setCoupon(null);
    localStorage.removeItem('cart');
  };

  // Apply coupon
  const applyCoupon = (code) => {
    // Example coupons
    const availableCoupons = [
      { code: 'ARTLOVE10', discount: 0.1, type: 'percent' },
      { code: 'FREESHIP', discount: 1, type: 'shipping' }
    ];
    
    const foundCoupon = availableCoupons.find(c => c.code === code);
    
    if (foundCoupon) {
      setCoupon(foundCoupon);
      return true;
    }
    
    return false;
  };

  // Remove coupon
  const removeCoupon = () => {
    setCoupon(null);
  };

  // Calculate shipping cost
  const shippingCost = (() => {
    if (coupon?.type === 'shipping') return 0;
    
    if (shippingOption === 'express') {
      return 15.99;
    } else if (shippingOption === 'standard') {
      return 5.99;
    } else {
      return 0;
    }
  })();

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + (item.price * item.quantity), 0
  );

  // Calculate discount
  const discount = coupon?.type === 'percent' 
    ? subtotal * coupon.discount 
    : 0;

  // Calculate total
  const total = subtotal - discount + shippingCost;

  // Count total items
  const itemCount = cartItems.reduce(
    (count, item) => count + item.quantity, 0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        shippingOption,
        setShippingOption,
        shippingCost,
        coupon,
        applyCoupon,
        removeCoupon,
        subtotal,
        discount,
        total,
        itemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}