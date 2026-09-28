import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { ShieldCheck, CheckCircle2, Scale, Zap, Network } from 'lucide-react';

const About = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>About Us | VigiThink Life Sciences</title>
        <meta name="description" content="Founded in 2026, VigiThink is a next-generation pharmacovigilance company with a vision to become the global leader in drug safety." />
      </Helmet>

      {/* PAGE HEADER */}
      <section className="pt-32 pb-16 bg-blue-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center md:text-left">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold font-heading mb-4 text-slate-900"
          >
            About <span className="text-primary">VigiThink</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto md:mx-0"
          >
            A next-generation enterprise fundamentally redefining drug safety and compliance through strategic medical expertise and intelligent automation.
          </motion.p>
        </div>
      </section>

      {/* COMPANY STORY */}
      <section className="py-20 relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center text-primary text-sm font-bold tracking-widest uppercase mb-2">
                <CheckCircle2 className="w-4 h-4 mr-2" /> Founded 2026
              </div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight text-slate-900">Global Scale, <br/><span className="text-slate-500">Enterprise Excellence.</span></h2>
              <p className="text-slate-700 leading-relaxed text-lg">
                What makes VigiThink Life Sciences different is the way we work together with our clients. We understand that trust is earned one project at a time, and we'll start with a project as small as a single aggregate safety report to demonstrate the quality of our work. Ultimately, we stand ready and able to deliver a complete outsourced solution, across multiple continents, under the tightest of timeframes.
              </p>
              <p className="text-slate-600 leading-relaxed">
                As a comprehensive Life Sciences <strong className="text-slate-800">service provider</strong>, we combine deep domain expertise with cutting-edge tools to deliver end-to-end drug safety and clinical solutions. This flexibility and personalized service is why our clients consistently view VigiThink favorably compared to massive CROs and impersonal global IT BPOs.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-orange-50 rounded-3xl transform rotate-3 scale-105 opacity-50 blur-lg"></div>
              <div className="relative bg-white border border-slate-200 rounded-3xl p-8 lg:p-12 shadow-soft-lg">
                <div className="mb-10 border-l-4 border-accent pl-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Our Vision</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">To emerge as the definitive pioneer in AI-native clinical operations, setting universal, uncompromising benchmarks for pharmacovigilance, data transparency, and paramount patient safety worldwide.</p>
                </div>
                <div className="border-l-4 border-primary pl-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Our Mission</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">To arm leading bio-pharmaceutical innovators with high-speed, automation-enhanced safety services—guaranteeing 100% regulatory compliance throughout a product's entire global lifecycle.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* THE VIGITHINK DIFFERENCE */}
      <section className="py-20 relative bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-12 text-slate-900">Our Core <span className="text-primary">Philosophy</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <ShieldCheck />, title: "Uncompromised Quality", desc: "Delivering accurate, consistent, and medically sound outputs across all pharmacovigilance activities—ensuring the highest standards in every case processed." },
              { icon: <Scale />, title: "Regulatory Compliance Excellence", desc: "Strict adherence to global regulations (FDA, EMA, ICH), ensuring complete inspection readiness and zero tolerance for compliance gaps." },
              { icon: <Zap />, title: "Operational Efficiency", desc: "Optimized workflows, automation, and skilled expertise to ensure faster turnaround times without compromising on quality." },
              { icon: <Network />, title: "Reliability & Scalability", desc: "A dependable partner capable of managing fluctuating case volumes while maintaining performance, timelines, and data integrity." }
            ].map((value, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-soft border border-slate-200 hover:border-primary/30 transition-all duration-300 group flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-blue-50 text-primary rounded-2xl flex items-center justify-center mb-6 hover:scale-110 transition-transform">
                  {React.cloneElement(value.icon, { className: 'w-8 h-8' })}
                </div>
                <h4 className="font-bold text-slate-800 mb-4 text-lg">{value.title}</h4>
                <p className="text-slate-600 leading-relaxed text-sm">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* FOUNDER SECTION */}
      <section className="py-24 bg-surface border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 border-t-4 border-t-primary shadow-soft">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 shrink-0 rounded-2xl overflow-hidden shadow-soft-lg bg-slate-100 flex items-center justify-center relative cursor-pointer group mx-auto md:mx-0">
                <motion.img 
                  whileHover={{ scale: 1.05, transition: { duration: 0.5, ease: "easeOut" } }}
                  src="/Founder.jpg" 
                  alt="Tushar Patil - Founder of VigiThink" 
                  loading="lazy"
                  className="w-full h-full object-cover" 
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-1 text-slate-900">Tushar Patil</h2>
                <h3 className="text-accent font-bold mb-6 tracking-wide uppercase text-sm">Founder & CEO</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Driven by a steadfast commitment to patient safety, Tushar brings strong expertise in Pharmacovigilance, global regulatory compliance, and complex safety operations. Prior to founding VigiThink in 2026, he recognized a critical gap in the industry: the need for a tech-enabled clinical and safety operations provider that doesn't compromise on medical quality or agility.
                </p>
                <div className="flex space-x-3 flex-wrap">
                  <span className="inline-flex items-center text-xs font-semibold px-3 py-1 bg-blue-50 text-primary rounded-full mb-2">Strategic Leadership</span>
                  <span className="inline-flex items-center text-xs font-semibold px-3 py-1 bg-blue-50 text-primary rounded-full mb-2">Safety Operations</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </PageTransition>
  );
};

export default About;
