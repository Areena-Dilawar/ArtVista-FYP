// Route: routes/browseRoutes.js
const express = require('express');
const router = express.Router();
const { browseProducts } = require('../controllers/browseController');
const { authenticate } = require('../middleware/authMiddleware');

// Browse Products by Category
router.get('/', authenticate, browseProducts);

module.exports = router;
