import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Briefcase, ArrowRight } from 'lucide-react';

const Careers = () => {
  return (
    <>
      <Helmet>
        <title>Careers | VigiThink Life Sciences</title>
        <meta name="description" content="Join VigiThink Life Sciences. We are actively seeking passionate life sciences professionals across PV, Regulatory, and Medical Affairs." />
      </Helmet>

      {/* HEADER SECTION */}
      <section className="pt-32 pb-16 bg-blue-50 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="w-20 h-20 bg-white shadow-soft rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Briefcase className="w-10 h-10 text-primary" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading mb-6 tracking-tight text-slate-900 leading-tight"
          >
            Join <span className="text-primary">VigiThink Life Sciences</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg sm:text-xl text-slate-600 mb-6 max-w-2xl mx-auto leading-relaxed"
          >
            Where Safety Meets Regulatory Intelligence.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-base text-slate-500 max-w-3xl mx-auto"
          >
            We are building a next-generation team of medical, safety, and regulatory experts. If you are passionate about driving compliance and patient safety through innovation, we want you on our team.
          </motion.p>
        </div>
      </section>

      {/* OPEN POSITIONS / INFO SECTION */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Current Openings</h2>
          
          <div className="bg-slate-50 border border-slate-200 p-10 rounded-2xl shadow-sm mb-12">
            <h3 className="text-xl font-semibold text-slate-700 mb-4">We are currently updating our job board.</h3>
            <p className="text-slate-600 mb-6">
              Our talent acquisition team is actively looking for top-tier professionals in Pharmacovigilance, Medical Information, Regulatory Affairs, Medical Writing, Medical Affairs, and Quality Assurance.
            </p>
            <p className="text-sm font-medium text-slate-500 bg-white p-4 rounded-lg inline-block shadow-sm">
              Please email your resume directly to: <br/>
              <a href="mailto:careers@vigithink.com" className="text-primary hover:text-blue-800 text-lg transition-colors mt-2 inline-block">careers@vigithink.com</a>
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
            <Link to="/contact" className="inline-flex items-center text-primary font-bold hover:text-blue-800 transition-colors">
              Have questions? Contact our HR team <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Careers;
