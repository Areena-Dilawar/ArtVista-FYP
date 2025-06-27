import React from 'react';
import { useCart } from '../context/CartContext';

export function ShippingOptions() {
  const { shippingOption, setShippingOption, shippingCost } = useCart();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white">Shipping Method</h3>
      <div className="space-y-2">
        <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-800/50">
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              name="shipping"
              checked={shippingOption === 'standard'}
              onChange={() => setShippingOption('standard')}
              className="h-4 w-4 text-white border-gray-300 focus:ring-white"
            />
            <div>
              <p className="text-white">Standard Shipping</p>
              <p className="text-gray-400 text-sm">3-5 business days</p>
            </div>
          </div>
          <span className="text-white">${shippingOption === 'standard' ? shippingCost.toFixed(2) : '5.99'}</span>
        </label>

        <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-800/50">
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              name="shipping"
              checked={shippingOption === 'express'}
              onChange={() => setShippingOption('express')}
              className="h-4 w-4 text-white border-gray-300 focus:ring-white"
            />
            <div>
              <p className="text-white">Express Shipping</p>
              <p className="text-gray-400 text-sm">1-2 business days</p>
            </div>
          </div>
          <span className="text-white">${shippingOption === 'express' ? shippingCost.toFixed(2) : '15.99'}</span>
        </label>
      </div>
    </div>
  );
}