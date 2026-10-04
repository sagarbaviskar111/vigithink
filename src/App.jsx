import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Modal from './components/Modal';
import Chatbot from './components/Chatbot';
import ScrollProgress from './components/ScrollProgress';
import Loader from './components/Loader';

// Lazy loading pages for faster initial load (Performance Optimization)
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Careers = lazy(() => import('./pages/Careers'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

const Pharmacovigilance = lazy(() => import('./pages/services/Pharmacovigilance'));
const MedicalInformation = lazy(() => import('./pages/services/MedicalInformation'));
const RegulatoryAffairs = lazy(() => import('./pages/services/RegulatoryAffairs'));
const MedicalWriting = lazy(() => import('./pages/services/MedicalWriting'));
const MedicalAffairs = lazy(() => import('./pages/services/MedicalAffairs'));
const QualityAssurance = lazy(() => import('./pages/services/QualityAssurance'));
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Auto trigger quote popup after 5 seconds, once per browser session
    let alreadyShown = false;
    try { alreadyShown = sessionStorage.getItem('quotePopupShown') === '1'; } catch { /* storage unavailable */ }
    if (alreadyShown) return undefined;
    const timer = setTimeout(() => {
      setIsModalOpen(true);
      try { sessionStorage.setItem('quotePopupShown', '1'); } catch { /* storage unavailable */ }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-primary">Skip to main content</a>
      <ScrollProgress />
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      <main id="main-content" className="flex-grow pt-20">
        <Suspense fallback={<Loader />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home onOpenModal={() => setIsModalOpen(true)} />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/pharmacovigilance" element={<Pharmacovigilance />} />
              <Route path="/services/medical-information" element={<MedicalInformation />} />
              <Route path="/services/regulatory-affairs" element={<RegulatoryAffairs />} />
              <Route path="/services/medical-writing" element={<MedicalWriting />} />
              <Route path="/services/medical-affairs" element={<MedicalAffairs />} />
              <Route path="/services/quality-assurance" element={<QualityAssurance />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
        </main>
        <Footer />
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        <Chatbot />
        
        {/* Floating WhatsApp Button */}
        <a 
          href="https://wa.me/918999213129" 
          target="_blank" 
          rel="noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:shadow-glow hover:bg-green-400 transition-all z-50 flex items-center justify-center cursor-pointer"
          aria-label="Contact on WhatsApp"
        >
          <MessageCircle className="w-8 h-8" />
        </a>
    </div>
  );
}

export default App;
