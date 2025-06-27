// routes/customOrderRoutes.js
const express = require('express');
const router = express.Router();

const { 
    createCustomOrder, 
    getAllCustomOrders, 
    getCustomOrderById, 
    updateCustomOrder, 
    deleteCustomOrder 
} = require('../controllers/customOrderController');

const { authenticate, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// 🆕 Create Custom Order (Customer only)
router.post(
    '/', 
    authenticate, 
    authorize(['customer']), 
    upload.single('referenceFile'), // File upload middleware
    createCustomOrder
);

// 📄 Get All Custom Orders (Admin & Artist only)
router.get(
    '/', 
    authenticate, 
    authorize(['admin', 'artist']), 
    getAllCustomOrders
);

// 🔍 Get Custom Order by ID (Admin & Artist only)
router.get(
    '/:id', 
    authenticate, 
    authorize(['admin', 'artist']), 
    getCustomOrderById
);

// ✏️ Update Custom Order with Optional File Upload (Artist only)
router.put(
    '/:id', 
    authenticate, 
    authorize(['artist']), 
    upload.single('referenceFile'), // Optional file upload
    updateCustomOrder
);

// 🗑️ Delete Custom Order (Admin only)
router.delete(
    '/:id', 
    authenticate, 
    authorize(['admin']), 
    deleteCustomOrder
);

module.exports = router;
