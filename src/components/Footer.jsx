import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldAlert, Mail, MapPin, Phone, Linkedin, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t-4 border-primary pt-16 pb-8 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center pb-2 inline-block">
              <motion.img 
                initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', damping: 15, stiffness: 100 } }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, boxShadow: "0px 15px 30px rgba(0,0,0,0.2)", transition: { duration: 0.3 } }}
                whileTap={{ scale: 0.95 }}
                src="/Logo.jpg" 
                alt="VigiThink Logo" 
                loading="lazy"
                className="w-32 sm:w-48 md:w-56 h-auto bg-white p-4 rounded-3xl shadow-lg border border-slate-100 object-contain cursor-pointer"
              />
            </Link>
            <p className="text-lg font-bold font-heading text-accent mb-2">Where Safety Meets Regulatory Intelligence</p>
            <p className="text-sm leading-relaxed text-slate-400">
              A premier global CRO delivering comprehensive clinical operations, drug safety, and regulatory solutions with precision, speed, and global compliance.
            </p>
            <div className="flex space-x-4 pt-2">
              <motion.a whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} href="#" className="text-slate-400 hover:text-white transition-colors" aria-label="Visit our LinkedIn page"><Linkedin size={20} /></motion.a>
              <motion.a whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} href="#" className="text-slate-400 hover:text-white transition-colors" aria-label="Visit our Twitter page"><Twitter size={20} /></motion.a>
              <motion.a whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} href="#" className="text-slate-400 hover:text-white transition-colors" aria-label="Visit our Facebook page"><Facebook size={20} /></motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-heading font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3 font-medium text-sm">
              <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-accent transition-colors">Our Services</Link></li>
              <li><Link to="/careers" className="hover:text-accent transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-heading font-semibold text-lg mb-4">Core Services</h3>
            <ul className="space-y-3 font-medium text-sm">
              <li><Link to="/services/pharmacovigilance" className="hover:text-accent transition-colors">Pharmacovigilance</Link></li>
              <li><Link to="/services/regulatory-affairs" className="hover:text-accent transition-colors">Regulatory Affairs</Link></li>
              <li><Link to="/services/medical-information" className="hover:text-accent transition-colors">Medical Information</Link></li>
              <li><Link to="/services/quality-assurance" className="hover:text-accent transition-colors">Quality Assurance</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-heading font-semibold text-lg mb-4">Global Headquarters</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-accent shrink-0" />
                <span>Pune, Maharashtra,<br />India</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-accent shrink-0" />
                <span>+91-89992 13129</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-accent shrink-0" />
                <a href="mailto:info@vigithink.com" className="hover:text-accent transition-colors">info@vigithink.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {currentYear} VigiThink Life Sciences. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
            <a href="#" className="hover:text-slate-400">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
