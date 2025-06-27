import React from 'react';
import { Link } from 'react-router-dom';
import {
  Facebook, Twitter, Instagram, Linkedin,
  Mail, Phone, MapPin, Globe, Palette
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { themeColors } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="py-16 px-4 sm:px-6 lg:px-8 border-t backdrop-blur-sm"
      style={{
        backgroundColor: `${themeColors.background}CC`,
        borderColor: `${themeColors.secondary}33`
      }}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Logo and Social */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <Palette className="w-10 h-10" style={{ color: themeColors.primary }} />
              <h3
                className="text-2xl font-serif font-bold ml-2"
                style={{ color: themeColors.text }}
              >
                ARTVISTA
              </h3>
            </div>
            <p
              className="mb-6 max-w-md"
              style={{ color: `${themeColors.text}B3` }}
            >
              A curated marketplace showcasing exceptional art pieces from around the world.
              Connecting artists with collectors since 2010.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="https://facebook.com" icon={<Facebook className="h-5 w-5" />} />
              <SocialLink href="https://twitter.com" icon={<Twitter className="h-5 w-5" />} />
              <SocialLink href="https://instagram.com" icon={<Instagram className="h-5 w-5" />} />
              <SocialLink href="https://linkedin.com" icon={<Linkedin className="h-5 w-5" />} />
            </div>
          </div>

          {/* Categories */}
          <div>
            <FooterHeading text="Categories" />
            <ul className="space-y-2">
              <FooterLink to="/category/Pottery" text="Pottery" />
              <FooterLink to="/category/Sculpture" text="Sculpture" />
              <FooterLink to="/category/Painting" text="Painting" />
              <FooterLink to="/category/Video & Animation" text="Video & Animation" />
              <FooterLink to="/category/Architecture" text="Architecture" />
            </ul>
          </div>
          
          {/* Information */}
          <div>
            <FooterHeading text="Information" />
            <ul className="space-y-2">
              <FooterLink to="/about" text="About Us" />
              <FooterLink to="/about" text="Artist Partnerships" />
              <FooterLink to="/about" text="Careers" />
              <FooterLink to="/services" text="Services" />
              <FooterLink to="/contact" text="Contact" />
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <FooterHeading text="Customer Service" />
            <ul className="space-y-2">
              <FooterLink to="/faq" text="FAQ" />
              <FooterLink to="/customer-dashboard/shipping-returns" text="Shipping & Returns" />
              <FooterLink to="/care-instructions" text="Care Instructions" />
              <FooterLink to="/customer-dashboard/orders" text="Track Order" />
              <FooterLink to="/privacy-policy" text="Privacy Policy" />
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div 
          className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center"
          style={{ borderColor: `${themeColors.secondary}33` }}
        >
          <p style={{ color: `${themeColors.text}80` }} className="text-sm mb-4 md:mb-0">
            © {currentYear} ARTVISTA. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <Link 
              to="/terms" 
              className="text-sm hover:opacity-100 transition-opacity"
              style={{ color: `${themeColors.text}80`, opacity: 0.8 }}
            >
              Terms of Service
            </Link>
            <Link 
              to="/privacy-policy" 
              className="text-sm hover:opacity-100 transition-opacity"
              style={{ color: `${themeColors.text}80`, opacity: 0.8 }}
            >
              Privacy Policy
            </Link>
            <Link 
              to="/accessibility" 
              className="text-sm hover:opacity-100 transition-opacity"
              style={{ color: `${themeColors.text}80`, opacity: 0.8 }}
            >
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper Components
const FooterHeading = ({ text }) => {
  const { themeColors } = useTheme();
  return (
    <h4
      className="font-medium text-sm tracking-wider uppercase mb-4"
      style={{ color: themeColors.text }}
    >
      {text}
    </h4>
  );
};

const FooterLink = ({ to, text }) => {
  const { themeColors } = useTheme();
  return (
    <li>
      <Link
        to={to}
        className="hover:opacity-100 transition-opacity"
        style={{ color: `${themeColors.text}B3`, opacity: 0.8 }}
      >
        {text}
      </Link>
    </li>
  );
};

const SocialLink = ({ href, icon }) => {
  const { themeColors } = useTheme();
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
      style={{
        backgroundColor: 'transparent',
        color: themeColors.text,
        border: `1px solid ${themeColors.secondary}66`
      }}
    >
      {icon}
    </a>
  );
};

export default Footer;