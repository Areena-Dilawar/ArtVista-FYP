import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Download, ExternalLink, Calendar, Gift } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const OverviewTab = ({ setActiveTab }) => {
  const { wishlistItems } = useWishlist();
  const { cartItems } = useCart();
  const { user, setUser, token } = useAuth();

  const [recentOrders, setRecentOrders] = useState([]);
  const [purchasedCount, setPurchasedCount] = useState(0);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
console.log("user",user)
      try {
        // Fetch orders
        if (token) {
          try {
            const ordersRes = await axios.get('http://localhost:5000/api/orders/my-orders', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            console.log('Orders Response:', ordersRes.data);
            const orders = ordersRes.data.orders || [];
            console.log("ordersRes", ordersRes)
            setRecentOrders(orders);
            const delivered = orders.filter(order => order.status === 'delivered');
            setPurchasedCount(delivered.length);
          } catch (err) {
            console.error('Orders Fetch Error:', err.response?.data || err.message);
            setRecentOrders([]);
            setPurchasedCount(0);
          }
        } else {
          console.warn('No user token found, skipping orders fetch');
          setRecentOrders([]);
          setPurchasedCount(0);
        }

        // Fetch recommended products
        try {
          const productsRes = await axios.get('http://localhost:5000/api/products/recommended');
          console.log('Products Response:', productsRes.data);
          setRecommendedProducts(productsRes.data.products || productsRes.data || []);
        } catch (err) {
          console.error('Products Fetch Error:', err.response?.data || err.message);
          setRecommendedProducts([]);
        }

        // Fetch upcoming events
        try {
          const eventsRes = await axios.get('http://localhost:5000/api/events/upcoming');
          console.log('Events Response:', eventsRes.data);
          setUpcomingEvents(eventsRes.data.events || eventsRes.data || []);
        } catch (err) {
          console.error('Events Fetch Error:', err.response?.data || err.message);
          setUpcomingEvents([]);
        }
      } catch (err) {
        setError('An unexpected error occurred. Please try again later.');
        console.error('Unexpected Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    console.log('recentOrders',recentOrders)
  }, [token]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (loading) {
    return <div className="text-center text-gray-400 py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-400 py-10">{error}</div>;
  }

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name || 'Art Enthusiast'}!</h1>
        <p className="text-gray-300">Here's what's happening with your ARTVISTA account today.</p>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<ShoppingBag className="h-6 w-6 text-blue-400" />} title="Orders" value={recentOrders.length} bgColor="bg-blue-900/20" borderColor="border-blue-500/30" onClick={() => setActiveTab('orders')} />
        <StatCard icon={<Heart className="h-6 w-6 text-red-400" />} title="Wishlist" value={wishlistItems.length} bgColor="bg-red-900/20" borderColor="border-red-500/30" onClick={() => setActiveTab('wishlist')} />
        {/* <StatCard icon={<Download className="h-6 w-6 text-green-400" />} title="Purchased" value={purchasedCount} bgColor="bg-green-900/20" borderColor="border-green-500/30" onClick={() => setActiveTab('purchased')} /> */}
        <StatCard icon={<ShoppingBag className="h-6 w-6 text-purple-400" />} title="Cart Items" value={cartItems.length} bgColor="bg-purple-900/20" borderColor="border-purple-500/30" onClick={()=>setActiveTab('cart')} />
      </motion.div>

      {/* Recent Orders */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
          <button onClick={() => setActiveTab('orders')} className="text-blue-400 text-sm flex items-center">
            View All <ExternalLink className="h-3 w-3 ml-1" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-400 uppercase bg-gray-700">
              <tr>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length > 0 ? recentOrders.map(order => (
                <tr key={order._id} className="bg-gray-800 border-b border-gray-700">
                  <td className="px-4 py-3">{order._id.slice(0, 8)}...</td>
                  <td className="px-4 py-3">{new Date(order.createdAt).toDateString()}</td>
                  <td className="px-4 py-3">
                    {order.items?.length > 0 ? (
                      <ul className="list-disc list-inside">
                        {order.items.map((item, index) => (
                          <li key={index} className="text-gray-300">
                            {item.name || 'Unknown Product'} (Qty: {item.quantity})
                          </li>
                        ))}
                      </ul>
                    ) : (
                      'No items'
                    )}
                  </td>
                  <td className="px-4 py-3">${order.totalPrice?.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === 'delivered' ? 'bg-green-900/20 text-green-400' : 'bg-blue-900/20 text-blue-400'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="px-4 py-6 text-center text-gray-400">No recent orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Wishlist */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">My Wishlist</h2>
          <button onClick={() => setActiveTab('wishlist')} className="text-blue-400 text-sm flex items-center">
            View All <ExternalLink className="h-3 w-3 ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlistItems.length > 0 ? wishlistItems.slice(0, 3).map(item => (
            <div key={item.id} className="bg-gray-700 rounded-lg overflow-hidden group">
              <div className="relative h-40">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                  <div className="p-3 w-full"><p className="font-bold text-white">${item.price}</p></div>
                </div>
              </div>
              <div className="p-3"><h3 className="font-medium text-sm truncate">{item.title}</h3></div>
            </div>
          )) : (
            <div className="col-span-3 py-10 text-center text-gray-400">
              <Heart className="h-12 w-12 mx-auto mb-3 stroke-1" />
              <p>Your wishlist is empty. Add items you love!</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Upcoming Events */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Upcoming Events</h2>
          <button onClick={() => window.location.href = '/events'} className="text-blue-400 text-sm flex items-center">
            View All <ExternalLink className="h-3 w-3 ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingEvents.length > 0 ? upcomingEvents.map(event => (
            <div key={event.id} className="bg-gray-700 rounded-lg p-4 flex items-start">
              <Calendar className="h-10 w-10 text-blue-400 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-medium">{event.title}</h3>
                <p className="text-gray-400 text-sm">{event.date}</p>
                <p className="text-gray-400 text-sm">{event.location}</p>
              </div>
            </div>
          )) : (
            <div className="col-span-2 py-10 text-center text-gray-400">
              <p>No upcoming events found.</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recommended For You</h2>
          <button onClick={() => window.location.href = '/category/Painting'} className="text-blue-400 text-sm flex items-center">
            Browse Shop <ExternalLink className="h-3 w-3 ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendedProducts.length > 0 ? recommendedProducts.map(item => (
            <div key={item.id} className="bg-gray-700 rounded-lg overflow-hidden group">
              <div className="relative h-40">
                <img src={item.image} alt={item.title || item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                  <div className="p-3 w-full"><p className="font-bold text-white">${item.price}</p></div>
                </div>
              </div>
              <div className="p-3"><h3 className="font-medium text-sm">{item.title || item.name}</h3></div>
            </div>
          )) : (
            <div className="col-span-3 py-10 text-center text-gray-400">
              <p>No recommendations available.</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Offer */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-lg p-6 shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <Gift className="h-10 w-10 text-purple-300 mb-2" />
            <h2 className="text-xl font-bold">Special Offer for You</h2>
            <p className="text-gray-300 mt-1">Use code <span className="font-bold text-white">WELCOME20</span> for 20% off your first order</p>
          </div>
          <button className="px-6 py-2 bg-white text-purple-900 rounded-lg hover:bg-gray-100 transition-colors font-medium">
            Shop Now
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const StatCard = ({ icon, title, value, bgColor, borderColor, onClick }) => (
  <div onClick={onClick} className={`${bgColor} ${borderColor} border rounded-lg p-4 cursor-pointer hover:border-opacity-50`}>
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      {icon}
    </div>
  </div>
);

export default OverviewTab;