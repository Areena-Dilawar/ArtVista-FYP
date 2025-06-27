// src/services/apiService.js

const API_BASE_URL = 'http://localhost:5000/api';

class apiService {
  // Generic API request method
 async makeRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const token = localStorage.getItem('token'); // Get token from localStorage

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Add bearer token if available
  if (token) {
    defaultOptions.headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}


  // Submit artist application
  async submitArtistApplication(artistData) {
    return this.makeRequest('/artists', {
      method: 'POST',
      body: JSON.stringify(artistData),
    });
  }

  // Get all artists (if needed)
  async getArtists() {
    return this.makeRequest('/artists', {
      method: 'GET',
    });
  }

  // Upload image (if you have an image upload endpoint)
  async uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);

    return this.makeRequest('/upload', {
      method: 'POST',
      headers: {}, // Remove Content-Type to let browser set it for FormData
      body: formData,
    });
  }
}

export default new apiService();