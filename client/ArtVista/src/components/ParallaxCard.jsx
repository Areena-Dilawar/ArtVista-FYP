import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

function ParallaxCard({ videoSrc, title, category, index }) {
  const cardRef = useRef(null);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.7, 1, 1, 0.7]);

  const entryDelay = index * 0.15;
  
  return (
    <div 
      ref={cardRef} 
      className="w-full h-96 my-10 perspective-1000 relative"
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ 
          duration: 0.8, 
          delay: entryDelay,
          ease: "easeOut" 
        }}
        style={{ scale, opacity }}
        className="w-full h-full relative"
      >
        <motion.div
          style={{ y }}
          className="w-full h-full rounded-lg overflow-hidden transform-gpu"
        >
          <video 
            src={videoSrc} 
            className="w-full h-full object-cover scale-110" 
            autoPlay 
            loop 
            muted 
          />
          
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        <motion.div
          className="absolute bottom-0 left-0 w-full h-full flex flex-col justify-end items-center z-10 p-8"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.h2 
            className="text-white text-5xl font-bold tracking-wider"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {title}
          </motion.h2>
          
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "40%" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-px bg-white/70 mt-4"
          />
          
          <Link to={`/category/${category}`}>
            <motion.div
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              className="mt-6 px-6 py-2 border border-white/80 rounded-full text-white text-sm tracking-wider hover:bg-white/10 transition-colors cursor-pointer"
            >
              EXPLORE
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ParallaxCard;