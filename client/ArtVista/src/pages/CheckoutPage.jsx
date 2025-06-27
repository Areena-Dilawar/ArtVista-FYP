import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShippingOptions } from '../components/ShippingOptions';
import { CouponInput } from '../components/CouponInput';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function CheckoutPage() {
  const { cartItems, subtotal, discount, shippingCost, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    paymentMethod: 'COD',
  });

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const simplifiedItems = cartItems.map(item => {
        return {
          name: item.title || '', // fallback just in case
          image: item.image || '',
          quantity: item.quantity || 1,
          price: item.price || 0,
        };
      });

      console.log('📦 Items to send:', simplifiedItems);

      const orderData = {
        items: simplifiedItems,
        total,
        shippingAddress: formData,
        paymentMethod: 'COD',
      };

      console.log('🚀 Sending Order:', orderData);

      const token = localStorage.getItem('token');

      const response = await axios.post(
        'http://localhost:5000/api/orders',
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('Order placed successfully!');

      navigate('/order-confirmation', {
        state: {
          order: response.data.order,
        },
      });


      setTimeout(() => {
        clearCart();
      }, 300);
    } catch (error) {
      console.error('❌ Order placement failed:', error.response?.data || error.message);
      toast.error('Order failed. Please try again.');
    }
  };


  if (cartItems.length === 0) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Shipping & Payment */}
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium mb-1">Street Address</label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium mb-1">City</label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium mb-1">Country</label>
                  <select
                    id="country"
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md"
                  >
                    <option value="">Select</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium mb-1">ZIP/Postal Code</label>
                  <input
                    id="zipCode"
                    name="zipCode"
                    type="text"
                    required
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md"
                  />
                </div>
              </div>

              <ShippingOptions />

              {/* Only COD option */}
              <div className="pt-4">
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                <div className="p-4 border border-gray-700 rounded-lg bg-gray-900/40">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash-on-delivery"
                    checked={formData.paymentMethod === 'cash-on-delivery'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="cash-on-delivery" className="text-white">Cash on Delivery</label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-colors mt-6"
              >
                Place Order - ${total.toFixed(2)}
              </button>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 h-fit sticky top-4">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {cartItems.map(item => (
                <div key={`${item.id}-${JSON.stringify(item.selectedOptions)}`} className="flex items-start space-x-4">
                  <div className="w-20 h-20 bg-gray-700 rounded-md overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium">{item.title}</h3>
                    {item.variant && (
                      <p className="text-sm text-gray-400">{Object.values(item.selectedOptions).join(' / ')}</p>
                    )}
                    <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                  </div>

                  <div className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <CouponInput />

            <div className="space-y-3 mt-6">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-gray-400">
                <span>Discount</span>
                <span className="text-green-400">-${discount.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-lg font-semibold pt-3 border-t border-gray-700 mt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
