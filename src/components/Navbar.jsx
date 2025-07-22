import { useState } from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { name: 'Home', path: '#home' },
    { name: 'About', path: '#about' },
    { name: 'Skills', path: '#skills' },
    { name: 'Projects', path: '#projects' },
    { name: 'Contact', path: '#contact' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-opacity-80 dark:bg-opacity-80 bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="#home" className="text-xl font-bold text-primary-light dark:text-primary-dark">
              Muhammad Haroon
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.path}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
              <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            </div>
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-primary-light dark:hover:text-primary-dark focus:outline-none"
              aria-expanded="false"
            >
              {mobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white dark:bg-gray-800 shadow-lg"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.path}
                onClick={handleLinkClick}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-primary-light dark:hover:text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;