const Product = require('../models/Product');
const User = require('../models/User');
const upload = require('../middleware/uploadMiddleware'); // Import upload middleware

// Create new product with image upload
const createProduct = async (req, res) => {
    try {
        const { title, description, price, category, image } = req.body;
        // const image = req.file ? req.file.path : null;

        console.log('Request Body:', req.body); // 🛠️ Debugging line

        // Save image as base64 string in MongoDB
        const product = new Product({
            artist: req.user.userId,
            title,
            description,
            price,
            category,
            image, // this is base64 now
        });
        const response = await product.save();
        res.status(201).json(response);

    } catch (error) {
        console.error('Error creating product:', error); // 👈 More detailed error log
        res.status(500).json({ message: 'Error creating product', error });
    }
};

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};
const artistProducts = async (req, res) => {
    try {
        const products = await Product.find({ artist: req.user.userId });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

// Get product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error });
    }
};

// Update product with optional image upload
const updateProduct = async (req, res) => {
    try {
        const { title, description, price, category } = req.body;
        const image = req.file ? req.file.path.replace(/\\/g, '/') : undefined;

        const updateData = { title, description, price, category };
        if (image) updateData.image = image;

        const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!product) return res.status(404).json({ message: 'Product not found' });

        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
};

// Recommend random products
// Get recommended products (placeholder logic)
// ✅ Recommended Products
const getRecommendedProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 }).limit(6); // Recent 6 products
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching recommended products:', error);
        res.status(500).json({ message: 'Error fetching recommended products', error });
    }
};

module.exports = {
    createProduct,
    getProducts,
    artistProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getRecommendedProducts
};
