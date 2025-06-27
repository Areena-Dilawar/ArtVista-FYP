import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Star, ShoppingCart, ChevronLeft, Heart, Truck, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function ProductModal({ product, onClose }) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [productInWishlist, setProductInWishlist] = useState(false);

  // Check if product is in wishlist
  useEffect(() => {
    setProductInWishlist(isInWishlist(product.id));
  }, [isInWishlist, product.id]);

  const variants = product.variants || [{ id: product.id, name: 'Default', price: product.price }];

  const shippingOptions = [
    { id: 'standard', name: 'Standard Shipping', price: 4.99, days: '3-5' },
    { id: 'express', name: 'Express Shipping', price: 9.99, days: '1-2' },
    { id: 'free', name: 'Free Shipping', price: 0, days: '5-7' }
  ];

  const availableCoupons = [
    { code: 'ARTLOVE10', discount: 10, type: 'percent' },
    { code: 'WELCOME20', discount: 20, type: 'fixed' }
  ];

  const handleWishlistToggle = () => {
    if (!user) {
      navigate('/login', { state: { from: `/products/${product.id}` } });
      toast('Please login to manage your wishlist', { icon: '🔒' });
      return;
    }

    if (productInWishlist) {
      removeFromWishlist(product.id);
      setProductInWishlist(false);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      setProductInWishlist(true);
      toast.success('Added to wishlist!');
    }
  };

  const applyCoupon = () => {
    const coupon = availableCoupons.find(c => c.code === couponCode.toUpperCase());
    if (coupon) {
      setAppliedCoupon(coupon);
      toast.success(`Coupon applied! ${coupon.type === 'percent' ? `${coupon.discount}% off` : `$${coupon.discount} off`}`);
    } else {
      toast.error('Invalid coupon code');
    }
  };

  const calculatePrice = () => {
    const basePrice = selectedVariant?.price || product.price;
    let discount = 0;

    if (appliedCoupon) {
      discount = appliedCoupon.type === 'percent' 
        ? (basePrice * appliedCoupon.discount / 100)
        : appliedCoupon.discount;
    }

    const shippingCost = selectedShipping?.price || 0;
    const subtotal = (basePrice - discount) * quantity;

    return {
      subtotal,
      shipping: shippingCost,
      total: subtotal + shippingCost,
      discount
    };
  };

  const { subtotal, shipping, total, discount } = calculatePrice();

  const handleBuyNow = () => {
    if (!user) {
      navigate('/login', { state: { from: '/checkout' } });
      onClose();
      return;
    }

    const itemToAdd = {
      ...product,
      variant: selectedVariant,
      selectedOptions: selectedVariant ? { variant: selectedVariant.name } : {},
      quantity,
      price: selectedVariant?.price || product.price
    };

    addToCart(itemToAdd);
    onClose();
    navigate('/checkout');
  };

  const handleAddToCart = () => {
    const itemToAdd = {
      ...product,
      variant: selectedVariant,
      selectedOptions: selectedVariant ? { variant: selectedVariant.name } : {},
      quantity,
      price: selectedVariant?.price || product.price
    };

    addToCart(itemToAdd);
    toast.success(`${product.title || product.name} ${selectedVariant?.name ? `(${selectedVariant.name})` : ''} added to cart!`, {
      position: 'bottom-center',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
        className="bg-gray-900 max-w-4xl w-full rounded-lg overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative h-96">
            <img
              src={selectedVariant?.image || product.image}
              alt={product.title || product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={handleWishlistToggle}
                className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
              >
                <Heart
                  className="h-5 w-5"
                  fill={productInWishlist ? 'currentColor' : 'none'}
                  color={productInWishlist ? '#ef4444' : '#fff'}
                />
              </button>
              <button
                onClick={onClose}
                className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div className="p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{product.title || product.name}</h2>
              <p className="text-gray-400">{product.artist}</p>
            </div>

            <div className="flex items-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < 4 ? 'text-yellow-500' : 'text-gray-500'}`}
                  fill={i < 4 ? 'currentColor' : 'none'}
                />
              ))}
              <span className="text-gray-400">(4.0)</span>
            </div>

            <p className="text-gray-300">{product.description}</p>

            {/* Variants Selection */}
            {variants.length > 1 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-300">Options:</h4>
                <div className="flex flex-wrap gap-2">
                  {variants.map(variant => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-3 py-1 text-sm rounded-full border ${
                        selectedVariant?.id === variant.id
                          ? 'border-white bg-white/10 text-white'
                          : 'border-gray-600 text-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center justify-between pt-2">
              <div className="text-2xl font-bold text-white">
                ${selectedVariant?.price || product.price}
                {discount > 0 && (
                  <span className="ml-2 text-sm text-green-400 line-through">
                    ${(selectedVariant?.price || product.price) + discount}
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-1 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                  disabled={quantity <= 1}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="text-white font-medium w-6 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => Math.min(10, q + 1))}
                  className="p-1 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                  disabled={quantity >= 10}
                >
                  <ChevronLeft className="h-5 w-5 transform rotate-180" />
                </button>
              </div>
            </div>

            {/* Coupon Code */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Tag className="h-4 w-4 text-gray-400" />
                <h4 className="text-sm font-medium text-gray-300">Coupon Code</h4>
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent text-sm"
                />
                <button
                  onClick={applyCoupon}
                  disabled={!couponCode}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-md text-sm"
                >
                  Apply
                </button>
              </div>
              {appliedCoupon && (
                <div className="text-green-400 text-sm">
                  {appliedCoupon.type === 'percent' 
                    ? `${appliedCoupon.discount}% off applied`
                    : `$${appliedCoupon.discount} off applied`}
                </div>
              )}
            </div>

            {/* Shipping Options */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Truck className="h-4 w-4 text-gray-400" />
                <h4 className="text-sm font-medium text-gray-300">Shipping Options</h4>
              </div>
              <div className="space-y-2">
                {shippingOptions.map(option => (
                  <div 
                    key={option.id}
                    onClick={() => setSelectedShipping(option)}
                    className={`p-3 border rounded-md cursor-pointer ${
                      selectedShipping?.id === option.id
                        ? 'border-white bg-white/5'
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex justify-between">
                      <span className="text-white">{option.name}</span>
                      <span className="text-gray-300">
                        {option.price > 0 ? `$${option.price}` : 'Free'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Estimated delivery: {option.days} business days
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Summary */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-300">
                <span>Shipping</span>
                <span>{shipping > 0 ? `$${shipping.toFixed(2)}` : 'Free'}</span>
              </div>
              <div className="border-t border-gray-700 my-2"></div>
              <div className="flex justify-between text-white font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 pt-4">
              <button
                onClick={handleBuyNow}
                className="w-full py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors font-medium flex items-center justify-center"
              >
                Buy Now · ${total.toFixed(2)}
              </button>
              
              <button
                onClick={handleAddToCart}
                className="w-full py-3 border border-white text-white rounded-full hover:bg-white/10 transition-colors flex items-center justify-center space-x-2 font-medium"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-3 text-gray-400 hover:text-white transition-colors text-sm"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ProductModal;