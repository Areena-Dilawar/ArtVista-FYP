const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String }
});

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  image: { type: String, required: true },
  coverImage: { type: String },
  bio: { type: String },
  isActive: { type: Boolean, default: false },
  location: { type: String },
  email: { type: String },
  rating: { type: Number, default: 0 },
  followers: { type: Number, default: 0 },
  exhibitionCount: { type: Number, default: 0 },
  artworksSold: { type: Number, default: 0 },
  social: {
    instagram: { type: String },
    facebook: { type: String },
    twitter: { type: String }
  },
  artworks: [artworkSchema],
}, { timestamps: true });

module.exports = mongoose.model('Artist', artistSchema);
