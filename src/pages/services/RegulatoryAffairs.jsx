import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FileBadge, Scale, Globe, Target, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const RegulatoryAffairs = () => {
  return (
    <>
      <Helmet>
        <title>Regulatory Affairs | VigiThink Life Sciences</title>
        <meta name="description" content="Strategic Regulatory Affairs services guiding clinical approval through lifelong maintenance." />
      </Helmet>

      <section className="pt-32 pb-20 bg-slate-900 border-t-4 border-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-blue-900/50 border border-blue-700/50 px-4 py-2 rounded-full mb-6 text-sm font-semibold text-blue-300">
            <Scale className="w-4 h-4 mr-2" /> Compliance Intelligence
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold font-heading mb-6 text-white"
          >
            Regulatory <span className="text-accent">Affairs</span>
          </motion.h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            Masterful navigation of shifting global regulations. From rigorous initial filing strategies via IND/NDA to sweeping post-approval maintenance spanning FDA, EMA, MHRA, and emerging markets.
          </p>
        </div>
      </section>

      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-soft border border-slate-200 hover:shadow-soft-lg transition-all">
                  <Globe className="w-12 h-12 text-primary mb-6" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Global Filing Strategy</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">Comprehensive strategic advisory charting the path of least resistance through complex, disparate international health authority architectures to ensure maximum speed-to-market.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-soft border border-slate-200 hover:shadow-soft-lg transition-all">
                  <FileBadge className="w-12 h-12 text-accent mb-6" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Dossier Management (eCTD)</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">Authoring, assembly, structural formatting, and secure electronic submission gateways directly into IND, NDA, ANDA, and MAA compliance endpoints using advanced eCTD protocols.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-soft border border-slate-200 hover:shadow-soft-lg transition-all">
                  <Target className="w-12 h-12 text-primary mb-6" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Lifecycle Maintenance</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">Post-marketing regulatory administration including license renewals, vital formulation deviations (CMC support), and answering rapid Health Authority inquiries with pinpoint accuracy.</p>
                </div>
            </div>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-slate-200 text-center">
         <h2 className="text-3xl font-bold mb-6 text-slate-900">Accelerate your time to market.</h2>
         <Link to="/contact" className="inline-flex items-center px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-blue-800 transition-colors shadow-soft">
            Contact Regulatory Team <ArrowRight className="ml-2 w-5 h-5" />
         </Link>
      </section>
    </>
  );
};
export default RegulatoryAffairs;
