const express = require('express');
const router = express.Router();
const {
  addArtist,
  getArtistById,
  getAllArtists,
  getInactiveArtists
} = require('../controllers/artistController');

router.post('/', addArtist);    
router.get('/inactive',getInactiveArtists); // Get inactive artists
router.get('/:id', getArtistById);        // Get artist by ID
router.get('/', getAllArtists);           // Get all artists


module.exports = router;
