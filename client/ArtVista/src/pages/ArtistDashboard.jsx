import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ArtistHeader from '../components/Artist/ArtistHeader';
import ArtistSidebar from '../components/Artist/ArtistSidebar';
import OverviewTab from '../components/Artist/OverviewTab';
import MyArtworkTab from '../components/Artist/MyArtworkTab'
import UploadTab from '../components/Artist/UploadTab';
import Earnings from '../components/Artist/Earnings';
import Analytics from '../components/Artist/Analytics';
import Settings from '../components/Artist/Settings';
const ArtistDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

   if (user?.role !== 'artist') {
    return null; 
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <ArtistHeader user={user} />
      <div className="flex">
        <ArtistSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 p-8 overflow-auto">
          {activeTab === 'overview' && <OverviewTab activeTab={activeTab} setActiveTab={setActiveTab}/>}
          {activeTab === 'my-artwork' && <MyArtworkTab />}
          {activeTab === 'upload' && <UploadTab />}
          {activeTab === 'earnings' && (
            <div className="flex justify-center items-center h-96"><Earnings/></div>
          )}
          {activeTab === 'analytics' && (
            <div className="flex justify-center items-center h-96"><Analytics/> </div>
          )}
          {activeTab === 'settings' && (
            <div className="flex justify-center items-center h-96"><Settings /></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistDashboard;
