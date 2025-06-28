import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('all'); // 'all' or 'artists'

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/users/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data.users); // backend sends { users: [...] }
      } catch (error) {
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return <p className="text-white p-4">Loading users...</p>;
  }

  // Filter for artists tab
  const filteredUsers = tab === 'artists' ? users.filter(u => u.role === 'artist') : users;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-800 rounded-lg p-6 shadow-lg"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">User Management</h2>
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center">
          <Plus size={16} className="mr-2" />
          Add User
        </button>
      </div>
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${tab === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
          onClick={() => setTab('all')}
        >
          All Users
        </button>
        <button
          className={`px-4 py-2 rounded ${tab === 'artists' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}
          onClick={() => setTab('artists')}
        >
          Artists
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-600">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-600">
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.role === 'artist' ? 'bg-purple-500/20 text-purple-300' : 
                    user.role === 'admin' ? 'bg-amber-500/20 text-amber-300' : 'bg-green-500/20 text-green-300'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">
                    {user.status || 'active'}
                  </span>
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-400 hover:text-blue-300 mr-3">Edit</button>
                  <button className="text-red-400 hover:text-red-300">Delete</button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default UsersManagement;
