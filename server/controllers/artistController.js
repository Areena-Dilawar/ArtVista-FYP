const Artist = require('../models/artist');

// ✅ Add new artist
const addArtist = async (req, res) => {
  try {
    console.log("Incoming artist:", req.body); // <== Add this
    const newArtist = await Artist.create(req.body);
    res.status(201).json({ message: 'Artist added successfully', artist: newArtist });
  } catch (error) {
    console.error("Artist creation error:", error); // <== Add this
    res.status(500).json({ message: 'Failed to add artist', error: error.message });
  }
};


// ✅ Get single artist
const getArtistById = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
      return res.status(404).json({ message: 'Artist not found' });
    }
    res.status(200).json(artist);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching artist', error: error.message });
  }
};

// ✅ Get all artists
const getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.find().sort({ createdAt: -1 });
    res.status(200).json(artists);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching artists', error: error.message });
  }
};

const getInactiveArtists = async (req, res) => {
  try {
    const inactiveArtists = await Artist.find({ isActive: false }).sort({ createdAt: -1 });
    res.status(200).json(inactiveArtists);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inactive artists', error: error.message });
  }
};

module.exports = {
  addArtist,
  getArtistById,
  getAllArtists,
  getInactiveArtists,
};
