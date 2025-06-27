import React, { useEffect, useState } from 'react';
import { 
  TrendingUp, 
  Eye, 
  Heart, 
  DollarSign, 
  Image, 
  Users,
  ArrowUp,
  ArrowDown,
  Upload
} from 'lucide-react';
import axios from 'axios';

const OverviewTab = ({activeTab, setActiveTab}) => {
  const [usersCount, setUsersCount] = useState('...');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const [earnings, setEarnings] = useState(0);

  // Get current user from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/users/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsersCount(res.data.users.length);
      
        // Sort users by createdAt descending and take top 3
      } catch (error) {
        setUsersCount('N/A');
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (error) {
        setOrders([]);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(
          `http://localhost:5000/api/orders/artist/${user.id}/earnings`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEarnings(res.data.totalEarnings);
      } catch (err) {
        setEarnings(0);
      }
    };
    if (user?.id) fetchEarnings();
  }, [user]);

  // Filter products for current artist
  const myArtworks = products.filter(p => p.artist === user?.id || p.artist === user?._id);

  const recentProducts = [...products]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  // After fetching products and orders
  const myProductIds = products
    .filter(p => p.artist === user?.id || p.artist === user?._id)
    .map(p => p._id);

  // Count all sold items for this artist
  const soldCount = orders.reduce((count, order) => {
    if (order.status === 'delivered' || order.status === 'sold') {
      // For each item in the order, check if it belongs to this artist
      return count + order.items.filter(item => myProductIds.includes(item._id)).length;
    }
    return count;
  }, 0);

  const stats = [
    {
      title: 'Total Earnings',
      value: `$${earnings}`,
      change: '+23%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-500'
    },
    {
      title: 'Artworks Sold',
      value: soldCount,
      change: '+12%',
      trend: 'up',
      icon: Image,
      color: 'text-blue-500'
    },
    {
      title: 'Upload Artwork',
      value: '',
      change: '',
      trend: '',
      icon: Upload,
      color: 'text-yellow-500'
    },
    // {
    //   title: 'Users',
    //   value: usersCount,
    //   change: '+8%',
    //   trend: 'up',
    //   icon: Users,
    //   color: 'text-purple-500'
    // },
    // {
    //   title: 'Followers',
    //   value: '2,341',
    //   change: '-2%',
    //   trend: 'down',
    //   icon: Users,
    //   color: 'text-orange-500'
    // }
  ];

  // Build real recent sales for this artist
  const recentSales = [];
  orders
    .filter(order => order.status === 'delivered' || order.status === 'sold')
    .forEach(order => {
      order.items.forEach(item => {
        // Find the product for this item
        const product = products.find(p => (p._id === item._id || p.title === item.name) && (p.artist === user?.id || p.artist === user?._id));
        if (product) {
          recentSales.push({
            artwork: item.name,
            buyer: order.customer?.name || 'Unknown',
            price: `$${item.price}`,
            date: new Date(order.createdAt).toLocaleString(),
            image: product.image?.startsWith('data:') ? product.image : `http://localhost:5000/${product.image}`,
          });
        }
      });
    });
  // Sort by most recent
  recentSales.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Welcome back, Alexandra!</h2>
        <p className="text-gray-400">Here's what's happening with your art today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* My Artworks Card */}
        <div
          className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer hover:shadow-lg"
          onClick={() => setActiveTab && setActiveTab('my-artwork')}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-gray-700 text-blue-500">
              <Image className="w-6 h-6" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-white mb-1">{myArtworks.length}</p>
            <p className="text-gray-400 text-sm">My Artworks</p>
          </div>
        </div>
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isClickable = index === 0 || index === 1 || index === 2;
          const handleClick = () => {
            if(index === 0) setActiveTab && setActiveTab('earnings');
            if(index === 1) setActiveTab && setActiveTab('my-artwork');
            if(index === 2) setActiveTab && setActiveTab('upload');
          };
          return (
            <div
              key={index}
              className={`bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors ${isClickable ? 'cursor-pointer hover:shadow-lg' : ''}`}
              onClick={isClickable ? handleClick : undefined}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gray-700 ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center text-sm ${
                  stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.trend === 'up' ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
                  {stat.change}
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Sales */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
            Recent Sales
          </h3>
          <div className="space-y-4">
            {recentSales.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                <TrendingUp className="w-10 h-10 mb-2 text-green-500 opacity-40" />
                <p className="text-lg font-semibold">No recent sales yet.</p>
                <p className="text-sm">Your recent sales will appear here once you make a sale.</p>
              </div>
            ) : (
              recentSales.slice(0, 3).map((sale, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                  <img
                    src={sale.image}
                    alt={sale.artwork}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-white font-medium">{sale.artwork}</p>
                    <p className="text-gray-400 text-sm">Sold to {sale.buyer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-500 font-semibold">{sale.price}</p>
                    <p className="text-gray-400 text-sm">{sale.date}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Popular Artworks */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Heart className="w-5 h-5 mr-2 text-red-500" />
            Trending Artworks
          </h3>
          <div className="space-y-4">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : recentProducts.length === 0 ? (
              <div>No artworks found.</div>
            ) : (
              recentProducts.map((artwork, index) => {
                // Generate dummy numbers (or use fixed ones)
                const dummyViews = (Math.floor(Math.random() * 2000) + 500) + ' views';
                const dummyLikes = (Math.floor(Math.random() * 200) + 50) + ' likes';

                return (
                  <div key={artwork._id || index} className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-white font-medium">{artwork.title}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {dummyViews}
                        </span>
                        <span className="flex items-center">
                          <Heart className="w-4 h-4 mr-1" />
                          {dummyLikes}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            onClick={() => setActiveTab && setActiveTab('upload')}
          >
            <Upload className="w-5 h-5" />
            <span>Upload New Artwork</span>
          </button>
          <button
            className="bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            onClick={() => setActiveTab && setActiveTab('earnings')}
          >
            <DollarSign className="w-5 h-5" />
            <span>Check Earnings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;