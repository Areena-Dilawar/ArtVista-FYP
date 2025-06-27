const express = require('express');
const router = express.Router();
const { 
    createOrder, 
    getAllOrders, 
    getCustomerOrders, 
    getOrderById, 
    updateOrderStatus, 
    deleteOrder, 
    getArtistEarnings 
} = require('../controllers/orderController');

const { authenticate, authorize } = require('../middleware/authMiddleware');

// Customer Creates an Order
router.post('/', authenticate, authorize(['customer']), createOrder);

// Admin Gets All Orders
router.get('/', authenticate, authorize(['admin']), getAllOrders);

// Customer Gets Their Orders
router.get('/my-orders', authenticate, authorize(['customer']), getCustomerOrders);

// Get Order by ID (Admin or Customer who owns the order)
router.get('/:id', authenticate, getOrderById);

// Admin Updates Order Status
router.put('/:id', authenticate, authorize(['admin']), updateOrderStatus);

// Admin Deletes Order
router.delete('/:id', authenticate, authorize(['admin']), deleteOrder);

// Get Artist Earnings
router.get('/artist/:artistId/earnings', authenticate, authorize(['artist', 'admin']), getArtistEarnings);

module.exports = router;
