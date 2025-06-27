import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductModal from '../components/ProductModal';
import { categoryProducts, categoryTools } from '../data/artworks';
import { ArrowLeft, Filter, SlidersHorizontal, ShoppingCart, Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import axios from 'axios';

function CategoryPage() {
  const { categoryName } = useParams();
  const [selectedTab, setSelectedTab] = useState('products');
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState('featured');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { wishlistItems, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Define category themes
  const categoryThemes = {
    Pottery: {
      bgColor: 'bg-amber-900/20',
      borderColor: 'border-amber-500/50',
      hoverBorderColor: 'hover:border-amber-500/70',
      textColor: 'text-amber-400',
      buttonColor: 'bg-amber-600 hover:bg-amber-700'
    },
    Sculpture: {
      bgColor: 'bg-stone-800/20',
      borderColor: 'border-stone-500/50',
      hoverBorderColor: 'hover:border-stone-500/70',
      textColor: 'text-stone-400',
      buttonColor: 'bg-stone-600 hover:bg-stone-700'
    },
    Painting: {
      bgColor: 'bg-blue-900/20',
      borderColor: 'border-blue-500/50',
      hoverBorderColor: 'hover:border-blue-500/70',
      textColor: 'text-blue-400',
      buttonColor: 'bg-blue-600 hover:bg-blue-700'
    },
    'Video & Animation': {
      bgColor: 'bg-purple-900/20',
      borderColor: 'border-purple-500/50',
      hoverBorderColor: 'hover:border-purple-500/70',
      textColor: 'text-purple-400',
      buttonColor: 'bg-purple-600 hover:bg-purple-700'
    },
    Architecture: {
      bgColor: 'bg-gray-800/20',
      borderColor: 'border-gray-500/50',
      hoverBorderColor: 'hover:border-gray-500/70',
      textColor: 'text-gray-400',
      buttonColor: 'bg-gray-600 hover:bg-gray-700'
    },
    default: {
      bgColor: 'bg-black/20',
      borderColor: 'border-white/50',
      hoverBorderColor: 'hover:border-white/70',
      textColor: 'text-white',
      buttonColor: 'bg-white hover:bg-gray-200'
    }
  };

  const theme = categoryThemes[categoryName] || categoryThemes.default;
  // Get category data
  const tools = categoryTools[categoryName] || [];
  
  const [filteredItems, setFilteredItems] = useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    // Apply filters based on selected tab
    const items = selectedTab === 'products' ? products : tools;
    
    // Filter by price
    const filtered = items.filter(item => 
      item.price >= priceRange[0] && item.price <= priceRange[1]
    );
    
    // Sort items
    let sorted = [...filtered];
    if (sortBy === 'priceLow') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceHigh') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'nameAZ') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'nameZA') {
      sorted.sort((a, b) => b.title.localeCompare(a.title));
    }
    
    setFilteredItems(sorted);
  }, [selectedTab, priceRange, sortBy, products, tools]);

  const handleFilterToggle = () => {
    setFilterOpen(!filterOpen);
  };

  const handlePriceChange = (e, index) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(e.target.value, 10);
    setPriceRange(newRange);
  };

  const toggleWishlist = (item) => {
    if (isInWishlist(item.id)) {
      removeFromWishlist(item.id);
    } else {
      addToWishlist(item);
    }
  };

  return (
    <div className={`min-h-screen bg-black text-white ${theme.bgColor}`}>
      <Navbar />
      
      <div className="pt-16">
        {/* Category Header */}
        <div className="relative py-24 bg-gradient-to-b from-gray-900 to-black">
          <div className="absolute top-6 left-6 z-10">
            <Link to="/">
              <motion.div
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center text-white/70 hover:text-white"
              >
                <ArrowLeft className="mr-2" size={20} />
                <span>Back to Home</span>
              </motion.div>
            </Link>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-wider mb-4">
              {categoryName.toUpperCase()}
            </h1>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "10rem" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-1 bg-white/30 mx-auto rounded-full"
            ></motion.div>
            <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
              Explore our collection of {categoryName.toLowerCase()} pieces from talented artists around the world.
            </p>
          </motion.div>
        </div>
        
        {/* Tab Navigation */}
        <div className="bg-gray-900/50 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <button
                  onClick={() => setSelectedTab('products')}
                  className={`py-4 px-1 text-sm font-medium ${
                    selectedTab === 'products'
                      ? 'border-b-2 border-white text-white'
                      : 'border-b-2 border-transparent text-gray-500 hover:text-white hover:border-gray-300'
                  }`}
                >
                  Artworks
                </button>
                <button
                  onClick={() => setSelectedTab('tools')}
                  className={`py-4 px-1 text-sm font-medium ${
                    selectedTab === 'tools'
                      ? 'border-b-2 border-white text-white'
                      : 'border-b-2 border-transparent text-gray-500 hover:text-white hover:border-gray-300'
                  }`}
                >
                  Tools & Supplies
                </button>
              </nav>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Filter Controls */}
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="mb-4 md:mb-0">
                <h2 className="text-xl font-medium">
                  {selectedTab === 'products' ? 'Artworks' : 'Tools & Supplies'} ({filteredItems.length})
                </h2>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-gray-800 border border-gray-700 text-white rounded-md py-2 pl-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-white/20"
                  >
                    <option value="featured">Featured</option>
                    <option value="priceLow">Price: Low to High</option>
                    <option value="priceHigh">Price: High to Low</option>
                    <option value="nameAZ">Name: A to Z</option>
                    <option value="nameZA">Name: Z to A</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                    <SlidersHorizontal size={16} />
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleFilterToggle}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors"
                >
                  <Filter size={16} />
                  <span>Filters</span>
                </motion.button>
              </div>
            </div>
            
            {/* Filter Panel */}
            <AnimatePresence>
              {filterOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-8 p-6 bg-gray-900/50 backdrop-blur-sm rounded-lg border border-white/10"
                >
                  <h3 className="text-lg font-medium mb-4">Filter by Price</h3>
                  <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="w-full sm:w-auto">
                      <label htmlFor="min-price" className="block text-sm font-medium text-gray-300 mb-1">
                        Min Price: ${priceRange[0]}
                      </label>
                      <input
                        type="range"
                        id="min-price"
                        min="0"
                        max="5000"
                        step="50"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(e, 0)}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="w-full sm:w-auto">
                      <label htmlFor="max-price" className="block text-sm font-medium text-gray-300 mb-1">
                        Max Price: ${priceRange[1]}
                      </label>
                      <input
                        type="range"
                        id="max-price"
                        min="0"
                        max="5000"
                        step="50"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(e, 1)}
                        className="w-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Products/Tools Grid */}
            {loading && <div>Loading products...</div>}
            {error && <div className="text-red-500">{error}</div>}
            {!loading && !error && filteredItems.length > 0 ? (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              >
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    whileHover={{ y: -10 }}
                    className="bg-gray-900/50 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 shadow-lg"
                  >
                    <div 
                      className="h-48 sm:h-64 overflow-hidden cursor-pointer"
                      onClick={() => setSelectedProduct(item)}
                    >
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 
                          className="text-lg font-bold cursor-pointer hover:text-gray-300"
                          onClick={() => setSelectedProduct(item)}
                        >
                          {item.title}
                        </h3>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleWishlist(item)}
                          className="text-gray-400 hover:text-white"
                        >
                          <Heart
                            className={isInWishlist(item.id) ? 'fill-current text-red-500' : ''}
                            size={20}
                          />
                        </motion.button>
                      </div>
                      
                      {selectedTab === 'products' && (
                        <p className="text-gray-400 text-sm mb-2">By {item.artist}</p>
                      )}
                      <p className="text-white mb-4">${item.price}</p>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.description}</p>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
                        onClick={() => setSelectedProduct(item)}
                      >
                        <ShoppingCart size={16} />
                        <span>View Details</span>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-gray-400">No items found matching your criteria.</p>
                <button
                  onClick={() => setPriceRange([0, 5000])}
                  className="mt-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default CategoryPage;