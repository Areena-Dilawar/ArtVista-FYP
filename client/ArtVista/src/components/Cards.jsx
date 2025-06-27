import React, { useEffect } from 'react';
import ParallaxCard from './ParallaxCard.jsx';

function Cards() {
  const categories = [
    { videoSrc: '/src/assets/Images/Pottery.mp4', title: 'Pottery' },
    { videoSrc: '/src/assets/Images/Sculpture.mp4', title: 'Sculpture' },
    { videoSrc: '/src/assets/Images/Painting.mp4', title: 'Painting' },
    { videoSrc: '/src/assets/Images/Video&Animation.mp4', title: 'Video & Animation' },
    { videoSrc: '/src/assets/Images/Architecture.mp4', title: 'Architecture' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const headerElement = document.querySelector('.categories-header');
      
      if (headerElement) {
        headerElement.style.transform = `translateY(${scrollPosition * 0.1}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='bg-black text-white min-h-screen relative overflow-hidden py-10'>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      <div className='relative z-10'>
        <div className='categories-header text-center space-y-4 mb-10'>
          <h2 className='text-white text-5xl font-serif tracking-wider'>
            OUR CATEGORIES
          </h2>
          <p className='text-gray-300 max-w-2xl mx-auto px-4'>
            Explore our diverse collection of art forms and creative expressions
          </p>
        </div>

        <div className='flex flex-col items-center px-4 space-y-3'>
          {categories.map((category, index) => (
            <ParallaxCard 
              key={index}
              videoSrc={category.videoSrc}
              title={category.title}
              category={category.title}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cards;