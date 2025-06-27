import React, { useState } from 'react';
import { 
  Eye, 
  Heart, 
  Share2, 
  Download, 
  TrendingUp, 
  Users, 
  Globe,
  Calendar,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [viewType, setViewType] = useState('overview');

  const overviewStats = [
    {
      title: 'Total Views',
      value: '89.2K',
      change: '+12.5%',
      trend: 'up',
      icon: Eye,
      color: 'text-blue-500'
    },
    {
      title: 'Likes',
      value: '12.4K',
      change: '+8.2%',
      trend: 'up',
      icon: Heart,
      color: 'text-red-500'
    },
    {
      title: 'Shares',
      value: '3.2K',
      change: '+15.7%',
      trend: 'up',
      icon: Share2,
      color: 'text-green-500'
    },
    {
      title: 'Downloads',
      value: '1.8K',
      change: '-2.3%',
      trend: 'down',
      icon: Download,
      color: 'text-purple-500'
    }
  ];

  const topArtworks = [
    {
      title: 'Abstract Dreams #001',
      views: 15420,
      likes: 892,
      shares: 156,
      image: 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    },
    {
      title: 'Digital Sunset',
      views: 12850,
      likes: 743,
      shares: 134,
      image: 'https://images.pexels.com/photos/1266946/pexels-photo-1266946.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    },
    {
      title: 'Cosmic Journey',
      views: 11290,
      likes: 623,
      shares: 98,
      image: 'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    },
    {
      title: 'Neon Reflections',
      views: 9850,
      likes: 456,
      shares: 87,
      image: 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    }
  ];

  const audienceData = [
    { country: 'United States', percentage: 35, count: '31.2K' },
    { country: 'United Kingdom', percentage: 18, count: '16.1K' },
    { country: 'Canada', percentage: 12, count: '10.7K' },
    { country: 'Germany', percentage: 10, count: '8.9K' },
    { country: 'France', percentage: 8, count: '7.1K' },
    { country: 'Others', percentage: 17, count: '15.2K' }
  ];

  const weeklyData = [
    { day: 'Mon', views: 1200, likes: 89 },
    { day: 'Tue', views: 1800, likes: 124 },
    { day: 'Wed', views: 1400, likes: 98 },
    { day: 'Thu', views: 2200, likes: 156 },
    { day: 'Fri', views: 1900, likes: 134 },
    { day: 'Sat', views: 2600, likes: 189 },
    { day: 'Sun', views: 2100, likes: 167 }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h2>
          <p className="text-gray-400">Insights into your artwork performance</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">Last 7 days</option>
            <option value="month">Last 30 days</option>
            <option value="quarter">Last 3 months</option>
            <option value="year">Last year</option>
          </select>
          <div className="flex bg-gray-700 rounded-lg">
            <button
              onClick={() => setViewType('overview')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewType === 'overview' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setViewType('detailed')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewType === 'detailed' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              Detailed
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gray-700 ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center text-sm ${
                  stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  <TrendingUp className={`w-4 h-4 mr-1 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Views & Engagement Chart */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Weekly Performance
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span>Views</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span>Likes</span>
              </div>
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between space-x-2">
            {weeklyData.map((data, index) => {
              const maxViews = Math.max(...weeklyData.map(d => d.views));
              const maxLikes = Math.max(...weeklyData.map(d => d.likes));
              const viewHeight = (data.views / maxViews) * 100;
              const likeHeight = (data.likes / maxLikes) * 100;
              return (
                <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                  <div className="w-full flex space-x-1">
                    <div
                      className="flex-1 bg-blue-500 rounded-t-lg transition-all duration-300 hover:bg-blue-400"
                      style={{ height: `${viewHeight}%` }}
                      title={`Views: ${data.views}`}
                    ></div>
                    <div
                      className="flex-1 bg-red-500 rounded-t-lg transition-all duration-300 hover:bg-red-400"
                      style={{ height: `${likeHeight}%` }}
                      title={`Likes: ${data.likes}`}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-400">{data.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Performing Artworks */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            Top Performing Artworks
          </h3>
          <div className="space-y-4">
            {topArtworks.map((artwork, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                <div className="flex items-center space-x-3 flex-1">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <p className="text-white font-medium">{artwork.title}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {artwork.views.toLocaleString()}
                      </span>
                      <span className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        {artwork.likes}
                      </span>
                      <span className="flex items-center">
                        <Share2 className="w-4 h-4 mr-1" />
                        {artwork.shares}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-500">#{index + 1}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Audience Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Geographic Distribution */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Globe className="w-5 h-5 mr-2" />
            Audience by Location
          </h3>
          <div className="space-y-4">
            {audienceData.map((country, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-white font-medium">{country.country}</span>
                  <span className="text-gray-400">{country.count}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${country.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-white text-sm font-medium w-10 text-right">
                    {country.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement Timeline */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Recent Activity
          </h3>
          <div className="space-y-4">
            {[
              { action: 'Sarah liked "Abstract Dreams #001"', time: '2 minutes ago', type: 'like' },
              { action: 'John shared "Digital Sunset"', time: '15 minutes ago', type: 'share' },
              { action: 'Mike viewed "Cosmic Journey"', time: '1 hour ago', type: 'view' },
              { action: 'Emma downloaded "Neon Reflections"', time: '2 hours ago', type: 'download' },
              { action: 'Alex liked "Urban Lights"', time: '3 hours ago', type: 'like' },
              { action: 'Lisa shared "Abstract Flow"', time: '4 hours ago', type: 'share' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                <div className={`p-2 rounded-full ${
                  activity.type === 'like' ? 'bg-red-500 bg-opacity-20' :
                  activity.type === 'share' ? 'bg-green-500 bg-opacity-20' :
                  activity.type === 'view' ? 'bg-blue-500 bg-opacity-20' :
                  'bg-purple-500 bg-opacity-20'
                }`}>
                  {activity.type === 'like' && <Heart className="w-4 h-4 text-red-500" />}
                  {activity.type === 'share' && <Share2 className="w-4 h-4 text-green-500" />}
                  {activity.type === 'view' && <Eye className="w-4 h-4 text-blue-500" />}
                  {activity.type === 'download' && <Download className="w-4 h-4 text-purple-500" />}
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm">{activity.action}</p>
                  <p className="text-gray-400 text-xs">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Analytics (if detailed view is selected) */}
      {viewType === 'detailed' && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <PieChart className="w-5 h-5 mr-2" />
            Detailed Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">68%</div>
              <p className="text-gray-400">Returning Visitors</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">4.2min</div>
              <p className="text-gray-400">Avg. Time on Page</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-500 mb-2">23%</div>
              <p className="text-gray-400">Conversion Rate</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;