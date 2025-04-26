// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import DeleteIcon from '@mui/icons-material/Delete';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import GridViewIcon from '@mui/icons-material/GridView';
// import ViewListIcon from '@mui/icons-material/ViewList';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import { motion, AnimatePresence } from 'framer-motion';

// function CategoryPage() {
//   const { categoryName } = useParams();
//   const [cart, setCart] = useState([]);
//   const [wishlist, setWishlist] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [viewMode, setViewMode] = useState('grid');
//   const [sortBy, setSortBy] = useState('featured');
//   const [showFilters, setShowFilters] = useState(false);
//   const [priceRange, setPriceRange] = useState([0, 1000]);

//   const items = [
//     {
//       id: 1,
//       name: "Handcrafted Vase",
//       price: 129.99,
//       image: "https://images.pexels.com/photos/2162938/pexels-photo-2162938.jpeg",
//       description: "Beautiful handcrafted ceramic vase with unique patterns",
//       category: "pottery",
//       rating: 4.5,
//       stock: 15,
//       features: ["Hand-made", "Unique design", "Durable material"],
//       dimensions: "12\" x 6\" x 6\"",
//       weight: "2.5 lbs"
//     },
//     {
//       id: 2,
//       name: "Modern Sculpture",
//       price: 299.99,
//       image: "https://images.pexels.com/photos/134402/pexels-photo-134402.jpeg",
//       description: "Contemporary abstract sculpture made from recycled materials",
//       category: "sculpture",
//       rating: 4.8,
//       stock: 8,
//       features: ["Eco-friendly", "Modern design", "Lightweight"],
//       dimensions: "18\" x 10\" x 10\"",
//       weight: "5 lbs"
//     },
//     {
//       id: 3,
//       name: "Art Print",
//       price: 79.99,
//       image: "https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg",
//       description: "Limited edition art print signed by the artist",
//       category: "prints",
//       rating: 4.2,
//       stock: 25,
//       features: ["Limited edition", "Signed", "Museum quality"],
//       dimensions: "24\" x 36\"",
//       weight: "0.5 lbs"
//     }
//   ];

//   const relatedItems = items.filter(item => item.category === categoryName.toLowerCase());

//   const addToCart = (item, quantity = 1) => {
//     const existingItem = cart.find(i => i.id === item.id);
//     if (existingItem) {
//       setCart(cart.map(i => 
//         i.id === item.id 
//           ? { ...i, quantity: i.quantity + quantity }
//           : i
//       ));
//     } else {
//       setCart([...cart, { ...item, quantity }]);
//     }
//   };

//   const removeFromCart = (itemId) => {
//     setCart(cart.filter(item => item.id !== itemId));
//   };

//   const toggleWishlist = (item) => {
//     if (wishlist.find(i => i.id === item.id)) {
//       setWishlist(wishlist.filter(i => i.id !== item.id));
//     } else {
//       setWishlist([...wishlist, item]);
//     }
//   };

//   const ProductDetails = ({ item, onClose }) => (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//     >
//       <motion.div
//         initial={{ y: 50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         exit={{ y: 50, opacity: 0 }}
//         className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
//       >
//         <div className="p-6">
//           <div className="flex justify-between items-start mb-6">
//             <h2 className="text-3xl font-bold">{item.name}</h2>
//             <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//               ×
//             </button>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div>
//               <img src={item.image} alt={item.name} className="w-full h-96 object-cover rounded-lg" />
//             </div>
            
//             <div>
//               <div className="mb-6">
//                 <p className="text-3xl font-bold text-gray-900 mb-4">${item.price}</p>
//                 <p className="text-gray-600 mb-4">{item.description}</p>
                
//                 <div className="space-y-4">
//                   <div>
//                     <h3 className="font-semibold mb-2">Features:</h3>
//                     <ul className="list-disc list-inside space-y-1">
//                       {item.features.map((feature, index) => (
//                         <li key={index} className="text-gray-600">{feature}</li>
//                       ))}
//                     </ul>
//                   </div>
                  
//                   <div>
//                     <h3 className="font-semibold mb-2">Specifications:</h3>
//                     <p className="text-gray-600">Dimensions: {item.dimensions}</p>
//                     <p className="text-gray-600">Weight: {item.weight}</p>
//                   </div>
                  
//                   <div>
//                     <h3 className="font-semibold mb-2">Stock Status:</h3>
//                     <p className={`${item.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
//                       {item.stock > 0 ? `${item.stock} units available` : 'Out of stock'}
//                     </p>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="flex space-x-4">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700"
//                   onClick={() => {
//                     addToCart(item);
//                     onClose();
//                   }}
//                 >
//                   Add to Cart
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   className="flex-1 border border-blue-600 text-blue-600 py-3 px-6 rounded-lg hover:bg-blue-50"
//                   onClick={() => {
//                     window.location.href = '/checkout';
//                   }}
//                 >
//                   Buy Now
//                 </motion.button>
//               </div>
//             </div>
//           </div>
          
