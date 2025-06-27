import React from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Star, Mail, MapPin, Instagram, Facebook, Twitter, Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ArtistChatBox from '../components/ArtistChatBox';
import axios from 'axios';

// Sample artist data - in a real app, this would come from an API
const artists = [
  {
    id: 1,
    name: 'Elena Rivera',
    specialty: 'Abstract Painting',
    image: 'https://images.pexels.com/photos/3228339/pexels-photo-3228339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    coverImage: 'https://images.pexels.com/photos/1674049/pexels-photo-1674049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bio: 'Elena Rivera is a contemporary abstract artist whose work explores the relationship between color, form, and emotion. Born in Madrid, Spain, she studied at the Royal Academy of Fine Arts before moving to New York to pursue her artistic career. Her paintings have been exhibited in galleries across Europe and North America.',
    location: 'New York, USA',
    email: 'elena@artvista.com',
    rating: 4.9,
    followers: 12400,
    exhibitionCount: 28,
    artworksSold: 145,
    social: {
      instagram: '@elena.rivera.art',
      facebook: 'ElenaRiveraArt',
      twitter: '@elenarivera_art'
    },
    artworks: [
      {
        id: 101,
        title: 'Abstract Harmony',
        image: 'https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 1200,
        description: 'A vibrant expression of emotions through color and form.'
      },
      {
        id: 102,
        title: 'Serene Dreams',
        image: 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 1450,
        description: 'A peaceful exploration of blues and whites, evoking a dreamy atmosphere.'
      },
      {
        id: 103,
        title: 'Urban Motion',
        image: 'https://images.pexels.com/photos/3246665/pexels-photo-3246665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 1800,
        description: 'An abstract interpretation of city life and movement.'
      }
    ]
  },
  {
    id: 2,
    name: 'Javier Chen',
    specialty: 'Urban Photography',
    image: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    coverImage: 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bio: 'Javier Chen is an award-winning photographer who specializes in capturing the essence of urban environments. His work examines the interplay between architecture, light, and human experience in metropolitan settings. After receiving his MFA from California Institute of the Arts, Javier has been documenting cities around the world.',
    location: 'Los Angeles, USA',
    email: 'javier@artvista.com',
    rating: 4.8,
    followers: 10900,
    exhibitionCount: 19,
    artworksSold: 103,
    social: {
      instagram: '@javier.chen',
      facebook: 'JavierChenPhotography',
      twitter: '@javierchenphoto'
    },
    artworks: [
      {
        id: 201,
        title: 'Urban Nostalgia',
        image: 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 950,
        description: 'A striking black and white photograph capturing urban decay and renewal.'
      },
      {
        id: 202,
        title: 'City Lights',
        image: 'https://images.pexels.com/photos/1034662/pexels-photo-1034662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 1100,
        description: 'A vibrant nighttime cityscape showcasing the energy of urban life.'
      },
      {
        id: 203,
        title: 'Urban Geometry',
        image: 'https://images.pexels.com/photos/2406731/pexels-photo-2406731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 1050,
        description: 'An exploration of architectural patterns and shapes in the modern city.'
      }
    ]
  }
];

