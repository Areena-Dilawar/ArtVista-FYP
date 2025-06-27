import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, ShoppingBag, PaintBucket, Image, AlertTriangle, UserX } from 'lucide-react';
import { Avatar } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Overview = () => {
  const [ordersCount, setOrdersCount] = useState(null);
  const [usersCount, setUsersCount] = useState(null);
  const [artistsCount, setArtistsCount] = useState(null);
  const [artworksCount, setArtworksCount] = useState(null);
  const [inactiveArtistsCount, setInactiveArtistsCount] = useState(null);
  const [recentUsers, setRecentUsers] = useState([]);
  const [pendingArtists, setPendingArtists] = useState([]);
  const [inactiveArtists, setInactiveArtists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrdersCount(res.data.length);
      } catch (error) {
        setOrdersCount('N/A');
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/users/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsersCount(res.data.users.length);
        // Count artists
        const artists = res.data.users.filter(user => user.role === 'artist');
        setArtistsCount(artists.length);
        // Sort users by createdAt descending and take top 3
        const sorted = [...res.data.users].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setRecentUsers(sorted.slice(0, 3));
      } catch (error) {
        setUsersCount('N/A');
        setArtistsCount('N/A');
        setRecentUsers([]);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setArtworksCount(res.data.length);
      } catch (error) {
        setArtworksCount('N/A');
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchPendingArtists = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/users/pending-artists', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPendingArtists(res.data.users);
      } catch (error) {
        setPendingArtists([]);
      }
    };
    fetchPendingArtists();
  }, []);

  useEffect(() => {
    const fetchInactiveArtists = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/artists/inactive', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInactiveArtists(res.data.users || res.data);
        setInactiveArtistsCount((res.data.users || res.data).length);
      } catch (error) {
        setInactiveArtists([]);
        setInactiveArtistsCount('N/A');
      }
    };
    fetchInactiveArtists();
  }, []);

  const stats = [
    { title: 'Total Users', value: usersCount !== null ? usersCount : '...', icon: <Users size={24} />, color: 'bg-blue-500' },
    { title: 'Total Orders', value: ordersCount !== null ? ordersCount : '...', icon: <ShoppingBag size={24} />, color: 'bg-green-500' },
    { title: 'Artists', value: artistsCount !== null ? artistsCount : '...', icon: <PaintBucket size={24} />, color: 'bg-purple-500' },
    { title: 'Artworks', value: artworksCount !== null ? artworksCount : '...', icon: <Image size={24} />, color: 'bg-amber-500' },
    { title: 'Inactive Artists', value: inactiveArtistsCount !== null ? inactiveArtistsCount : '...', icon: <UserX size={24} />, color: 'bg-red-500' },
  ];

  const handleApprove = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/users/approve-artist/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingArtists((prev) => prev.filter((u) => u._id !== userId));
    } catch (error) {}
  };

  const handleReject = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/users/reject-artist/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingArtists((prev) => prev.filter((u) => u._id !== userId));
    } catch (error) {}
  };

  // Map stats to their navigation paths
  const statRoutes = [
    '/admin-dashboard/users', // Total Users
    '/admin-dashboard/orders', // Total Orders
    '/admin-dashboard/users', // Artists (could be a filtered view in the future)
    '/admin-dashboard/artworks', // Artworks
    '/admin-dashboard/inactive-artists', // Inactive Artists
  ];

  return (
    <div>
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="bg-gray-800 rounded-lg p-6 shadow-lg cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigate(statRoutes[index])}
          >
            <div className="flex justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gray-800 rounded-lg p-6 shadow-lg"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Recent Users</h2>
            <button className="text-blue-400 text-sm cursor-pointer" onClick={() => navigate('/admin-dashboard/users')}>View All</button>
          </div>
          
          <div className="space-y-4">
            {recentUsers.map((user) => (
              <div key={user._id} className="flex items-center p-3 bg-gray-700/50 rounded-lg">
                <Avatar className="mr-3">{user.name.charAt(0)}</Avatar>
                <div className="flex-1">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                </div>
                <div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.role === 'artist' ? 'bg-purple-500/20 text-purple-300' : 'bg-green-500/20 text-green-300'
                  }`}>
                    {user.role}
                  </span>
                  <p className="text-gray-400 text-xs mt-1">{new Date(user.createdAt).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gray-800 rounded-lg p-6 shadow-lg"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Pending Approvals & Inactive Artists</h2>
            <div className="flex space-x-2">
              <button className="text-blue-400 text-sm cursor-pointer" onClick={() => navigate('/admin-dashboard/pending-artists')}>Pending</button>
              <span className="text-gray-500">|</span>
              <button className="text-blue-400 text-sm cursor-pointer" onClick={() => navigate('/admin-dashboard/inactive-artists')}>Inactive</button>
            </div>
          </div>
          
          <div className="space-y-4">
            {/* Pending Artists Section */}
            {pendingArtists.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-amber-400 mb-2 flex items-center">
                  <AlertTriangle size={16} className="mr-1" /> Pending Approvals ({pendingArtists.length})
                </h3>
                {pendingArtists.slice(0, 2).map((user) => (
                  <div key={user._id} className="p-3 bg-gray-700/50 rounded-lg mb-2">
                    <div className="flex justify-between mb-2">
                      <p className="font-medium">{user.name}</p>
                      <span className="text-amber-400 flex items-center">
                        <AlertTriangle size={14} className="mr-1" /> Pending
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <p className="text-gray-400">{user.email}</p>
                      <p className="text-gray-400">Requested: {new Date(user.updatedAt).toLocaleString()}</p>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <button className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm" onClick={() => handleApprove(user._id)}>
                        Approve
                      </button>
                      <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm" onClick={() => handleReject(user._id)}>
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Inactive Artists Section */}
            {inactiveArtists.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-red-400 mb-2 flex items-center">
                  <UserX size={16} className="mr-1" /> Inactive Artists ({inactiveArtists.length})
                </h3>
                {inactiveArtists.slice(0, 2).map((user) => (
                  <div key={user._id} className="flex items-center p-3 bg-gray-700/50 rounded-lg mb-2">
                    <Avatar className="mr-3">{user.name.charAt(0)}</Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                    </div>
                    <div>
                      <span className="px-2 py-1 rounded-full text-xs bg-red-500/20 text-red-300 flex items-center">
                        <UserX size={12} className="mr-1" /> Inactive
                      </span>
                      <p className="text-gray-400 text-xs mt-1">
                        Last active: {user.lastActive ? new Date(user.lastActive).toLocaleString() : 'Unknown'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No data message */}
            {pendingArtists.length === 0 && inactiveArtists.length === 0 && (
              <p className="text-gray-400">No pending requests or inactive artists.</p>
            )}
          </div>
        </motion.div>


      </div>
    </div>
  );
};

export default Overview;