//           <div className="mt-12">
//             <h3 className="text-2xl font-bold mb-6">You May Also Like</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {relatedItems.slice(0, 3).map((relatedItem) => (
//                 <motion.div
//                   key={relatedItem.id}
//                   whileHover={{ scale: 1.02 }}
//                   className="bg-white rounded-lg shadow-md overflow-hidden"
//                 >
//                   <img src={relatedItem.image} alt={relatedItem.name} className="w-full h-48 object-cover" />
//                   <div className="p-4">
//                     <h4 className="font-semibold mb-2">{relatedItem.name}</h4>
//                     <p className="text-gray-600">${relatedItem.price}</p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="bg-white shadow-md sticky top-0 z-40">
//         <div className="container mx-auto px-4 py-6">
//           <div className="flex items-center justify-between">
//             <motion.a 
//               href="/"
//               whileHover={{ x: -5 }}
//               className="flex items-center text-gray-800 hover:text-gray-600"
//             >
//               <ArrowBackIcon className="w-6 h-6 mr-2" />
//               Back
//             </motion.a>
//             <h1 className="text-3xl font-bold text-gray-800 capitalize">{categoryName}</h1>
//             <div className="flex items-center space-x-4">
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 className="relative"
//               >
//                 <FavoriteIcon className="w-6 h-6 text-gray-600" />
//                 {wishlist.length > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
//                     {wishlist.length}
//                   </span>
//                 )}
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 className="relative"
//               >
//                 <ShoppingCartIcon className="w-6 h-6 text-gray-600" />
//                 {cart.length > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
//                     {cart.length}
//                   </span>
//                 )}
//               </motion.button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white shadow-sm">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg"
//               >
//                 <FilterListIcon className="w-5 h-5" />
//                 <span>Filters</span>
//               </motion.button>
              
//               <div className="relative">
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="appearance-none bg-gray-100 px-4 py-2 pr-8 rounded-lg focus:outline-none"
//                 >
//                   <option value="featured">Featured</option>
//                   <option value="price-low">Price: Low to High</option>
//                   <option value="price-high">Price: High to Low</option>
//                   <option value="newest">Newest</option>
//                 </select>
//                 <KeyboardArrowDownIcon className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
//               </div>
//             </div>
            
//             <div className="flex items-center space-x-2">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 onClick={() => setViewMode('grid')}
//                 className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-gray-200' : 'bg-gray-100'}`}
//               >
//                 <GridViewIcon className="w-5 h-5" />
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 onClick={() => setViewMode('list')}
//                 className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-gray-200' : 'bg-gray-100'}`}
//               >
//                 <ViewListIcon className="w-5 h-5" />
//               </motion.button>
//             </div>
//           </div>
          
//           <AnimatePresence>
//             {showFilters && (
//               <motion.div
//                 initial={{ height: 0, opacity: 0 }}
//                 animate={{ height: 'auto', opacity: 1 }}
//                 exit={{ height: 0, opacity: 0 }}
//                 className="overflow-hidden"
//               >
//                 <div className="py-4 border-t mt-4">
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div>
//                       <h3 className="font-semibold mb-2">Price Range</h3>
//                       <input
//                         type="range"
//                         min="0"
//                         max="1000"
//                         value={priceRange[1]}
//                         onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
//                         className="w-full"
//                       />
//                       <div className="flex justify-between text-sm text-gray-600">
//                         <span>${priceRange[0]}</span>
//                         <span>${priceRange[1]}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8">
//         <div className={`
//           ${viewMode === 'grid' 
//             ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
//             : 'space-y-6'
//           }
//         `}>
//           {items.map((item) => (
//             <motion.div
//               key={item.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className={`
//                 bg-white rounded-lg shadow-lg overflow-hidden
//                 ${viewMode === 'list' ? 'flex' : ''}
//               `}
//               onClick={() => setSelectedItem(item)}
//             >
//               <img 
//                 src={item.image} 
//                 alt={item.name}
//                 className={`
//                   object-cover
//                   ${viewMode === 'list' ? 'w-48 h-48' : 'w-full h-64'}
//                 `}
//               />
//               <div className="p-6 flex-1">
//                 <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
//                 <p className="text-gray-600 mb-4">{item.description}</p>
//                 <div className="flex items-center justify-between">
//                   <span className="text-2xl font-bold text-gray-800">${item.price}</span>
//                   <div className="flex space-x-2">
//                     <motion.button
//                       whileHover={{ scale: 1.1 }}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         toggleWishlist(item);
//                       }}
//                       className={`p-2 rounded-full ${
//                         wishlist.find(i => i.id === item.id)
//                           ? 'bg-red-500 text-white'
//                           : 'bg-gray-200 text-gray-600'
//                       }`}
//                     >
//                       <FavoriteIcon className="w-5 h-5" />
//                     </motion.button>
//                     {cart.find(i => i.id === item.id) ? (
//                       <motion.button
//                         whileHover={{ scale: 1.1 }}
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           removeFromCart(item.id);
//                         }}
//                         className="p-2 rounded-full bg-red-500 text-white"
//                       >
//                         <DeleteIcon className="w-5 h-5" />
//                       </motion.button>
//                     ) : (
//                       <motion.button
//                         whileHover={{ scale: 1.1 }}
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           addToCart(item);
//                         }}
//                         className="px-4 py-2 bg-blue-500 text-white rounded-full"
//                       >
//                         Add to Cart
//                       </motion.button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       <AnimatePresence>
//         {selectedItem && (
//           <ProductDetails
//             item={selectedItem}
//             onClose={() => setSelectedItem(null)}
//           />
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// export default CategoryPage;