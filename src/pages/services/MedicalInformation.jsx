import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { PhoneCall, Headphones, FileText, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MedicalInformation = () => {
  return (
    <>
      <Helmet>
        <title>Medical Information Services | VigiThink Life Sciences</title>
        <meta name="description" content="24/7 global Medical Information call center operations supporting patients and HCPs." />
      </Helmet>

      <section className="pt-32 pb-20 bg-slate-900 border-t-4 border-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-blue-900/50 border border-blue-700/50 px-4 py-2 rounded-full mb-6 text-sm font-semibold text-blue-300">
            <PhoneCall className="w-4 h-4 mr-2" /> Global MI Call Centers
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold font-heading mb-6 text-white"
          >
            Medical <span className="text-accent">Information</span>
          </motion.h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            Staffed entirely by qualified Healthcare Professionals (HCPs), our Medical Information infrastructure precisely answers complex scientific inquiries, processes adverse events securely, and supports major product launches globally.
          </p>
        </div>
      </section>

      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-soft border border-slate-200 hover:shadow-soft-lg transition-all">
                  <Headphones className="w-12 h-12 text-primary mb-6" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">24/7 Global Response Center</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">We operate multi-lingual, multi-channel (phone, email, web portal) integrated contact centers bridging the gap between pharmaceutical sponsors and patients precisely when needed most.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-soft border border-slate-200 hover:shadow-soft-lg transition-all">
                  <FileText className="w-12 h-12 text-accent mb-6" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Standard Response Letters</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">Our experts construct, rigorously evaluate, and continually maintain immense databases of scientific Standard Response Letters (SRLs), enabling standardized and highly accurate query resolution.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-soft border border-slate-200 hover:shadow-soft-lg transition-all">
                  <Globe className="w-12 h-12 text-primary mb-6" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">AE & Complaint Funneling</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">Inquiries naturally reveal critical safety data. Our front-line Medical Information agents swiftly identify hidden Adverse Events and Product Complaints, seamlessly escalating them into Pharmacovigilance matrices.</p>
                </div>
            </div>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-slate-200 text-center">
         <h2 className="text-3xl font-bold mb-6 text-slate-900">Elevate your product support operations.</h2>
         <Link to="/contact" className="inline-flex items-center px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-blue-800 transition-colors shadow-soft">
            Contact MI Specialists <ArrowRight className="ml-2 w-5 h-5" />
         </Link>
      </section>
    </>
  );
};
export default MedicalInformation;
