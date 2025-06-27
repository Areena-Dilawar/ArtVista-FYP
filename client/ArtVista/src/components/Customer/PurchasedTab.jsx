import React from 'react';
import { motion } from 'framer-motion';
import { Download, Clock, Star, FileDown } from 'lucide-react';

// Sample purchased items
const purchasedItems = [
  {
    id: 1,
    title: 'Digital Dreamscape',
    type: 'Digital Art',
    image: 'https://images.pexels.com/photos/3109807/pexels-photo-3109807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    artist: 'Marcus Lee',
    purchaseDate: 'May 15, 2023',
    downloadCount: 3,
    fileSize: '45 MB',
    fileType: 'ZIP (JPEG, PNG)'
  },
  {
    id: 2,
    title: 'Abstract Visual Experience',
    type: 'Video Art',
    image: 'https://images.pexels.com/photos/3156381/pexels-photo-3156381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    artist: 'Luna Kim',
    purchaseDate: 'April 3, 2023',
    downloadCount: 1,
    fileSize: '120 MB',
    fileType: 'MP4'
  },
  {
    id: 3,
    title: 'Urban Motion',
    type: 'Digital Art',
    image: 'https://images.pexels.com/photos/2909083/pexels-photo-2909083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    artist: 'Jasmine Wong',
    purchaseDate: 'March 17, 2023',
    downloadCount: 2,
    fileSize: '78 MB',
    fileType: 'ZIP (PNG, PDF)'
  }
];

const PurchasedTab = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-xl font-bold mb-6">My Purchased Digital Art</h2>
      
      {purchasedItems.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-12 text-center">
          <Download className="h-16 w-16 mx-auto text-gray-600 mb-4" />
          <h3 className="text-xl font-medium mb-2">No Digital Purchases Yet</h3>
          <p className="text-gray-400 mb-6">Once you purchase digital art, it will appear here for download.</p>
          <button className="px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors">
            Browse Digital Art
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {purchasedItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 h-48 md:h-auto">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 p-6">
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <p className="text-gray-400 text-sm">by {item.artist}</p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span className="px-3 py-1 rounded-full text-xs bg-blue-900/20 text-blue-400">
                        {item.type}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-400">Purchased: {item.purchaseDate}</span>
                    </div>
                    <div className="flex items-center">
                      <Download className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-400">Downloads: {item.downloadCount}</span>
                    </div>
                    <div className="flex items-center">
                      <FileDown className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-400">{item.fileType} ({item.fileSize})</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white flex items-center justify-center transition-colors">
                      <Download className="h-4 w-4 mr-2" />
                      Download Files
                    </button>
                    <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white flex items-center justify-center transition-colors">
                      <Star className="h-4 w-4 mr-2" />
                      Rate Artwork
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default PurchasedTab;