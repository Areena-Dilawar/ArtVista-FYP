import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export function CouponInput() {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const { coupon, applyCoupon, removeCoupon } = useCart();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (coupon) {
      removeCoupon();
      setMessage('Coupon removed');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    if (applyCoupon(code)) {
      setMessage('Coupon applied successfully!');
      setCode('');
    } else {
      setMessage('Invalid coupon code');
    }
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="Enter coupon code"
          disabled={!!coupon}
          className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white/20"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition-colors"
        >
          {coupon ? 'Remove' : 'Apply'}
        </button>
      </form>
      {message && (
        <p className={`mt-2 text-sm ${
          message.includes('Invalid') ? 'text-red-400' : 'text-green-400'
        }`}>
          {message}
        </p>
      )}
      {coupon && (
        <p className="mt-2 text-sm text-green-400">
          {coupon.type === 'percent'
            ? `${coupon.discount * 100}% discount applied`
            : 'Free shipping applied'}
        </p>
      )}
    </div>
  );
}