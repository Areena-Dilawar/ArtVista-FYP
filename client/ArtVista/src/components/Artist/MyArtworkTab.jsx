import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Eye, 
  Heart, 
  DollarSign, 
  Edit, 
  Trash2,
  Plus,
  MoreHorizontal,
  Image
} from 'lucide-react';
import axios from 'axios';

const categories = [
  'Painting',
  'Photography',
  'Sculpture',
  'Digital Art',
  'Mixed Media',
  'Other',
];

function getImagePreview(image, isBase64) {
  if (!image) return null;
  if (isBase64) return image;
  if (image.startsWith('data:')) return image;
  return `http://localhost:5000/${image}`;
}

const MyArtworkTab = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  // Get current user from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        // Only show products created by this artist
        setArtworks(res.data.filter(p => p.artist === user?.id || p.artist === user?._id));
      } catch (err) {
        setError('Failed to fetch artworks');
        setArtworks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchArtworks();
  }, [user]);

  const filteredArtworks = artworks.filter(artwork => {
    const matchesSearch = artwork.title.toLowerCase().includes(searchTerm.toLowerCase());
    // No status filter for now
    return matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'sold': return 'bg-green-500 text-green-100';
      case 'available': return 'bg-blue-500 text-blue-100';
      case 'draft': return 'bg-yellow-500 text-yellow-100';
      default: return 'bg-gray-500 text-gray-100';
    }
  };

  const handleEdit = (artwork) => {
    setEditProduct(artwork);
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setArtworks((prev) => prev.filter((art) => art._id !== id));
    } catch (err) {
      alert('Failed to delete product', err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">My Artwork</h2>
          <p className="text-gray-400">Manage and showcase your creative works</p>
        </div>
        {/* <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Upload New</span>
        </button> */}
      </div>

      {/* Filters and Controls */}
      {/* <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search artworks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
              />
            </div>
          </div>
        </div>
      </div> */}

      {/* Artwork Table */}
          <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-600">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
          <tbody className="divide-y divide-gray-600">
                {filteredArtworks.map((artwork) => (
              <tr key={artwork._id}>
                <td className="px-6 py-4 whitespace-nowrap">{artwork.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">${artwork.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">{artwork.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {artwork.image ? (
                    <img
                      src={artwork.image.startsWith('data:') ? artwork.image : `http://localhost:5000/${artwork.image}`}
                          alt={artwork.title}
                      className="h-12 w-12 object-cover rounded"
                    />
                  ) : (
                    <Image size={24} className="text-gray-400" />
                  )}
                    </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-500 hover:underline mr-2" onClick={() => handleEdit(artwork)}>
                    Edit
                        </button>
                  <button className="text-red-500 hover:underline" onClick={() => handleDelete(artwork._id)}>
                    Delete
                        </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      {filteredArtworks.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Image className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-xl">No artworks found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        </div>
      )}
      {loading && <div className="text-center text-gray-400 py-8">Loading...</div>}
      {error && <div className="text-center text-red-400 py-8">{error}</div>}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Artwork</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Image & Title */}
              <div className="space-y-6">
                {/* Image Upload & Preview */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Artwork Image</label>
                  <div className="flex items-center space-x-4">
                    {editProduct.image && (
                      <img
                        src={getImagePreview(editProduct.image, editProduct.image?.startsWith('data:'))}
                        alt="Preview"
                        className="w-24 h-24 object-cover rounded border"
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      id="edit-image-upload"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setEditProduct({ ...editProduct, image: reader.result });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <label
                      htmlFor="edit-image-upload"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors"
                    >
                      Change Image
                    </label>
                    {editProduct.image && (
                      <button
                        className="ml-2 text-red-500 hover:underline"
                        onClick={() => setEditProduct({ ...editProduct, image: '' })}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    className="w-full bg-gray-100 text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={editProduct.title}
                    onChange={e => setEditProduct({ ...editProduct, title: e.target.value })}
                    placeholder="Enter artwork title"
                  />
                </div>
              </div>
              {/* Right Column: Description, Price, Category */}
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    className="w-full bg-gray-100 text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    value={editProduct.description || ''}
                    onChange={e => setEditProduct({ ...editProduct, description: e.target.value })}
                    placeholder="Describe your artwork..."
                    rows={3}
                  />
                </div>
                {/* Price & Category */}
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="number"
                        className="w-full bg-gray-100 text-gray-900 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={editProduct.price}
                        onChange={e => setEditProduct({ ...editProduct, price: e.target.value })}
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      className="w-full bg-gray-100 text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={editProduct.category || ''}
                      onChange={e => setEditProduct({ ...editProduct, category: e.target.value })}
                    >
                      <option value="">Select category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 mt-8">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                onClick={async () => {
                  try {
                    const token = localStorage.getItem('token');
                    const { _id, ...updateData } = editProduct;
                    const res = await axios.put(
                      `http://localhost:5000/api/products/${editProduct._id}`,
                      updateData,
                      { headers: { Authorization: `Bearer ${token}` } }
                    );
                    setArtworks((prev) =>
                      prev.map((art) => (art._id === editProduct._id ? res.data.product : art))
                    );
                    setShowEditModal(false);
                  } catch (err) {
                    alert('Failed to update product');
                  }
                }}
              >
                Save Changes
              </button>
              <button
                className="bg-gray-300 px-6 py-2 rounded-lg"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyArtworkTab;