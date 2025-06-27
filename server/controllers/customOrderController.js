// controllers/customOrderController.js
const CustomOrder = require('../models/CustomOrder');
const User = require('../models/User');
const Notification = require('../models/Notification')

// 🆕 Create Custom Order with Notification to All Artists
const createCustomOrder = async (req, res) => {
    try {
        const { description, deadline, title, budget } = req.body;

        // Create the custom order
        const customOrder = await CustomOrder.create({
            title,
            description,
            budget,
            deadline,
            customer: req.user.id,
            status: 'Pending'
        });

        // Fetch all artists
        const artists = await User.find({ role: 'artist' });

        // Create a notification for each artist
        const notifications = artists.map(artist => ({
            recipient: artist._id,
            message: `A new custom order request is available.`
        }));

        // Insert notifications in bulk
        await Notification.insertMany(notifications);

        res.status(201).json({ message: 'Custom order created successfully', customOrder });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating custom order', error });
    }
};



// 📄 Get All Custom Orders
const getAllCustomOrders = async (req, res) => {
    try {
        const orders = await CustomOrder.find().populate('customer', 'name email');
        res.status(200).json({ message: 'All custom orders fetched', orders });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching custom orders', error: error.message });
    }
};

// 🔍 Get Custom Order by ID
const getCustomOrderById = async (req, res) => {
    try {
        const order = await CustomOrder.findById(req.params.id).populate('customer', 'name email');
        if (!order) return res.status(404).json({ message: 'Custom order not found' });

        res.status(200).json({ message: 'Custom order fetched', order });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching custom order', error: error.message });
    }
};

// ✏️ Update Custom Order with Optional File Upload
const updateCustomOrder = async (req, res) => {
    try {
        const { title, description, budget, deadline, status } = req.body;
        const referenceFile = req.file ? req.file.path : undefined;

        const updateData = { title, description, budget, deadline, status };
        if (referenceFile) updateData.referenceFile = referenceFile;

        const order = await CustomOrder.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!order) return res.status(404).json({ message: 'Custom order not found' });

        res.status(200).json({ message: 'Custom order updated successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Error updating custom order', error: error.message });
    }
};

// 🗑️ Delete Custom Order
const deleteCustomOrder = async (req, res) => {
    try {
        await CustomOrder.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Custom order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting custom order', error: error.message });
    }
};

module.exports = { 
    createCustomOrder, 
    getAllCustomOrders, 
    getCustomOrderById, 
    updateCustomOrder, 
    deleteCustomOrder 
};
