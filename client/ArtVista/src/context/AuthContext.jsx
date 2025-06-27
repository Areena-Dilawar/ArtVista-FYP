import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../Api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user & token from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
      }
    }

    setLoading(false);
  }, []);

  // 🔐 Login
  const login = async (userData) => {
    try {
      const token = userData.token;
      const user = {
        id: userData._id || userData.id,
        email: userData.email,
        name: userData.name,
        role: userData.role,
      };

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      setUser(user);
      setToken(token);
      toast.success('Successfully logged in!');
      return user;
    } catch (error) {
      toast.error(error.message || 'Failed to login');
      throw error;
    }
  };

  // 📝 Signup
  const signup = async (userData) => {
    try {
      const token = userData.token;
      const newUser = {
        id: userData._id,
        email: userData.email,
        name: userData.name,
        role: userData.role,
        createdAt: userData.createdAt,
      };

      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('token', token);
      setUser(newUser);
      setToken(token);
      toast.success('Account created successfully!');
      return newUser;
    } catch (error) {
      toast.error(error.message || 'Failed to create account');
      throw error;
    }
  };

  // 🔓 Logout
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    toast.success('Logged out successfully');
  };

  // 🧾 Update profile
  const updateUserProfile = async (updatedData) => {
    try {
      let updatedUser = { ...user };
      // If password change is requested
      if (updatedData.newPassword && updatedData.currentPassword) {
        await axiosInstance.put('/users/password', {
          currentPassword: updatedData.currentPassword,
          newPassword: updatedData.newPassword,
        });
        toast.success('Password updated successfully');
      }
      // If name or email is being updated
      if (
        (updatedData.name && updatedData.name !== user.name) ||
        (updatedData.email && updatedData.email !== user.email)
      ) {
        const res = await axiosInstance.put('/users/profile', {
          name: updatedData.name || user.name,
          email: updatedData.email || user.email,
        });
        updatedUser = { ...updatedUser, ...res.data.user };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        toast.success('Profile updated successfully');
      }
      return updatedUser;
    } catch (error) {
      const msg = error.response?.data?.message || error.message || 'Failed to update profile';
      toast.error(msg);
      throw error;
    }
  };

  // 🔍 Role Checks
  const isAdmin = user?.role === 'admin';
  const isArtist = user?.role === 'artist';
  const isCustomer = user?.role === 'customer' || !user?.role;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        signup,
        logout,
        updateUserProfile,
        isAuthenticated: !!user,
        isAdmin,
        isArtist,
        isCustomer,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 📦 Hook to access auth anywhere
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
