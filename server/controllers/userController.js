const bcrypt = require('bcrypt');
const User = require('../models/User');

// ✅ Get User Profile
const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User profile fetched successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user profile', error: error.message });
    }
};

// ✅ Update User Profile
const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, email } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, email },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User profile updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update user profile', error: error.message });
    }
};

// ✅ Update Password
const updatePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(userId);
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update password', error: error.message });
    }
};

// ✅ Upload Profile Image
const uploadProfileImage = async (req, res) => {
    try {
        const userId = req.user.id;
        const image = req.file?.filename;

        if (!image) {
            return res.status(400).json({ message: 'No image uploaded' });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { profileImage: image },
            { new: true }
        ).select('-password');

        res.status(200).json({ message: 'Profile image updated', user });
    } catch (error) {
        res.status(500).json({ message: 'Image upload failed', error: error.message });
    }
};

// Get all users (admin only)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

// User requests to become artist
const requestArtist = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByIdAndUpdate(userId, { artistRequestStatus: 'pending' }, { new: true });
    res.status(200).json({ message: 'Artist request submitted', user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit artist request', error: error.message });
  }
};

// Admin approves artist request
const approveArtist = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndUpdate(userId, { artistRequestStatus: 'approved', role: 'artist' }, { new: true });
    res.status(200).json({ message: 'Artist request approved', user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to approve artist request', error: error.message });
  }
};

// Admin rejects artist request
const rejectArtist = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndUpdate(userId, { artistRequestStatus: 'rejected' }, { new: true });
    res.status(200).json({ message: 'Artist request rejected', user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to reject artist request', error: error.message });
  }
};

// Admin gets all pending artist requests
const getPendingArtistRequests = async (req, res) => {
  try {
    const users = await User.find({ artistRequestStatus: 'pending' });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch pending artist requests', error: error.message });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  updatePassword,
  uploadProfileImage,
  getAllUsers,
  requestArtist,
  approveArtist,
  rejectArtist,
  getPendingArtistRequests,
};