function ArtistProfilePage() {
  const { artistId } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  
  // Find the artist based on the ID param
  const artist = artists.find(a => a.id === parseInt(artistId)) || artists[0];
  
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Cover Image */}
      <div className="pt-16"> {/* Padding to account for navbar */}
        <div className="relative h-64 sm:h-96">
          <div className="absolute inset-0">
            <img 
              src={artist.coverImage} 
              alt={`${artist.name} studio`} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black"></div>
          </div>
        </div>
      </div>
      
      {/* Artist Info Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Picture */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="md:w-1/3"
          >
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 shadow-xl">
              <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-white">
                <img 
                  src={artist.image} 
                  alt={artist.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="text-center mt-4">
                <h1 className="text-2xl font-bold">{artist.name}</h1>
                <p className="text-gray-400">{artist.specialty}</p>
                
                <div className="flex items-center justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(artist.rating) ? 'text-yellow-500 fill-current' : 'text-gray-500'}`}
                    />
                  ))}
                  <span className="ml-2 text-sm">{artist.rating.toFixed(1)}</span>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-center text-gray-300">
                  <MapPin className="h-5 w-5 mr-3 text-gray-400" />
                  <span>{artist.location}</span>
                </div>
                
                <div className="flex items-center text-gray-300">
                  <Mail className="h-5 w-5 mr-3 text-gray-400" />
                  <a href={`mailto:${artist.email}`} className="hover:text-white">
                    {artist.email}
                  </a>
                </div>
              </div>
              
              <div className="mt-6 border-t border-gray-800 pt-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold">{artist.followers.toLocaleString()}</p>
                    <p className="text-gray-400 text-sm">Followers</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{artist.exhibitionCount}</p>
                    <p className="text-gray-400 text-sm">Exhibitions</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{artist.artworksSold}</p>
                    <p className="text-gray-400 text-sm">Artworks Sold</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center space-x-4">
                <a 
                  href={`https://instagram.com/${artist.social.instagram.substring(1)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href={`https://facebook.com/${artist.social.facebook}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a 
                  href={`https://twitter.com/${artist.social.twitter.substring(1)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
              
              <div className="mt-6">
                <button className="w-full py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium">
                  Follow Artist
                </button>
                <button className="w-full py-3 mt-3 border border-white text-white rounded-lg hover:bg-white/10 transition-colors">
                  Contact Artist
                </button>
              </div>
            </div>
          </motion.div>
          
          {/* Artist Bio and Portfolio */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:w-2/3"
          >
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 shadow-xl">
              <h2 className="text-2xl font-bold mb-4">About {artist.name}</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {artist.bio}
              </p>
              
              <div className="border-t border-gray-800 pt-6">
                <h2 className="text-2xl font-bold mb-6">Featured Artworks</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {artist.artworks.map((artwork) => (
                    <div 
                      key={artwork.id} 
                      className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-500 transition-colors"
                    >
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={artwork.image} 
                          alt={artwork.title} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-bold mb-2">{artwork.title}</h3>
                        <p className="text-gray-400 mb-2 text-sm line-clamp-2">{artwork.description}</p>
                        <p className="text-lg font-bold mb-3">${artwork.price}</p>
                        
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => addToCart(artwork)}
                            className="flex-1 flex items-center justify-center space-x-1 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors text-sm"
                          >
                            <ShoppingCart className="h-4 w-4" />
                            <span>Add to Cart</span>
                          </button>
                          
                          <button 
                            onClick={() => addToWishlist(artwork)}
                            className={`p-2 rounded-lg border ${
                              isInWishlist(artwork.id) 
                                ? 'bg-red-900/20 border-red-500/50 text-red-400' 
                                : 'border-gray-600 text-gray-400 hover:border-gray-500'
                            }`}
                          >
                            <Heart 
                              className="h-4 w-4" 
                              fill={isInWishlist(artwork.id) ? 'currentColor' : 'none'} 
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <ArtistChatBox artistId={artist.id} sender={"user"} />
                <div className="mt-6 text-center">
                  <Link 
                    to={`/category/${artist.specialty.split(' ')[0]}`}
                    className="inline-block px-6 py-3 border border-white rounded-lg hover:bg-white/10 transition-colors"
                  >
                    View All Artworks
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Similar Artists */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {artists.filter(a => a.id !== artist.id).map((similarArtist) => (
            <Link 
              key={similarArtist.id} 
              to={`/artist/${similarArtist.id}`}
              className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-gray-600 transition-colors"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={similarArtist.image} 
                  alt={similarArtist.name} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="p-4 text-center">
                <h3 className="font-bold">{similarArtist.name}</h3>
                <p className="text-gray-400 text-sm">{similarArtist.specialty}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default ArtistProfilePage;