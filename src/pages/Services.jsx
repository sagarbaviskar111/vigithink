import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { ShieldCheck, PhoneCall, Globe, Edit3, Stethoscope, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      id: "pharmacovigilance",
      icon: <ShieldCheck className="w-10 h-10 text-accent" />,
      title: "Pharmacovigilance",
      desc: "End-to-end clinical and post-marketing drug safety solutions ensuring continuous compliance across the exact product lifecycle.",
      link: "/services/pharmacovigilance"
    },
    {
      id: "medical-information",
      icon: <PhoneCall className="w-10 h-10 text-primary" />,
      title: "Medical Information",
      desc: "Integrated 24/7 global response centers staffed by seasoned healthcare professionals to address medical inquiries securely and swiftly.",
      link: "/services/medical-information"
    },
    {
      id: "regulatory-affairs",
      icon: <Globe className="w-10 h-10 text-accent" />,
      title: "Regulatory Affairs",
      desc: "Strategic regulatory guidance and execution from early clinical development through to post-approval lifecycle management.",
      link: "/services/regulatory-affairs"
    },
    {
      id: "medical-writing",
      icon: <Edit3 className="w-10 h-10 text-primary" />,
      title: "Medical Writing",
      desc: "Expertly authored clinical, scientific, and regulatory documents built to satisfy stringent global health authority standards.",
      link: "/services/medical-writing"
    },
    {
      id: "medical-affairs",
      icon: <Stethoscope className="w-10 h-10 text-accent" />,
      title: "Medical Affairs",
      desc: "Bridging the gap between development and commercialization through robust scientific engagement and high-level strategic support.",
      link: "/services/medical-affairs"
    },
    {
      id: "quality-assurance",
      icon: <Award className="w-10 h-10 text-primary" />,
      title: "Quality Assurance",
      desc: "Ensuring uncompromising quality control and vendor oversight through comprehensive GxP auditing and process evaluations.",
      link: "/services/quality-assurance"
    }
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Our Services | VigiThink Life Sciences</title>
        <meta name="description" content="Explore our specialized services including Pharmacovigilance, Medical Information, Regulatory Affairs, and more." />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-slate-900 border-t-4 border-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-blue-900/50 border border-blue-700/50 px-4 py-2 rounded-full mb-6 text-sm font-semibold text-blue-300">
            <ShieldCheck className="w-4 h-4 mr-2" /> Global Master Branches
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold font-heading mb-6 text-white"
          >
            Our Core <span className="text-accent">Services</span>
          </motion.h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            We deploy precision-engineered clinical operations matching the absolute highest global standards across Pharmacovigilance, Regulatory Affairs, and Medical Information.
          </p>
        </div>
      </section>

      {/* Services Grid Hub */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.4, ease: "easeOut" } }}
                className="bg-white p-8 rounded-3xl shadow-soft border border-slate-200 hover:border-primary/30 hover:shadow-2xl transition-all duration-300 group flex flex-col h-full relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -z-10 group-hover:bg-blue-50 transition-colors duration-500"></div>
                <div className="mb-8 bg-white border border-slate-100 shadow-sm w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 z-10">
                  {React.cloneElement(service.icon, { className: 'w-8 h-8 text-primary group-hover:text-white transition-colors duration-300' })}
                </div>
                <h3 className="text-2xl font-bold font-heading text-slate-900 mb-4 group-hover:text-primary transition-colors tracking-tight z-10">{service.title}</h3>
                <p className="text-slate-600 text-base leading-relaxed mb-8 flex-grow z-10">{service.desc}</p>
                <div className="mt-auto w-full pt-6 border-t border-slate-100 flex justify-start relative z-10">
                  <Link to={service.link} className="inline-flex items-center text-primary font-bold hover:text-accent transition-colors group/btn">
                    Explore Solutions <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-100 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold font-heading text-slate-900 mb-6 tracking-tight">Need a customized strategy?</h2>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed">
            Every clinical layout is unique. Connect with our principal consultants to craft a bespoke compliance framework for your entire product lineup.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
            <Link to="/contact">
               <button className="px-10 py-4 bg-accent text-white font-bold rounded-full hover:bg-orange-600 transition-colors shadow-soft text-lg">
                 Schedule a Consultation
               </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};
export default Services;
