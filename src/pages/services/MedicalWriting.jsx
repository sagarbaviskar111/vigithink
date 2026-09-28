import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Edit3, BookOpen, PenTool, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MedicalWriting = () => {
  return (
    <>
      <Helmet>
        <title>Medical Writing | VigiThink Life Sciences</title>
        <meta name="description" content="Expert regulatory and scientific medical writing services for global health authority submissions." />
      </Helmet>

      <section className="pt-32 pb-20 bg-slate-900 border-t-4 border-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-blue-900/50 border border-blue-700/50 px-4 py-2 rounded-full mb-6 text-sm font-semibold text-blue-300">
            <Edit3 className="w-4 h-4 mr-2" /> Scientific Documentation
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold font-heading mb-6 text-white"
          >
            Medical <span className="text-accent">Writing</span>
          </motion.h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            Data alone is insufficient. We translate immense data arrays into flawlessly structured, fiercely scrutinized scientific and regulatory documents built to satisfy stringent global health authority standards.
          </p>
        </div>
      </section>

      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-soft border border-slate-200 hover:shadow-soft-lg transition-all">
                  <BookOpen className="w-12 h-12 text-primary mb-6" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Clinical Documents</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">Masterful authoring of Clinical Study Reports (CSRs), comprehensive Investigator Brochures (IBs), detailed Study Protocols, and intricate Patient Safety Narratives tailored to exacting ICH guidelines.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-soft border border-slate-200 hover:shadow-soft-lg transition-all">
                  <PenTool className="w-12 h-12 text-accent mb-6" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Regulatory Submissions</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">Structural generation of Common Technical Document (CTD) modules, Clinical Overviews & Summaries, Non-clinical deliverables, and crucial Briefing Books designed specifically for agency advisory meetings.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-soft border border-slate-200 hover:shadow-soft-lg transition-all">
                  <CheckCircle className="w-12 h-12 text-primary mb-6" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Quality Control</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">Every document undergoes extreme peer review, clinical quality control (QC), and rigid consistency analysis, guaranteeing absolute perfection before it acts as the face of your research.</p>
                </div>
            </div>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-slate-200 text-center">
         <h2 className="text-3xl font-bold mb-6 text-slate-900">Transform your raw data into approved dossiers.</h2>
         <Link to="/contact" className="inline-flex items-center px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-blue-800 transition-colors shadow-soft">
            Contact Medical Writers <ArrowRight className="ml-2 w-5 h-5" />
         </Link>
      </section>
    </>
  );
};
export default MedicalWriting;
