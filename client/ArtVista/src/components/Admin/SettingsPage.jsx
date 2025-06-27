import React from 'react';
import { motion } from 'framer-motion';

const SettingsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-800 rounded-lg p-6 shadow-lg"
    >
      <h2 className="text-xl font-bold mb-6">Settings</h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="font-medium">Account Settings</h3>
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Email</label>
                <input 
                  type="email" 
                  defaultValue="admin@example.com"
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Appearance</h3>
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-blue-600 rounded-lg">Light</button>
              <button className="px-4 py-2 bg-gray-800 rounded-lg border border-gray-600">Dark</button>
              <button className="px-4 py-2 bg-gray-800 rounded-lg border border-gray-600">System</button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Danger Zone</h3>
          <div className="bg-gray-700 p-4 rounded-lg border border-red-500/30">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Delete Account</h4>
                <p className="text-sm text-gray-400">Permanently delete your account and all data</p>
              </div>
              <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg">
                Delete Account
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">
            Save Changes
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsPage;