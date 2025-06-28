// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// function TopRatedArtist() {
//   const [artists, setArtists] = useState([]);
//   const [activeIndex, setActiveIndex] = useState(null);
//   const scrollContainerRef = useRef(null);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const itemsPerView = 3;
//   const navigate = useNavigate();

//   // ✅ Fetch artists from backend
//   useEffect(() => {
//     axios.get("http://localhost:5000/api/artists")
//       .then(res => setArtists(res.data.artists || []))
//       .catch(err => console.error("Failed to fetch artists:", err));
//   }, []);

//   const totalSlides = Math.ceil(artists.length / itemsPerView);

//   const scrollToSlide = (slideIndex) => {
//     const itemWidth = 260;
//     const newPosition = slideIndex * (itemsPerView * itemWidth);
//     scrollContainerRef.current?.scrollTo({ left: newPosition, behavior: 'smooth' });
//     setCurrentSlide(slideIndex);
//   };

//   const handleArrowClick = (direction) => {
//     const newSlide = direction === 'left'
//       ? Math.max(0, currentSlide - 1)
//       : Math.min(totalSlides - 1, currentSlide + 1);
//     scrollToSlide(newSlide);
//   };

//   const handleViewProfile = (artistId) => {
//     navigate(`/artist/${artistId}`);
//   };

//   return (
//     <motion.div
//       className="bg-black text-white py-20 overflow-hidden relative"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//     >
//       {/* Background glow */}
//       <motion.div
//         className="absolute top-1/3 right-1/4 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"
//         animate={{
//           scale: [1, 1.2, 1],
//           opacity: [0.05, 0.1, 0.05],
//         }}
//         transition={{
//           duration: 10,
//           repeat: Infinity,
//           repeatType: "reverse",
//           delay: 1
//         }}
//       ></motion.div>

//       <div className="text-center mb-12 relative z-10">
//         <motion.h2
//           className="text-5xl font-serif font-bold tracking-wider"
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           TOP RATED ARTISTS
//         </motion.h2>
//         <motion.div
//           className="h-1 w-0 bg-white/30 mx-auto mt-4 rounded-full"
//           animate={{ width: "10rem" }}
//           transition={{ duration: 0.8, delay: 0.3 }}
//         ></motion.div>
//       </div>

//       <div className="relative px-4 md:px-10 lg:px-20 mx-auto max-w-7xl">
//         {/* Left Arrow */}
//         <motion.button 
//           onClick={() => handleArrowClick('left')}
//           className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 shadow-lg transition-all duration-300 focus:outline-none"
//           whileHover={{ scale: 1.1, x: -3 }}
//           whileTap={{ scale: 0.95 }}
//           disabled={currentSlide === 0}
//           initial={{ opacity: 0, x: -10 }}
//           animate={{ opacity: currentSlide === 0 ? 0.5 : 1, x: 0 }}
//         >
//           <ArrowBackIosNewIcon fontSize="small" />
//         </motion.button>

//         {/* Scrollable Artist Cards */}
//         <div 
//           ref={scrollContainerRef}
//           className="flex overflow-x-hidden gap-6 pb-4 pt-2"
//           style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//         >
//           {artists.map((artist, index) => (
//             <motion.div 
//               key={artist._id}
//               className="flex-shrink-0 flex flex-col items-center"
//               onMouseEnter={() => setActiveIndex(index)}
//               onMouseLeave={() => setActiveIndex(null)}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//             >
//               <motion.div 
//                 className="w-60 h-60 bg-gray-900 rounded-lg overflow-hidden shadow-lg cursor-pointer relative"
//                 whileHover={{ scale: 1.05 }}
//                 animate={activeIndex === index ? { scale: 1.1 } : { scale: 1 }}
//                 transition={{ type: "spring", stiffness: 300, damping: 20 }}
//               >
//                 <img 
//                   src={artist.image} 
//                   alt={artist.name} 
//                   className="w-full h-full object-cover"
//                 />

//                 <AnimatePresence>
//                   {activeIndex === index && (
//                     <motion.div 
//                       className="absolute inset-0 flex flex-col justify-end items-center pb-6 bg-gradient-to-t from-black/80 to-transparent"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       exit={{ opacity: 0 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       <motion.button
//                         whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.9)" }}
//                         whileTap={{ scale: 0.95 }}
//                         className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium"
//                         onClick={() => handleViewProfile(artist._id)}
//                       >
//                         View Profile
//                       </motion.button>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>

//                 <motion.div 
//                   className="absolute inset-0 border-2 border-white/70 rounded-lg"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: activeIndex === index ? 1 : 0 }}
//                   transition={{ duration: 0.2 }}
//                 ></motion.div>
//               </motion.div>

//               <div className="mt-4 text-center">
//                 <motion.p 
//                   className="font-serif text-lg"
//                   animate={activeIndex === index ? 
//                     { color: "#ffffff", fontSize: "1.25rem" } : 
//                     { color: "#9ca3af", fontSize: "1.125rem" }
//                   }
//                   transition={{ duration: 0.3 }}
//                 >
//                   {artist.name}
//                 </motion.p>

//                 <motion.p
//                   className="text-sm text-gray-400 mt-1"
//                   animate={activeIndex === index ? 
//                     { opacity: 1 } : 
//                     { opacity: 0.7 }
//                   }
//                 >
//                   {artist.specialty}
//                 </motion.p>

//                 <motion.div 
//                   className="h-1 bg-white/30 mx-auto mt-2 rounded-full"
//                   initial={{ width: 0 }}
//                   animate={{ width: activeIndex === index ? "100%" : 0 }}
//                   transition={{ duration: 0.3 }}
//                 ></motion.div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Right Arrow */}
//         <motion.button 
//           onClick={() => handleArrowClick('right')}
//           className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 shadow-lg transition-all duration-300 focus:outline-none"
//           whileHover={{ scale: 1.1, x: 3 }}
//           whileTap={{ scale: 0.95 }}
//           disabled={currentSlide === totalSlides - 1}
//           initial={{ opacity: 0, x: 10 }}
//           animate={{ opacity: currentSlide === totalSlides - 1 ? 0.5 : 1, x: 0 }}
//         >
//           <ArrowForwardIosIcon fontSize="small" />
//         </motion.button>

//         {/* Slide Indicators */}
//         <motion.div 
//           className="flex justify-center mt-8 gap-2"
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5 }}
//         >
//           {Array.from({ length: totalSlides }).map((_, i) => (
//             <motion.button 
//               key={i}
//               onClick={() => scrollToSlide(i)}
//               whileHover={{ scale: 1.3 }}
//               whileTap={{ scale: 0.9 }}
//               animate={{ 
//                 color: currentSlide === i ? "#ffffff" : "#4b5563",
//                 scale: currentSlide === i ? 1.2 : 1
//               }}
//               transition={{ type: "spring", stiffness: 400, damping: 10 }}
//             >
//               <FiberManualRecordIcon style={{ fontSize: '12px' }} />
//             </motion.button>
//           ))}
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// }

// export default TopRatedArtist;
