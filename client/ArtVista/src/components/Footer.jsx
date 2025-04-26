import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-black/80 backdrop-blur-sm border-t border-white/10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-serif font-bold text-white mb-4">ARTVISTA</h3>
            <p className="text-white/70 mb-6 max-w-md">
              A curated marketplace showcasing exceptional art pieces from around the world. 
              Connecting artists with collectors since 2010.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                <LinkedIn className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-montserrat font-medium text-sm tracking-wider uppercase mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/category/pottery">
                  <span className="text-white/70 hover:text-white transition-colors cursor-pointer">Pottery</span>
                </Link>
              </li>
              <li>
                <Link to="/category/sculpture">
                  <span className="text-white/70 hover:text-white transition-colors cursor-pointer">Sculpture</span>
                </Link>
              </li>
              <li>
                <Link to="/category/painting">
                  <span className="text-white/70 hover:text-white transition-colors cursor-pointer">Painting</span>
                </Link>
              </li>
              <li>
                <Link to="/category/animation">
                  <span className="text-white/70 hover:text-white transition-colors cursor-pointer">Video & Animation</span>
                </Link>
              </li>
              <li>
                <Link to="/category/architecture">
                  <span className="text-white/70 hover:text-white transition-colors cursor-pointer">Architecture</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-montserrat font-medium text-sm tracking-wider uppercase mb-4">Information</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Artist Partnerships</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Exhibitions</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-montserrat font-medium text-sm tracking-wider uppercase mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Care Instructions</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Track Order</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm mb-4 md:mb-0">© {new Date().getFullYear()} ARTVISTA. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-white/50 text-sm hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-white/50 text-sm hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/50 text-sm hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
