import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Award, FileSearch, ShieldAlert, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const QualityAssurance = () => {
  return (
    <>
      <Helmet>
        <title>Quality Assurance | VigiThink Life Sciences</title>
        <meta name="description" content="Uncompromising GxP auditing and quality control services." />
      </Helmet>

      <section className="pt-32 pb-20 bg-slate-900 border-t-4 border-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-blue-900/50 border border-blue-700/50 px-4 py-2 rounded-full mb-6 text-sm font-semibold text-blue-300">
            <Award className="w-4 h-4 mr-2" /> Uncompromising Quality
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold font-heading mb-6 text-white"
          >
            Quality <span className="text-accent">Assurance</span>
          </motion.h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            Protecting your reputation and compliance posture through ruthless GxP auditing, robust vendor oversight, and comprehensive mock inspections preparing you for the worst-case scenarios.
          </p>
        </div>
      </section>

      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-soft border border-slate-200 hover:shadow-soft-lg transition-all">
                  <FileSearch className="w-12 h-12 text-primary mb-6" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Global GxP Auditing</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">Execution of highly technical Good Pharmacovigilance Practice (GVP), Good Clinical Practice (GCP), and Good Manufacturing Practice (GMP) vendor and partner system audits globally.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-soft border border-slate-200 hover:shadow-soft-lg transition-all">
                  <ShieldAlert className="w-12 h-12 text-accent mb-6" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Mock Authority Inspections</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">Simulated high-pressure FDA and EMA inspections conducted by ex-regulators to stress-test your internal Quality Management System (QMS) before an actual unannounced inspection occurs.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-soft border border-slate-200 hover:shadow-soft-lg transition-all">
                  <Award className="w-12 h-12 text-primary mb-6" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">CAPA Management</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">End-to-end Root Cause Analysis and generation of Corrective and Preventive Action (CAPA) plans, ensuring systematic errors are permanently neutralized and properly documented.</p>
                </div>
            </div>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-slate-200 text-center">
         <h2 className="text-3xl font-bold mb-6 text-slate-900">Fortify your compliance infrastructure.</h2>
         <Link to="/contact" className="inline-flex items-center px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-blue-800 transition-colors shadow-soft">
            Contact QA Experts <ArrowRight className="ml-2 w-5 h-5" />
         </Link>
      </section>
    </>
  );
};
export default QualityAssurance;
