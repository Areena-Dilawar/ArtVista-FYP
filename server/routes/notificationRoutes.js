const express = require('express');
const router = express.Router();
const { getNotifications, markAsRead } = require('../controllers/notificationController');
const { authenticate } = require('../middleware/authMiddleware');

// Get All Notifications for Logged-in User
router.get('/', authenticate, getNotifications);

// Mark a Notification as Read
router.put('/:id', authenticate, markAsRead);

module.exports = router;
