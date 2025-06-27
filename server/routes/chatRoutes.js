const express = require('express');
const router = express.Router();
const { 
    getChats, 
    sendMessage, 
    getChatById 
} = require('../controllers/chatController');
const { authenticate } = require('../middleware/authMiddleware');

// Get all chats for the logged-in user
router.get('/', authenticate, getChats);

// Send a new message
router.post('/', authenticate, sendMessage);

// Get specific chat by ID
router.get('/:id', authenticate, getChatById);

module.exports = router;
