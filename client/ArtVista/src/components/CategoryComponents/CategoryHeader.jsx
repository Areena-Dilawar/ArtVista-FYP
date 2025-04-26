// import React from 'react';
// import { motion } from 'framer-motion';
// import { ChevronDown } from 'lucide-react';

// const CategoryHeader = ({
//   category,
//   title,
//   description,
//   onSortChange,
//   onFilterChange,
//   onViewChange,
//   currentView
// }) => {
//   return (
//     <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center">
//       <div>
//         <motion.h2 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-4xl md:text-5xl font-serif font-bold text-white mb-4"
//         >
//           {title} Collection
//         </motion.h2>
//         <motion.div 
//           initial={{ width: 0 }}
//           animate={{ width: "6rem" }}
//           transition={{ duration: 0.7, delay: 0.2 }}
//           className={`h-1 w-24 bg-${category} mb-6`}
//         />
//         <motion.p 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//           className="text-white/70 max-w-2xl"
//         >
//           {description}
//         </motion.p>
//       </div>
      
//       <div className="mt-6 md:mt-0 flex flex-wrap gap-4">
//         <div className="relative">
//           <select 
//             onChange={(e) => onSortChange(e.target.value)}
//             className="bg-black/40 border border-white/20 text-white py-2 pl-4 pr-10 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-pottery/50"
//           >
//             <option value="featured">Sort by: Featured</option>
//             <option value="price-asc">Price: Low to High</option>
//             <option value="price-desc">Price: High to Low</option>
//             <option value="newest">Newest First</option>
//           </select>
//           <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
//             <ChevronDown className="h-4 w-4 text-white/70" />
//           </div>
//         </div>
        
//         <div className="relative">
//           <select 
//             onChange={(e) => onFilterChange(e.target.value)}
//             className="bg-black/40 border border-white/20 text-white py-2 pl-4 pr-10 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-pottery/50"
//           >
//             <option value="all">Filter by: All</option>
//             <option value="new">New Arrivals</option>
//             <option value="best-seller">Best Sellers</option>
//           </select>
//           <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
//             <ChevronDown className="h-4 w-4 text-white/70" />
//           </div>
//         </div>
        
//         <button 
//           onClick={() => onViewChange('list')}
//           className={`${currentView === 'list' ? `bg-black/70 border-${category}/50` : 'bg-black/40 border-white/20'} border text-white py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-black/60 transition-colors`}
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
//           </svg>
//           List
//         </button>
        
//         <button 
//           onClick={() => onViewChange('grid')}
//           className={`${currentView === 'grid' ? `bg-black/70 border-${category}/50` : 'bg-black/40 border-white/20'} border text-white py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-${category}/20 transition-colors`}
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
//           </svg>
//           Grid
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CategoryHeader;