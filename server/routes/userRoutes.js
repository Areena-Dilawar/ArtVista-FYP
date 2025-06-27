// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  updatePassword,
  uploadProfileImage,
  getAllUsers,
  requestArtist,
  approveArtist,
  rejectArtist,
  getPendingArtistRequests,
} = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

// ✅ Configure Multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save in 'uploads' folder
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Unique file name
  }
});

const upload = multer({ storage });

// ✅ Routes
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);
router.put('/password', authenticate, updatePassword);
router.put('/upload-image', authenticate, upload.single('profileImage'), uploadProfileImage);
router.get('/all', authenticate, authorize(['admin']), getAllUsers);
router.post('/request-artist', authenticate, requestArtist);
router.put('/approve-artist/:id', authenticate, authorize(['admin']), approveArtist);
router.put('/reject-artist/:id', authenticate, authorize(['admin']), rejectArtist);
router.get('/pending-artists', authenticate, authorize(['admin']), getPendingArtistRequests);

module.exports = router;
