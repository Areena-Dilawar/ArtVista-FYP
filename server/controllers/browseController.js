// Controller: controllers/browseController.js
const Product = require('../models/Product');

// Browse Products by Category
exports.browseProducts = async (req, res) => {
    try {
        const { category } = req.query;

        let query = {};
        if (category) {
            query.category = category;
        }

        const products = await Product.find(query);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error while browsing products' });
    }
};
