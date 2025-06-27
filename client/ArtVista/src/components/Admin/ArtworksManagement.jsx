import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Image as LucideImage, Upload, Eye, DollarSign } from 'lucide-react';
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

const ArtworksManagement = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setArtworks(res.data);
      } catch (error) {
        setArtworks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchArtworks();
  }, []);

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
      alert('Failed to delete product',err.message);
      console.log('failded to delete', err.message)
    }
  };

  if (loading) return <p className="text-white p-4">Loading artworks...</p>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-800 rounded-lg p-6 shadow-lg"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Artworks Management</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-600">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Title</th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Artist</th> */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-600">
            {artworks.map((artwork) => (
              <tr key={artwork._id}>
                <td className="px-6 py-4 whitespace-nowrap">{artwork.title}</td>
                {/* <td className="px-6 py-4 whitespace-nowrap">{artwork.artist?.name || 'N/A'}</td> */}
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
                    <LucideImage size={24} className="text-gray-400" />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="text-blue-500 hover:underline mr-2"
                    onClick={() => handleEdit(artwork)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(artwork._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
    </motion.div>
  );
};

export default ArtworksManagement;