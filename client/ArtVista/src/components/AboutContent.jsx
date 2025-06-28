import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import { Palette, Users, Globe, Award } from 'lucide-react';

function AboutContent() {
  const teamMembers = [
    {
      name: 'Areena Dilawar',
      role: 'Founder & Creative Director',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bio: 'Areena founded ARTVISTA with a vision to create a global community for artists and art enthusiasts to connect, collaborate, and celebrate creativity.'
    },
    {
      name: 'Ali Hassan',
      role: 'Chief Technology Officer',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bio: 'With over 15 years of experience in technology, Ali leads our engineering team to build innovative digital solutions for the art community.'
    },
    {
      name: 'Alishba Iftikhar',
      role: 'Head of Artist Relations',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bio: 'As a former gallery curator, Alishba brings her expertise in artist representation and exhibition planning to support our growing artist community.'
    },
    {
      name: 'Absham Amir',
      role: 'Marketing Director',
      image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bio: 'Absham strategic approach to marketing has helped ARTVISTA reach art enthusiasts worldwide and build a recognizable brand in the art industry.'
    }
  ];

  const values = [
    {
      icon: <Palette size={32} />,
      title: 'Artistic Excellence',
      description: 'We believe in promoting and celebrating the highest quality of artistic expression across all mediums.'
    },
    {
      icon: <Users size={32} />,
      title: 'Community',
      description: 'We foster a supportive environment where artists and art enthusiasts can connect, learn, and grow together.'
    },
    {
      icon: <Globe size={32} />,
      title: 'Diversity & Inclusion',
      description: 'We embrace diverse perspectives, cultures, and artistic traditions, recognizing that art is universal.'
    },
    {
      icon: <Award size={32} />,
      title: 'Integrity',
      description: 'We conduct our business with honesty, transparency, and respect for the artists and customers we serve.'
    }
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/3184311/pexels-photo-3184311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Art Gallery Team" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl font-serif font-bold tracking-wider mb-4"
          >
            ABOUT ARTVISTA
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
            Connecting artists and art enthusiasts around the world since 2020
          </motion.p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-wider mb-4">OUR STORY</h2>
          <div className="h-1 w-24 bg-white/30 mx-auto"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="rounded-lg overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/2166456/pexels-photo-2166456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Art Gallery" 
                className="w-full h-auto"
              />
            </div>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="space-y-6"
          >
            <p className="text-gray-300">
              ARTVISTA was born from a simple idea: to create a platform where artists could showcase their work to a global audience and where art enthusiasts could discover unique pieces from creators around the world.
            </p>
            <p className="text-gray-300">
              Founded in 2020 by a team of artists and technology experts, we set out to build more than just a marketplace. We envisioned a community where creativity is celebrated, where artists receive fair compensation for their work, and where the joy of art is accessible to everyone.
            </p>
            <p className="text-gray-300">
              Today, ARTVISTA connects thousands of artists with art lovers across the globe. We've expanded beyond our digital roots to offer various services that support the artistic journey, from custom commissions to educational resources.
            </p>
            <p className="text-gray-300">
              As we continue to grow, our mission remains unchanged: to foster a world where art thrives and artists are empowered to share their unique visions with the world.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-wider mb-4">OUR VALUES</h2>
            <div className="h-1 w-24 bg-white/30 mx-auto"></div>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                className="bg-black/50 backdrop-blur-sm p-8 rounded-lg border border-white/10 hover:border-white/30 transition-colors duration-300"
              >
                <div className="text-white mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-wider mb-4">OUR TEAM</h2>
          <div className="h-1 w-24 bg-white/30 mx-auto"></div>
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
            Meet the passionate individuals behind ARTVISTA who work tirelessly to support artists and bring exceptional art to our community.
          </p>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="bg-gray-900/50 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 transition-all duration-300 hover:border-white/30 hover:shadow-lg"
            >
              <div className="h-72 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-gray-400 mb-4">{member.role}</p>
                <p className="text-gray-300 text-sm">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

export default AboutContent;