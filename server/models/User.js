const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'artist', 'customer'], default: 'customer' },
    profileImage: { type: String },
    artistRequestStatus: { type: String, enum: ['none', 'pending', 'approved', 'rejected'], default: 'none' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
