// controllers/notificationController.js
const Notification = require('../models/Notification');

// 1. Get All Notifications for Logged-in User
const getNotifications = async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch all notifications for the logged-in user
        const notifications = await Notification.find({ recipient: userId }).sort({ createdAt: -1 });

        res.status(200).json({ notifications });
    } catch (error) {
        console.error('Error fetching notifications:', error.message);
        res.status(500).json({ message: 'Failed to fetch notifications', error: error.message });
    }
};

// 2. Mark a Notification as Read
const markAsRead = async (req, res) => {
    try {
        const notificationId = req.params.id;
        const userId = req.user._id;

        // Update the notification to mark it as read
        const updatedNotification = await Notification.findOneAndUpdate(
            { _id: notificationId, user: userId },
            { isRead: true },
            { new: true }
        );

        if (!updatedNotification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        res.status(200).json({ message: 'Notification marked as read', notification: updatedNotification });
    } catch (error) {
        console.error('Error marking notification as read:', error.message);
        res.status(500).json({ message: 'Failed to mark notification as read', error: error.message });
    }
};

// Exporting the functions properly
module.exports = {
    getNotifications,
    markAsRead
};
