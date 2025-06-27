import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Calendar, MapPin, Clock, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Sample data for events
const upcomingEvents = [
  {
    id: 1,
    title: "Modern Art Exhibition",
    image: "https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    date: "June 15-20, 2025",
    location: "Manhattan Gallery, New York",
    description: "Explore cutting-edge modern art from emerging artists around the globe. This exhibition showcases innovative techniques and bold expressions.",
    time: "10:00 AM - 8:00 PM",
    availableSeats: 75
  },
  {
    id: 2,
    title: "Sculpture Symposium",
    image: "https://images.pexels.com/photos/1918290/pexels-photo-1918290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    date: "July 5-10, 2025",
    location: "Contemporary Arts Center, Chicago",
    description: "Join master sculptors for live demonstrations, workshops, and an immersive journey into three-dimensional art forms.",
    time: "9:00 AM - 6:00 PM",
    availableSeats: 50
  },
  {
    id: 3,
    title: "Digital Art Festival",
    image: "https://images.pexels.com/photos/3109807/pexels-photo-3109807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    date: "August 12-15, 2025",
    location: "Tech Arts Hub, San Francisco",
    description: "Experience the intersection of technology and creativity at this immersive digital art festival featuring VR installations, interactive exhibits, and more.",
    time: "11:00 AM - 9:00 PM",
    availableSeats: 120
  }
];

const pastEvents = [
  {
    id: 4,
    title: "Renaissance Retrospective",
    image: "https://images.pexels.com/photos/2372978/pexels-photo-2372978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    date: "March 10-25, 2025",
    location: "Historical Museum, Florence",
    description: "A celebration of Renaissance masterpieces, featuring rare exhibits and historical context.",
    attendees: 3240
  },
  {
    id: 5,
    title: "Photography Summit",
    image: "https://images.pexels.com/photos/1209843/pexels-photo-1209843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    date: "February 5-12, 2025",
    location: "Urban Light Gallery, London",
    description: "An international gathering of photographers showcasing diverse perspectives and techniques.",
    attendees: 1850
  },
  {
    id: 6,
    title: "Ceramic Arts Expo",
    image: "https://images.pexels.com/photos/4207705/pexels-photo-4207705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    date: "January 20-28, 2025",
    location: "Crafts Center, Tokyo",
    description: "Celebrated pottery and ceramic artists exhibited their finest works in this international expo.",
    attendees: 2740
  }
];

function EventsPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % upcomingEvents.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + upcomingEvents.length) % upcomingEvents.length);
  };

  const handleReserve = (eventId) => {
    if (!user) {
      navigate('/login', { state: { from: '/events' } });
      return;
    }
    
    // In a real app, this would call an API to reserve a spot
    alert(`Reserved your spot for event #${eventId}!`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-20 pb-10"> {/* Padding to account for navbar */}
        <div className="relative h-[70vh] overflow-hidden">
          {/* Background image with overlay */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-black/60 z-10"></div>
            {/* <img 
              src="pexels-riciardus-69903.jpg"
              alt="Art events" 
              className="w-full h-full object-cover"
            /> */}
          </div>
          
          {/* Content */}
          <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-5xl md:text-6xl font-serif font-bold tracking-wider mb-4"
            >
              ART EVENTS
            </motion.h1>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "120px" }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="h-1 bg-white"
            ></motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-6 max-w-2xl text-lg"
            >
              Experience the world of art through exclusive exhibitions, and gatherings
            </motion.p>
          </div>
        </div>
      </div>
      
      {/* Upcoming Events Slider */}
      <div className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold tracking-wider mb-2">UPCOMING EVENTS</h2>
            <div className="h-1 w-24 bg-white/30 mx-auto"></div>
          </div>
          
          <div className="relative">
            {/* Slider Navigation */}
            <button 
              onClick={handlePrevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 p-3 rounded-full"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button 
              onClick={handleNextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 p-3 rounded-full"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            
            {/* Slider */}
            <div className="overflow-hidden">
              <motion.div 
                className="flex"
                initial={{ x: 0 }}
                animate={{ x: `-${currentSlide * 100}%` }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
              >
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                      <div className="h-96 overflow-hidden rounded-lg">
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      
                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold">{event.title}</h3>
                        
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <Calendar className="h-5 w-5 mr-3 text-gray-400" />
                            <span>{event.date}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <MapPin className="h-5 w-5 mr-3 text-gray-400" />
                            <span>{event.location}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 mr-3 text-gray-400" />
                            <span>{event.time}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <Users className="h-5 w-5 mr-3 text-gray-400" />
                            <span>{event.availableSeats} seats available</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-300">{event.description}</p>
                        
                        <button 
                          onClick={() => handleReserve(event.id)}
                          className="px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
                        >
                          Reserve Your Spot
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
            
            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {upcomingEvents.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-gray-600'}`}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Past Events */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold tracking-wider mb-2">PAST EVENTS</h2>
            <div className="h-1 w-24 bg-white/30 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastEvents.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 rounded-lg overflow-hidden shadow-lg border border-white/10"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-400">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{event.date}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-400">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{event.location}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-400">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{event.attendees.toLocaleString()} attendees</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm line-clamp-2">{event.description}</p>
                  
                  <button className="mt-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-full text-sm transition-colors">
                    View Gallery
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="py-16 bg-gradient-to-b from-purple-900/30 to-black">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated on Future Events</h2>
          <p className="text-gray-300 mb-8">Subscribe to our newsletter to get notified about upcoming exhibitions and art events near you.</p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
              required
            />
            <button 
              type="submit"
              className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default EventsPage;