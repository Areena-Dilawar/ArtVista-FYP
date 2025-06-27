import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const defaultTheme = {
  primary: '#000000', // Black
  secondary: '#333333',
  accent: '#ffffff', // White
  background: '#000000',
  text: '#ffffff'
};

const categoryThemes = {
  Painting: {
    primary: '#2c3e50',
    secondary: '#3498db',
    accent: '#e74c3c',
    background: '#1a1a2e',
    text: '#ffffff'
  },
  Pottery: {
    primary: '#8B4513', // Brown
    secondary: '#A0522D',
    accent: '#D2B48C', // Tan
    background: '#3c2f2f',
    text: '#f5f5f5'
  },
  Sculpture: {
    primary: '#607D8B', // Slate
    secondary: '#455A64',
    accent: '#90A4AE',
    background: '#37474F',
    text: '#ECEFF1'
  },
  Architecture: {
    primary: '#455A64', // Blue Grey
    secondary: '#78909C',
    accent: '#CFD8DC',
    background: '#263238',
    text: '#ECEFF1'
  },
  'Video & Animation': {
    primary: '#6A1B9A', // Purple
    secondary: '#9C27B0',
    accent: '#CE93D8',
    background: '#4A148C',
    text: '#F3E5F5'
  },
  Photography: {
    primary: '#212121', // Dark Grey
    secondary: '#616161',
    accent: '#9E9E9E',
    background: '#000000',
    text: '#FAFAFA'
  },
  Music: {
    primary: '#1565C0', // Blue
    secondary: '#42A5F5',
    accent: '#BBDEFB',
    background: '#0D47A1',
    text: '#E3F2FD'
  }
};

const ThemeContext = createContext({
  currentTheme: 'default',
  themeColors: defaultTheme,
  setTheme: () => {}
});

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('default');
  const [themeColors, setThemeColors] = useState(defaultTheme);

  const location = useLocation();

  useEffect(() => {
    // Check if we're on a category page
    const categoryMatch = location.pathname.match(/\/category\/([^/]+)/);
    if (categoryMatch) {
      const category = decodeURIComponent(categoryMatch[1]);
      setTheme(category);
    } else {
      setTheme('default');
    }
  }, [location]);

  const setTheme = (theme) => {
    setCurrentTheme(theme);
    if (theme in categoryThemes) {
      setThemeColors(categoryThemes[theme]);
    } else {
      setThemeColors(defaultTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, themeColors, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);