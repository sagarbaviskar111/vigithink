import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, Search, Database, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pharmacovigilance = () => {
  return (
    <>
      <Helmet>
        <title>Pharmacovigilance Services | VigiThink Life Sciences</title>
        <meta name="description" content="End-to-End global Pharmacovigilance services spanning early clinical trials to post-marketing compliance." />
      </Helmet>

      <section className="pt-32 pb-20 bg-slate-900 border-t-4 border-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-blue-900/50 border border-blue-700/50 px-4 py-2 rounded-full mb-6 text-sm font-semibold text-blue-300">
            <ShieldCheck className="w-4 h-4 mr-2" /> Global Drug Safety
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold font-heading mb-6 text-white"
          >
            Pharmacovigilance <span className="text-accent">Solutions</span>
          </motion.h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            VigiThink Life Sciences offers dynamic, end-to-end pharmacovigilance services for pharmaceutical, biological, and medical device products globally. We function as a seamless extension of your compliance team.
          </p>
        </div>
      </section>

      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-soft border border-slate-200 hover:shadow-soft-lg transition-all">
                  <Activity className="w-12 h-12 text-primary mb-6" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Case Processing (ICSRs)</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">Comprehensive management of Individual Case Safety Reports (ICSRs). We ensure timely triage, rigorous data entry, MedDRA coding, medical review, and rapid regulatory reporting via E2B formats globally.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-soft border border-slate-200 hover:shadow-soft-lg transition-all">
                  <Database className="w-12 h-12 text-accent mb-6" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Aggregate Reporting</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">Authoring of PSURs, PBRERs, DSURs, and PADERs. We synthesize critical safety data into compliant clinical narratives structured perfectly for health authority appraisal.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-soft border border-slate-200 hover:shadow-soft-lg transition-all">
                  <Search className="w-12 h-12 text-primary mb-6" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Signal Detection & RMP</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">Proactive surveillance utilizing qualitative and quantitative safety signal generation. We also construct and manage core global Risk Management Plans (RMPs) to maximize therapeutic benefits.</p>
                </div>
            </div>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-slate-200 text-center">
         <h2 className="text-3xl font-bold mb-6 text-slate-900">Ensure uncompromised global patient safety.</h2>
         <Link to="/contact" className="inline-flex items-center px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-blue-800 transition-colors shadow-soft">
            Request a PV Consultation <ArrowRight className="ml-2 w-5 h-5" />
         </Link>
      </section>
    </>
  );
};
export default Pharmacovigilance;
