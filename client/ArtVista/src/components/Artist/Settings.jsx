import React, { useState } from 'react';
import {
  User,
  Mail,
  Bell,
  Eye,
  CreditCard,
  Shield,
  Save,
  Camera,
  Edit3
} from 'lucide-react';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('profile');

  const [profileData, setProfileData] = useState({
    name: 'Alexandra Chen',
    email: 'alexandra.chen@example.com',
    bio: 'Digital artist specializing in abstract compositions and NFT collections',
    location: 'San Francisco, CA',
    website: 'https://alexandrachen.art',
    instagram: '@alexandra_art',
    twitter: '@alexandra_chen'
  });

  const [notifications, setNotifications] = useState({
    emailSales: true,
    emailComments: true,
    emailFollowers: false,
    pushSales: true,
    pushComments: false,
    pushFollowers: true
  });


  const sections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'account', label: 'Account', icon: Mail },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  
  ];

  const handleProfileChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field, value) => {
    setNotifications(prev => ({ ...prev, [field]: value }));
  };


  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Settings</h2>
        <p className="text-gray-400">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation */}
        <div className="lg:col-span-1">
          <nav className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center w-full px-4 py-3 text-left rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {section.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 space-y-6">
            {activeSection === 'profile' && (
              <>
                <h3 className="text-xl font-semibold text-white">Profile Information</h3>
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <img
                      src="https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1"
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <button className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white">{profileData.name}</h4>
                    <p className="text-gray-400">Artist Profile</p>
                    <button className="mt-2 text-blue-500 hover:text-blue-400 text-sm flex items-center">
                      <Edit3 className="w-4 h-4 mr-1" />
                      Change Photo
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Display Name</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => handleProfileChange('name', e.target.value)}
                      className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => handleProfileChange('location', e.target.value)}
                      className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => handleProfileChange('bio', e.target.value)}
                    rows={4}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Website</label>
                    <input
                      type="url"
                      value={profileData.website}
                      onChange={(e) => handleProfileChange('website', e.target.value)}
                      className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Instagram</label>
                    <input
                      type="text"
                      value={profileData.instagram}
                      onChange={(e) => handleProfileChange('instagram', e.target.value)}
                      className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </>
            )}

            {activeSection === 'account' && (
              <>
                <h3 className="text-xl font-semibold text-white">Account Settings</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="border-t border-gray-700 pt-6">
                  <h4 className="text-lg font-medium text-white mb-4">Change Password</h4>
                  <input type="password" placeholder="Current Password" className="w-full mb-3 bg-gray-700 text-white rounded-lg px-4 py-3" />
                  <input type="password" placeholder="New Password" className="w-full mb-3 bg-gray-700 text-white rounded-lg px-4 py-3" />
                  <input type="password" placeholder="Confirm New Password" className="w-full mb-3 bg-gray-700 text-white rounded-lg px-4 py-3" />
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">Update Password</button>
                </div>
              </>
            )}

            {activeSection === 'notifications' && (
              <>
                <h3 className="text-xl font-semibold text-white">Notification Preferences</h3>
                <div className="space-y-3">
                  {['emailSales', 'emailComments', 'emailFollowers'].map(key => (
                    <label key={key} className="flex items-center justify-between">
                      <span className="text-gray-300 capitalize">{key.replace('email', '')} emails</span>
                      <input
                        type="checkbox"
                        checked={notifications[key]}
                        onChange={(e) => handleNotificationChange(key, e.target.checked)}
                      />
                    </label>
                  ))}
                  <hr className="border-gray-700 my-4" />
                  {['pushSales', 'pushComments', 'pushFollowers'].map(key => (
                    <label key={key} className="flex items-center justify-between">
                      <span className="text-gray-300 capitalize">{key.replace('push', '')} push</span>
                      <input
                        type="checkbox"
                        checked={notifications[key]}
                        onChange={(e) => handleNotificationChange(key, e.target.checked)}
                      />
                    </label>
                  ))}
                </div>
              </>
            )}

            {activeSection === 'privacy' && (
              <>
                <h3 className="text-xl font-semibold text-white">Privacy Settings</h3>
                <label className="block text-sm text-gray-300 mb-2">Profile Visibility</label>
                <select
                  value={privacy.profileVisibility}
                  onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg"
                >
                  <option value="public">Public</option>
                  <option value="followers">Followers Only</option>
                  <option value="private">Private</option>
                </select>

                <label className="block text-sm text-gray-300 mt-4 mb-2">Who can message you</label>
                <select
                  value={privacy.allowMessages}
                  onChange={(e) => handlePrivacyChange('allowMessages', e.target.value)}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg"
                >
                  <option value="everyone">Everyone</option>
                  <option value="followers">Followers Only</option>
                  <option value="none">No one</option>
                </select>

                <label className="flex items-center justify-between mt-4 text-gray-300">
                  Show earnings publicly
                  <input
                    type="checkbox"
                    checked={privacy.showEarnings}
                    onChange={(e) => handlePrivacyChange('showEarnings', e.target.checked)}
                  />
                </label>

                <label className="flex items-center justify-between mt-2 text-gray-300">
                  Show location
                  <input
                    type="checkbox"
                    checked={privacy.showLocation}
                    onChange={(e) => handlePrivacyChange('showLocation', e.target.checked)}
                  />
                </label>
              </>
            )}

            {activeSection === 'billing' && (
              <>
                <h3 className="text-xl font-semibold text-white">Billing & Payments</h3>
                <div className="bg-gray-700 rounded-lg p-4">
                  <p className="text-white font-medium">COD</p>
                  <button className="mt-3 text-blue-500">Change Plan</button>
                </div>
              </>
            )}

           
            <div className="flex justify-end pt-6 border-t border-gray-700">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2">
                <Save className="w-5 h-5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;