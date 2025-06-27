import React, { useState, useCallback } from 'react';
import { Upload, Image, X, DollarSign, Tag, FileText, Eye, Save, Fish as Publish } from 'lucide-react';
import axios from 'axios';

const initialFormData = {
  title: '',
  description: '',
  price: '',
  category: ''
};

const UploadTab = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  }, []);

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const removeFile = () => setFile(null);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? e.target.checked : value
    }));
  };

  const categories = [
    'Video & Animation',
    'Photography',
    'Sculpture',
    'Painting',
    'Architecture',
    'Music',
    'Pottery'
  ];

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  
  const handlePublish = async () => {
    if (!file || !formData.title) return;
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const base64Image = await fileToBase64(file);
  
      const payload = {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        category: formData.category,
        image: base64Image,
      };
  
      const res = await axios.post('http://localhost:5000/api/products', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      setSuccess('Artwork published successfully!');
      setFile(null);
      setFormData(initialFormData);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to publish artwork');
    } finally {
      setLoading(false);
    }
  };
  

  // const handlePublish = async () => {
  //   if (!file || !formData.title) return;
  //   setLoading(true);
  //   setSuccess(null);
  //   setError(null);
  //   try {
  //     const token = localStorage.getItem('token');
  //     const data = new FormData();
  //     data.append('title', formData.title);
  //     data.append('description', formData.description);
  //     data.append('price', formData.price);
  //     data.append('category', formData.category);
  //     data.append('image', file);

  //     const res = await axios.post('http://localhost:5000/api/products', data, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setSuccess('Artwork published successfully!');
  //     setFile(null);
  //     setFormData(initialFormData);
  //   } catch (err) {
  //     setError(err.response?.data?.message || 'Failed to publish artwork');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Upload Artwork</h2>
        <p className="text-gray-400">Share your creativity with the world</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* File Upload Section */}
        <div className="space-y-6">
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
              dragActive 
                ? 'border-blue-500 bg-blue-500 bg-opacity-10' 
                : 'border-gray-600 hover:border-gray-500'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Drop your files here, or <span className="text-blue-500">browse</span>
            </h3>
            <p className="text-gray-400 mb-4">
              Support for JPG, PNG, GIF, SVG files up to 10MB
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg cursor-pointer transition-colors inline-block"
            >
              Choose Image
            </label>
          </div>

          {/* File Preview */}
          {file && (
            <div>
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-32 h-32 object-cover rounded"
              />
              <button onClick={removeFile}>Remove</button>
            </div>
          )}

          {imageBase64 && (
            <div>
              <img src={imageBase64} alt="Preview" className="w-32 h-32 object-cover rounded" />
              <button onClick={() => { setFile(null); setImageBase64(null); }}>Remove</button>
            </div>
          )}
        </div>

        {/* Form Section */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 space-y-6">
          <h3 className="text-xl font-semibold text-white">Artwork Details</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter artwork title"
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your artwork..."
              rows={4}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Price ($)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      <div className="flex items-center justify-between pt-6 border-t border-gray-700">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
            <Eye className="w-5 h-5" />
            <span>Preview</span>
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
         
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2"
            disabled={!file || !formData.title || loading}
            onClick={handlePublish}
          >
            <Publish className="w-5 h-5" />
            <span>Publish Artwork</span>
          </button>
        </div>
      </div>

      {success && <div className="text-green-500 mt-4">{success}</div>}
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
};

export default UploadTab;