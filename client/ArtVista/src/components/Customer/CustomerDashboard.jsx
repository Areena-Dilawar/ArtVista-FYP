import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import CustomerHeader from './CustomerHeader';
import CustomerSidebar from './CustomerSidebar';
import OverviewTab from './OverviewTab';
import WishlistTab from './WishlistTab';
import OrdersTab from './OrdersTab';
import ProfileTab from './ProfileTab';
import SettingsTab from './SettingsTab';
import CartTab from './CartTab';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <CustomerHeader user={user} />

      <div className="flex">
        <CustomerSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="flex-1 p-8 overflow-auto">
          {activeTab === 'overview' && <OverviewTab setActiveTab={setActiveTab} />}
          {activeTab === 'orders' && <OrdersTab />}
          {activeTab === 'wishlist' && <WishlistTab />}
          {activeTab === 'cart' && <CartTab />}
          {activeTab === 'profile' && <ProfileTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;