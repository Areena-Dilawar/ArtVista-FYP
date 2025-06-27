const express = require('express');
const router = express.Router();
const { 
    createProduct, 
    getProducts,
    artistProducts, 
    getProductById, 
    updateProduct, 
    deleteProduct, 
    getRecommendedProducts,
} = require('../controllers/productController');

const { authenticate, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Artist Uploads a Product with Image
router.post(
    '/', 
    authenticate, 
    authorize(['artist']), 
    // upload.single('product'), // Image upload for product
    createProduct
);

// Get all products
router.get('/', getProducts);

// artist
router.get('/my',authenticate,authorize(['artist']), artistProducts);

// Get product by ID
router.get('/:id', getProductById);

// Artist Updates Product with Optional Image
router.put(
    '/:id', 
    authenticate, 
    authorize(['artist', 'admin']),  
    // upload.single('product'), // Optional image upload during update
    updateProduct
);

// Artist Deletes Product
router.delete(
    '/:id', 
    authenticate, 
    authorize(['artist', 'admin']), 
    deleteProduct
);

router.get('/recommended', getRecommendedProducts);

module.exports = router;
