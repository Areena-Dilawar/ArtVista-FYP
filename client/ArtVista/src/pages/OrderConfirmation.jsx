import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  useEffect(() => {
    if (!state || !state.order) {
      navigate('/');
    }
  }, [state, navigate]);

  if (!state || !state.order) return null;

  const { order } = state;

  return (
    <div className="min-h-screen bg-gray-900 text-white py-16 px-6">
      <div className="max-w-4xl mx-auto bg-gray-800/50 p-8 rounded-lg border border-gray-700">
        <h1 className="text-3xl font-bold text-green-400 mb-4">Order Placed Successfully!</h1>
        <p className="text-lg text-gray-300 mb-2">Thank you for your purchase.</p>
        <p className="text-md text-gray-400 mb-4">
          A confirmation email has been sent to{' '}
          <span className="text-white font-medium">{order.shippingAddress?.email}</span>
        </p>
        <p className="text-md text-gray-400 mb-4">
          <strong>Order ID:</strong> <span className="text-white">{order._id}</span>
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-4">Order Summary</h2>
        <div className="space-y-4">
          {order.items.map((item, index) => (
            <div key={index} className="flex items-start justify-between bg-gray-700/40 p-4 rounded-lg">
              <div className="flex items-start space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="text-white font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 mt-6 pt-4">
          <p className="text-lg font-semibold text-white flex justify-between">
            <span>Total Paid:</span>
            <span>${order.totalPrice.toFixed(2)}</span>
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-block bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;