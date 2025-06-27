const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String},
    category: { 
        type: String, 
        enum: ['Video & Animation', 'Photography', 'Sculpture', 'Painting', 'Architecture', 'Music', 'Pottery'], 
        required: true 
    },
    artist: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
