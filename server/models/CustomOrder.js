// models/CustomOrder.js
const mongoose = require('mongoose');

const customOrderSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    budget: { type: Number, required: true },
    deadline: { type: Date, required: true },
    status: { 
        type: String, 
        enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'], 
        default: 'Pending' 
    },
    referenceFile: { type: String }, // File path for uploaded files
    customer: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
}, { timestamps: true });

module.exports = mongoose.model('CustomOrder', customOrderSchema);
