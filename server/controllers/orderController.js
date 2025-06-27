const Order = require('../models/Order');
const Product = require('../models/Product');
const Notification = require('../models/Notification');
const User = require('../models/User');
const mongoose = require('mongoose');
// Create Order
const createOrder = async (req, res) => {
  try {
    console.log('🔥 Incoming Order Data:', req.body); // ADD THIS LINE

    const { items, shippingAddress, paymentMethod, total } = req.body;
    const customer = req.user.id;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const order = await Order.create({
      customer,
      items,
      totalPrice: total,
      shippingAddress,
      paymentMethod
    });

    res.status(201).json({ message: 'Order created successfully', orderId: order._id, order });
  } catch (error) {
    console.error('❌ Error in createOrder:', error); // Show full backend error
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};


const getCustomerOrders = async (req, res) => {
    try {
      console.log('User making request:', req.user);
      const orders = await Order.find({ customer: req.user.id })
    .populate('items._id', 'name image price') // populate selected product fields
    .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            orders,

        });
    } catch (error) {
        console.error('Error fetching customer orders:', error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Orders (for Admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({ path: 'customer', select: '-password' });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};

// Get Order by ID
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('customer product');
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order', error });
    }
};

// Update Order Status (Admin only)
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });

        if (!order) return res.status(404).json({ message: 'Order not found' });

        // Send notification to the customer
        await Notification.create({
            recipient: order.customer,
            message: `Your order status has been updated to: ${status}`
        });


        res.status(200).json({ message: 'Order status updated successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Error updating order status', error });
    }
};


// Delete Order
const deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting order', error });
    }
};

// Get total earnings for a specific artist
const getArtistEarnings = async (req, res) => {
  try {
    const artistId = req.params.artistId;
    // Get all products for this artist
    const products = await Product.find({ artist: artistId });
    const productNames = products.map(p => p.title);

    // Get all delivered/sold orders
    const orders = await Order.find({ status: { $in: ['delivered', 'sold'] } });

    // Sum up earnings for items matching this artist's products
    let totalEarnings = 0;
    orders.forEach(order => {
      order.items.forEach(item => {
        if (productNames.includes(item.name)) {
          totalEarnings += item.price * item.quantity;
        }
      });
    });

    res.json({ totalEarnings });
  } catch (error) {
    res.status(500).json({ message: 'Error calculating earnings', error: error.message });
  }
};

module.exports = {
    createOrder,
    getAllOrders,
    getCustomerOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
    getArtistEarnings,
};
