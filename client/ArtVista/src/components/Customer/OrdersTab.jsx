import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const OrdersTab = () => {
  const { user,token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    console.log("come")
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/orders/my-orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Orders API response:', res);
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error('Error fetching orders:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchOrders();
    else setLoading(false);
  }, [user]);

  if (loading) return <p className="text-white">Loading...</p>;

  if (!orders.length)
    return (
      <div className="bg-gray-800 rounded-lg p-12 text-center">
        <h3 className="text-xl font-medium mb-2 text-white">No Orders Yet</h3>
        <p className="text-gray-400 mb-6">You haven't placed any orders yet.</p>
      </div>
    );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 className="text-xl font-bold mb-4 text-white">My Orders</h2>

      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-full text-white text-sm bg-gray-800">
          <thead>
            <tr className="bg-gray-700 text-left">
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <React.Fragment key={order._id}>
                <tr className="border-b border-gray-700">
                  <td className="px-4 py-3">{order._id}</td>
                  <td className="px-4 py-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-green-400">{order.status}</td>
                  <td className="px-4 py-3">${order.totalPrice.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <button
                      className="text-blue-400 hover:underline"
                      onClick={() =>
                        setExpandedOrder(expandedOrder === order._id ? null : order._id)
                      }
                    >
                      {expandedOrder === order._id ? 'Hide' : 'View'}
                    </button>
                  </td>
                </tr>

                {expandedOrder === order._id && (
                  <tr className="bg-gray-900 border-b border-gray-700">
                    <td colSpan="5" className="px-4 py-4">
                      <div className="space-y-4">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center">
                            <img
                              src={item.productId?.image || item.image}
                              alt={item.productId?.name || item.name}
                              className="w-12 h-12 rounded object-cover mr-4"
                            />
                            <div>
                              <p>{item.productId?.name || item.name}</p>
                              <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                            </div>
                            <p className="ml-auto">${(item.productId?.price || item.price).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default OrdersTab;
