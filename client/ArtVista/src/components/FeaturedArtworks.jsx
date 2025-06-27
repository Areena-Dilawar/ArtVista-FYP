import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { ShoppingCart, Heart } from "lucide-react";

const featuredArtworks = [
  {
    id: 1,
    name: 'Ethereal Dreams',
    title: 'Ethereal Dreams',
    artist: 'Elena Rivera',
    image: 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 1200,
    category: 'Painting',
    description: 'A vibrant expression of emotions through color and form.'
  },
  {
    id: 2,
    name: 'Urban Nostalgia',
    title: 'Urban Nostalgia',
    artist: 'Javier Chen',
    image: 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 'Rs5000',
    category: 'Photography',
    description: 'A striking black and white photograph capturing urban decay and renewal.'
  },
  {
    id: 3,
    name: 'Harmony in Clay',
    title: 'Harmony in Clay',
    artist: 'Maria Johnson',
    image: 'https://images.pexels.com/photos/2162938/pexels-photo-2162938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 850,
    category: 'Pottery',
    description: 'Hand-crafted pottery piece showcasing perfect balance and form.'
  },
  {
    id: 4,
    name: 'Modern Horizons',
    title: 'Modern Horizons',
    artist: 'Alexander Wu',
    image: 'https://images.pexels.com/photos/2119706/pexels-photo-2119706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 1800,
    category: 'Architecture',
    description: 'Architectural concept art representing the future of urban living.'
  },
  {
    id: 5,
    name: 'Timeless Elegance',
    title: 'Timeless Elegance',
    artist: 'Sophia Patel',
    image: 'https://images.pexels.com/photos/1148498/pexels-photo-1148498.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 1550,
    category: 'Sculpture',
    description: 'Elegant sculpture crafted from marble that embodies timeless beauty.'
  },
  {
    id: 6,
    name: 'Digital Dreamscape',
    title: 'Digital Dreamscape',
    artist: 'Marcus Lee',
    image: 'https://images.pexels.com/photos/3109807/pexels-photo-3109807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 780,
    category: 'Video & Animation',
    description: 'A mesmerizing digital art piece exploring dreamlike states and consciousness.'
  }
];

function FeaturedArtworks() {
  const [activeIndex, setActiveIndex] = useState(null);
  const scrollContainerRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerView = 3; // Number of artworks visible at once
  const totalSlides = Math.ceil(featuredArtworks.length / itemsPerView);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  // Function to scroll to a specific slide
  const scrollToSlide = (slideIndex) => {
    if (scrollContainerRef.current) {
      const itemWidth = 260; // Width of each item including gap
      const newPosition = slideIndex * (itemsPerView * itemWidth);

      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      
      setCurrentSlide(slideIndex);
    }
  };

  // Function to handle arrow navigation
  const handleArrowClick = (direction) => {
    const newSlide = direction === 'left'
      ? Math.max(0, currentSlide - 1)
      : Math.min(totalSlides - 1, currentSlide + 1);

    scrollToSlide(newSlide);
  };

  // Handle product selection
  const handleProductClick = (artwork) => {
    navigate(`/category/${artwork.category}`, { state: { selectedProduct: artwork } });
  };

  return (
    <motion.div
      className="bg-black text-white py-20 overflow-hidden relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background glow effects */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
      ></motion.div>

      {/* Section title with animated underline */}
      <div className="text-center mb-12 relative z-10">
        <motion.h2 
          className="text-5xl font-serif font-bold tracking-wider"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          FEATURED ARTWORKS
        </motion.h2>
        <motion.div 
          className="h-1 w-0 bg-white/30 mx-auto mt-4 rounded-full"
          animate={{ width: "10rem" }}
          transition={{ duration: 0.8, delay: 0.3 }}
        ></motion.div>
      </div>

      {/* Gallery with arrow navigation */}
      <div className="relative px-4 md:px-10 lg:px-20 mx-auto max-w-7xl">
        {/* Left Arrow */}
        <motion.button 
          onClick={() => handleArrowClick('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 
                     shadow-lg transition-all duration-300 focus:outline-none"
          whileHover={{ scale: 1.1, x: -3 }}
          whileTap={{ scale: 0.95 }}
          disabled={currentSlide === 0}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: currentSlide === 0 ? 0.5 : 1, x: 0 }}
          aria-label="Scroll left"
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </motion.button>

        {/* Gallery Container */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-hidden gap-6 pb-4 pt-2"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {featuredArtworks.map((art, index) => (
            <motion.div 
              key={index} 
              className="flex-shrink-0 flex flex-col items-center"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div 
                className="w-60 h-60 bg-gray-900 rounded-lg overflow-hidden shadow-lg cursor-pointer relative"
                whileHover={{ scale: 1.05 }}
                animate={activeIndex === index ? { scale: 1.1 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() => handleProductClick(art)}
              >
                <img 
                  src={art.image} 
                  alt={art.name} 
                  className="w-full h-full object-cover"
                />
                
                {/* Hover overlay */}
                {activeIndex === index && (
                  <motion.div 
                    className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <p className="text-white font-medium mb-2">{art.price}</p>
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-white text-black rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(art);
                        }}
                      >
                        <ShoppingCart size={16} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-white text-black rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToWishlist(art);
                        }}
                      >
                        <Heart
                          size={16}
                          fill={isInWishlist(art.id) ? 'black' : 'none'}
                        />
                      </motion.button>
                    </div>
                  </motion.div>
                )}
                
                <motion.div 
                  className="absolute inset-0 border-2 border-white/70 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                ></motion.div>
              </motion.div>
              
              <div className="mt-4 text-center">
                <motion.p 
                  className="font-serif text-lg"
                  animate={activeIndex === index ? 
                    { color: "#ffffff", fontSize: "1.25rem" } : 
                    { color: "#9ca3af", fontSize: "1.125rem" }
                  }
                  transition={{ duration: 0.3 }}
                >
                  {art.name}
                </motion.p>
                
                <motion.div 
                  className="h-1 bg-white/30 mx-auto mt-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: activeIndex === index ? "100%" : 0 }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Arrow */}
        <motion.button 
          onClick={() => handleArrowClick('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 
                     shadow-lg transition-all duration-300 focus:outline-none"
          whileHover={{ scale: 1.1, x: 3 }}
          whileTap={{ scale: 0.95 }}
          disabled={currentSlide === totalSlides - 1}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: currentSlide === totalSlides - 1 ? 0.5 : 1, x: 0 }}
          aria-label="Scroll right"
        >
          <ArrowForwardIosIcon fontSize="small" />
        </motion.button>

        {/* Slide indicators */}
        <motion.div 
          className="flex justify-center mt-8 gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {Array.from({ length: totalSlides }).map((_, i) => (
            <motion.button 
              key={i}
              onClick={() => scrollToSlide(i)}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              animate={{ 
                color: currentSlide === i ? "#ffffff" : "#4b5563",
                scale: currentSlide === i ? 1.2 : 1
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              aria-label={`Go to slide ${i + 1}`}
            >
              <FiberManualRecordIcon style={{ fontSize: '12px' }} />
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default FeaturedArtworks;