import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onOpenModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Careers', path: '/careers' },
    { name: 'eTMF Tool', path: '/etmf/', external: true }, // separate app (login required)
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav aria-label="Main Navigation" className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-white shadow-soft py-3' : 'bg-white/90 backdrop-blur-md py-5 border-b border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link to="/" className="flex items-center">
              <motion.img
                whileHover={{ scale: 1.03, filter: "brightness(1.05)", dropShadow: "0px 10px 15px rgba(10, 75, 143, 0.4)", transition: { duration: 0.3 } }}
                whileTap={{ scale: 0.9, rotate: -2, transition: { type: "spring", stiffness: 400 } }}
                src="/Logo_Horizontal.png"
                alt="VigiThink Life Sciences"
                className="h-10 sm:h-12 md:h-14 w-auto max-w-[180px] sm:max-w-[220px] md:max-w-[260px] object-contain cursor-pointer transform-gpu"
              />
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-bold tracking-wide">
            {navLinks.map((link) => (
              <motion.div key={link.name} whileHover={{ y: -2, transition: { duration: 0.2, ease: "easeOut" } }} whileTap={{ scale: 0.95 }}>
                {link.external ? (
                  <a href={link.path} className="transition-colors text-slate-600 hover:text-primary">
                    {link.name}
                  </a>
                ) : (
                  <Link
                    to={link.path}
                    className={`transition-colors ${location.pathname === link.path ? 'text-primary' : 'text-slate-600 hover:text-primary'}`}
                  >
                    {link.name}
                  </Link>
                )}
              </motion.div>
            ))}
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(10, 75, 143, 0.15)", transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenModal}
              className="px-6 py-2.5 bg-primary text-white rounded-full hover:bg-blue-800 transition-colors shadow-sm"
            >
              Get Quote
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-primary focus:outline-none"
              aria-label={isOpen ? "Close main menu" : "Open main menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-white shadow-soft border-t border-slate-100"
          >
            <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col items-center">
              {navLinks.map((link) => (
                link.external ? (
                  <a
                    key={link.name}
                    href={link.path}
                    className="block px-3 py-2 text-base font-medium w-full text-center rounded-md transition-colors text-slate-600 hover:bg-slate-50"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`block px-3 py-2 text-base font-medium w-full text-center rounded-md transition-colors ${location.pathname === link.path ? 'text-primary bg-blue-50' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    {link.name}
                  </Link>
                )
              ))}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenModal}
                className="w-full mt-4 px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-blue-800 focus:outline-none shadow-soft"
              >
                Get Quote
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
