const express = require('express');
const router = express.Router();
const { 
    createEvent, 
    getEvents, 
    getEventById, 
    updateEvent, 
    deleteEvent,
    getParticipants,
    registerForEvent,
    getUpcomingEvents, 
} = require('../controllers/eventController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Get All Events
router.get('/', getEvents);

// Get Event by ID
router.get('/:id', getEventById);

// check participants
router.get('/:id/participant',authenticate,authorize(['artist']), getParticipants);

// Artist Creates an Event with Image Upload
router.post('/', authenticate, authorize(['artist']), upload.single('event'), createEvent);

// User Registers for an Event
router.post('/:id/register', authenticate, registerForEvent);

// Update Event
router.put('/:id', authenticate, authorize(['artist']), updateEvent);

// Delete Event
router.delete('/:id', authenticate, authorize(['artist']), deleteEvent);

router.get('/upcoming', getUpcomingEvents);

module.exports = router;
