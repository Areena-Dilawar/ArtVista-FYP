import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import CustomerHeader from '../components/Customer/CustomerHeader';
import CustomerSidebar from '../components/Customer/CustomerSidebar';
import OverviewTab from '../components/Customer/OverviewTab';
import WishlistTab from '../components/Customer/WishlistTab';
import CartTab from '../components/Customer/CartTab';
import OrdersTab from '../components/Customer/OrdersTab';
import ProfileTab from '../components/Customer/ProfileTab';

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
          {activeTab === 'settings' && <div className="flex justify-center items-center h-96">Settings content is under development</div>}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;