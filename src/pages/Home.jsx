import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, Activity, FileText, Database, BookOpen, Search, ArrowRight,
  CheckCircle, ClipboardCheck, FileSearch, PhoneCall, Globe, Edit3, Stethoscope, Award, Zap
} from 'lucide-react';

const Home = ({ onOpenModal }) => {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const services = [
    { icon: <ShieldCheck className="w-8 h-8 text-accent" />, title: 'Pharmacovigilance', desc: 'End-to-end clinical and post-marketing drug safety solutions.', link: '/services/pharmacovigilance' },
    { icon: <PhoneCall className="w-8 h-8 text-primary" />, title: 'Medical Information', desc: 'Integrated 24/7 global response centers natively handling inquiries.', link: '/services/medical-information' },
    { icon: <Activity className="w-8 h-8 text-accent" />, title: 'Regulatory Affairs', desc: 'Strategic global guidance from clinical development to post-approval.', link: '/services/regulatory-affairs' },
    { icon: <FileText className="w-8 h-8 text-primary" />, title: 'Medical Writing', desc: 'Clinical, scientific, and regulatory document authoring.', link: '/services/medical-writing' },
    { icon: <BookOpen className="w-8 h-8 text-accent" />, title: 'Medical Affairs', desc: 'Bridging the gap via KOL engagement and robust literature surveillance.', link: '/services/medical-affairs' },
    { icon: <ClipboardCheck className="w-8 h-8 text-primary" />, title: 'Quality Assurance', desc: 'Uncompromising GxP auditing, mock inspections, and QMS coverage.', link: '/services/quality-assurance' },
  ];

  const caseStudies = [
    {
      icon: <Zap className="w-10 h-10 text-white" />,
      title: "Faster Case Processing",
      subtitle: "Reduced Turnaround Time",
      desc: "Optimized processes and automation-driven triage ensure quicker case intake, processing, and reporting—improving overall operational efficiency."
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-white" />,
      title: "Audit & Inspection Ready",
      subtitle: "Built for Regulatory Compliance",
      desc: "Processes aligned with FDA, EMA, and ICH guidelines, ensuring consistent quality, documentation readiness, and smooth audit outcomes."
    },
    {
      icon: <Stethoscope className="w-10 h-10 text-white" />,
      title: "Expert-Driven Operations",
      subtitle: "Medically Qualified Professionals",
      desc: "Our team includes trained pharmacovigilance experts and healthcare professionals ensuring accurate medical assessment and high-quality case handling."
    },
    {
      icon: <Globe className="w-10 h-10 text-white" />,
      title: "Scalable Global Support",
      subtitle: "Flexible Operations",
      desc: "Designed to manage varying case loads with ease—ensuring uninterrupted delivery during peak volumes and business expansion."
    }
  ];

  const comparisons = [
    {
      feature: "Specialized Medical Depth",
      vigithink: "QPPVs & MDs lead all engagements directly.",
      megaCro: "Layered bureaucracy, junior resources often used.",
      itFirm: "IT focused, lacks deep therapeutic context."
    },
    {
      feature: "Implementation Speed",
      vigithink: "Agile onboarding in < 4 weeks.",
      megaCro: "Slow, complex 3-6 month startup phase.",
      itFirm: "Variable, often requires heavy client oversight."
    },
    {
      feature: "AI-Native Workflows",
      vigithink: "Built from the ground up for modern automation.",
      megaCro: "Legacy databases with bolt-on AI tools.",
      itFirm: "Custom builds that carry technical debt."
    },
    {
      feature: "Cost Efficiency",
      vigithink: "Highly targeted. Pay for medical output, not overhead.",
      megaCro: "High overhead costs passed to sponsors.",
      itFirm: "Volume-based pricing lacking quality guarantees."
    }
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>VigiThink | Next-Generation Pharmacovigilance Solutions</title>
        <meta name="description" content="Discover premium, compliance-driven pharmacovigilance services tailored for the life sciences industry by VigiThink." />
      </Helmet>

      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="absolute inset-0 z-0 opacity-40">
          {/* Clean curved paths for medical aesthetic */}
          <svg className="absolute w-full h-full text-blue-100" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 Q50,100 100,0 L100,100 L0,100 Z" fill="currentColor"></path>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <div className="inline-flex items-center space-x-2 bg-white border border-slate-200 px-4 py-2 rounded-full mb-8 shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="text-xs md:text-sm font-semibold text-primary">Intelligent Safety Solutions</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold font-heading mb-6 tracking-tight text-slate-900 leading-tight"
          >
            VigiThink Life Sciences
            <span className="text-primary block text-2xl sm:text-3xl md:text-4xl mt-3 font-semibold">"Where Safety Meets Regulatory Intelligence"</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg sm:text-xl md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            As a premier <strong className="text-slate-800">Pharmacovigilance service provider</strong>, we bring together safety, medical, regulatory, and cutting-edge technology services to ensure patients receive the safest therapies possible.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0px 10px 20px rgba(10, 75, 143, 0.15)", transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenModal}
              className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-semibold rounded-full shadow-soft"
            >
              Request a Consultation
            </motion.button>
            <motion.div whileHover={{ scale: 1.02, transition: { duration: 0.3 } }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Link to="/services" className="w-full px-8 py-4 bg-white border border-slate-200 text-slate-700 font-semibold rounded-full hover:bg-slate-50 transition-colors flex items-center justify-center shadow-sm">
                Explore Our Services <ArrowRight className="ml-2 h-4 w-4 text-primary" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* TRUST BADGES SECTION */}
      <section className="py-8 border-y border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold text-slate-400 mb-6 uppercase tracking-widest">Ensuring Compliance Across Global Standards</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60">
            {['FDA', 'EMA', 'CDSCO', 'MHRA', 'PMDA', 'Health Canada', 'TGA'].map((agency) => (
              <div key={agency} className="flex items-center text-2xl font-heading font-extrabold text-slate-600 grayscale hover:grayscale-0 hover:text-primary transition-all cursor-default">
                {agency}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY VIGITHINK COMPETITIVE ANALYSIS MATRIX */}
      <section className="py-24 bg-surface relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">Why Chose <span className="text-primary">VigiThink?</span></h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              In a market dominated by massive CROs and impersonal global IT BPOs, VigiThink occupies the sweet spot. We offer the deep medical specialization of boutique firms combined with next-gen AI implementation.
            </p>
          </div>

          <div className="space-y-6 lg:hidden">
            {comparisons.map((row, index) => (
              <div key={index} className="bg-white rounded-xl shadow-soft border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 p-4 border-b border-slate-200 font-bold text-slate-800">
                  {row.feature}
                </div>
                <div className="p-4 bg-blue-50/30 border-b border-slate-100 flex items-start">
                  <CheckCircle className="w-5 h-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-primary block uppercase mb-1">VigiThink</span>
                    <span className="text-slate-700 font-medium hover:text-slate-900 transition-colors">{row.vigithink}</span>
                  </div>
                </div>
                <div className="p-4 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-500 block uppercase mb-1">Global IT BPOs</span>
                  <span className="text-slate-600 text-sm hover:text-slate-800 transition-colors">{row.itFirm}</span>
                </div>
                <div className="p-4">
                  <span className="text-xs font-bold text-slate-500 block uppercase mb-1">Mega CROs</span>
                  <span className="text-slate-600 text-sm hover:text-slate-800 transition-colors">{row.megaCro}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden lg:block shadow-soft-lg rounded-xl border border-slate-200 bg-white overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-6 font-bold text-slate-700 uppercase tracking-wider text-sm w-1/4">Key Evaluation Factors</th>
                  <th className="p-6 font-bold text-primary uppercase tracking-wider text-sm border-l border-slate-200 bg-blue-50/50 w-1/4">VigiThink</th>
                  <th className="p-6 font-bold text-slate-500 uppercase tracking-wider text-sm border-l border-slate-200 w-1/4">Global IT BPOs</th>
                  <th className="p-6 font-bold text-slate-500 uppercase tracking-wider text-sm border-l border-slate-200 w-1/4">Mega CROs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisons.map((row, index) => (
                  <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-6 text-slate-800 font-semibold">{row.feature}</td>
                    <td className="p-6 text-slate-700 border-l border-slate-200 bg-blue-50/20 font-medium hover:bg-blue-50/40 transition-colors">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                        {row.vigithink}
                      </div>
                    </td>
                    <td className="p-6 text-slate-500 border-l border-slate-200 text-sm">{row.itFirm}</td>
                    <td className="p-6 text-slate-500 border-l border-slate-200 text-sm">{row.megaCro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* CORE SERVICES */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12 border-b border-slate-100 pb-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">Core <span className="text-primary">Capabilities</span></h2>
              <p className="text-slate-600 text-lg">End-to-end pharmacovigilance solutions.</p>
            </div>
            <Link to="/services" className="hidden md:flex text-primary hover:text-blue-800 transition-colors items-center font-semibold">
              View All Services <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <motion.div
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -8, transition: { duration: 0.4, ease: "easeOut" } }}
                className="bg-white p-8 rounded-3xl shadow-soft border border-slate-200 hover:border-primary/30 hover:shadow-2xl transition-all duration-300 group flex flex-col h-full relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -z-10 group-hover:bg-blue-50 transition-colors duration-500"></div>
                <div className="mb-8 bg-white border border-slate-100 shadow-sm w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 z-10">
                  {service.icon}
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
          </motion.div>

          <div className="mt-10 md:hidden flex justify-center">
            <Link to="/services" className="px-6 py-3 border border-slate-200 rounded-full text-slate-700 text-sm font-semibold flex items-center bg-white shadow-sm">
              View All Services <ArrowRight className="ml-2 h-4 w-4 text-primary" />
            </Link>
          </div>
        </div>
      </section>

      {/* THE VIGITHINK ADVANTAGE */}
      <section className="py-24 relative bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <svg className="absolute w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon points="0,0 100,0 100,100" fill="#fff" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Operational <span className="text-accent">Strength</span></h2>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">Delivering uncompromising quality and global scale for the world's leading bio-pharmaceutical innovators.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {caseStudies.map((caseItem, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1, transition: { duration: 0.5, delay: idx * 0.1, ease: "easeOut" } }}
                viewport={{ once: true }}
                whileHover={{ y: -6, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.3)", transition: { duration: 0.3 } }}
                className="bg-blue-900/40 border border-blue-700/50 backdrop-blur-sm rounded-xl p-8 relative shadow-2xl flex flex-col"
              >
                <div className="mb-6 opacity-90">{caseItem.icon}</div>
                <div className="text-xl font-bold text-white mb-2">{caseItem.title}</div>
                <div className="text-sm font-semibold text-accent mb-4 leading-snug">{caseItem.subtitle}</div>
                <p className="text-blue-100 text-sm leading-relaxed">{caseItem.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 relative bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 leading-tight">Ready to transform your PV operations?</h2>
          <p className="text-slate-600 mb-10 text-xl">Partner with VigiThink to enable faster, safer, and highly compliant drug development lifecycles.</p>
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "#ea580c", transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenModal}
            className="w-full sm:w-auto px-10 py-5 bg-accent text-white font-bold text-lg rounded-full shadow-soft"
          >
            Contact Our Experts
          </motion.button>
        </div>
      </section>
    </PageTransition>
  );
};

export default Home;
