const Notification = require('../models/Notification');
const User = require('../models/User');
const Event = require('../models/Event');

const createEvent = async (req, res) => {
    try {
        const { title, description, date, venue } = req.body;
        const eventImage = req.file ? req.file.path : '';
        
        const event = await Event.create({
            title,
            description,
            date,
            venue,
            image: eventImage,
            artist: req.user.id
        });

        // Notify all customers
        const customers = await User.find({ role: 'customer' });
        const notifications = customers.map(customer => ({
            recipient: customer._id,
            message: `New event "${title}" created! Check it out.`
        }));

        await Notification.insertMany(notifications);

        res.status(201).json({ message: 'Event created successfully', event });
    } catch (error) {
        res.status(500).json({ message: 'Error creating event', error });
    }
};



// Get all events
const getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error });
    }
};

// Get event by ID
const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching event', error });
    }
};

// Update event
const updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error updating event', error });
    }
};

// Delete event
const deleteEvent = async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting event', error });
    }
};

// Register for an Event
const registerForEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const userId = req.user.id;

        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        if (event.participants.includes(userId)) {
            return res.status(400).json({ message: 'Already registered for this event' });
        }

        event.participants.push(userId);
        await event.save();

        // Send notification to the event artist
        await Notification.create({
            recipient: event.artist,
            message: `A new participant registered for your event: ${event.title}`
        });

        res.status(200).json({ message: `Successfully registered for event: ${event.title}` });
    } catch (error) {
        res.status(500).json({ message: 'Failed to register for event', error: error.message });
    }
};


const getParticipants = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate('participants', 'name email role'); // Populating participants with selected fields
        
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching event', error });
    }
};
const getUpcomingEvents = async (req, res) => {
  try {
    const today = new Date();
    const events = await Event.find({ date: { $gte: today } }).sort({ date: 1 }).limit(5);
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    res.status(500).json({ message: 'Error fetching upcoming events', error });
  }
};


module.exports = {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    registerForEvent,
    getParticipants,
    getUpcomingEvents
};
