import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Stethoscope, GraduationCap, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MedicalAffairs = () => {
  return (
    <>
      <Helmet>
        <title>Medical Affairs | VigiThink Life Sciences</title>
        <meta name="description" content="Bridging the gap between R&D and commercialization with robust scientific engagement." />
      </Helmet>

      <section className="pt-32 pb-20 bg-slate-900 border-t-4 border-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-blue-900/50 border border-blue-700/50 px-4 py-2 rounded-full mb-6 text-sm font-semibold text-blue-300">
            <Stethoscope className="w-4 h-4 mr-2" /> Scientific Strategy
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold font-heading mb-6 text-white"
          >
            Medical <span className="text-accent">Affairs</span>
          </motion.h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            Bridging the gap between intricate clinical development and commercial execution through rigorous scientific engagement, education, and literature management.
          </p>
        </div>
      </section>

      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-soft border border-slate-200 hover:shadow-soft-lg transition-all">
                  <Users className="w-12 h-12 text-primary mb-6" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">MSL & KOL Engagement</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">Deployment of Medical Science Liaisons (MSLs) to cultivate and fortify high-value relationships with Key Opinion Leaders (KOLs), ensuring your scientific narrative leads the industry conversation.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-soft border border-slate-200 hover:shadow-soft-lg transition-all">
                  <GraduationCap className="w-12 h-12 text-accent mb-6" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Medical Education</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">Developing sophisticated advisory boards, facilitating scientific symposia, and architecting internal training frameworks to rapidly disseminate breakthrough therapeutic knowledge.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-soft border border-slate-200 hover:shadow-soft-lg transition-all">
                  <Stethoscope className="w-12 h-12 text-primary mb-6" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Literature Surveillance</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">Constant, systematic algorithmic and manual surveillance of global medical literature databases, isolating critical clinical findings directly applicable to your product lifecycles.</p>
                </div>
            </div>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-slate-200 text-center">
         <h2 className="text-3xl font-bold mb-6 text-slate-900">Empower your scientific market presence.</h2>
         <Link to="/contact" className="inline-flex items-center px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-blue-800 transition-colors shadow-soft">
            Contact Medical Affairs <ArrowRight className="ml-2 w-5 h-5" />
         </Link>
      </section>
    </>
  );
};
export default MedicalAffairs;
