import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Mail, MapPin, Phone, MessageSquare } from 'lucide-react';

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`http://${window.location.hostname}:3001/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        alert("Message sent successfully! Our commercial team will contact you within 24 hours. Data has been saved to Excel.");
        reset();
      } else {
        alert("Server error. Could not save to Excel.");
      }
    } catch (e) {
      console.error(e);
      alert("Error communicating with server. Please try again later.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | VigiThink Life Sciences</title>
        <meta name="description" content="Get in touch with VigiThink. Request a quote or schedule a consultation for our global pharmacovigilance services." />
      </Helmet>

      <section className="py-20 relative bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 pt-10">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold font-heading mb-4 text-slate-900"
            >
              Let's <span className="text-primary">Connect</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="text-lg text-slate-600 max-w-2xl mx-auto"
            >
              Reach out to discover how VigiThink can transform your drug safety operations with speed and precision.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="bg-white border border-slate-200 shadow-sm p-8 rounded-2xl relative overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="text-lg font-bold mb-4 flex items-center text-slate-900"><MapPin className="w-5 h-5 mr-3 text-accent" /> Headquarters</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    VigiThink Life Sciences<br/>
                    Pune, Maharashtra,<br/>
                    India
                  </p>
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.04711156075!2d73.78056541094042!3d18.52460355342898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                    width="100%" 
                    height="200" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-xl shadow-inner border border-slate-200 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                  ></iframe>
                </div>
              </div>

              <div className="bg-white border border-slate-200 shadow-sm p-8 rounded-2xl relative overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="text-lg font-bold mb-4 flex items-center text-slate-900"><Phone className="w-5 h-5 mr-3 text-accent" /> Phone & Support</h3>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    +91-89992 13129<br/>
                    <span className="text-xs font-bold text-primary tracking-wide uppercase mt-1 block">Available 24/7 for Critical Inquiries</span>
                  </p>
                </div>
              </div>

              <div className="bg-white border border-slate-200 shadow-sm p-8 rounded-2xl relative overflow-hidden group">
                <div className="relative z-10">
                   <h3 className="text-lg font-bold mb-4 flex items-center text-slate-900"><Mail className="w-5 h-5 mr-3 text-accent" /> Email Us</h3>
                   <a href="mailto:info@vigithink.com" className="text-primary hover:text-blue-800 transition-colors font-medium">
                     info@vigithink.com
                   </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
              className="lg:col-span-3 bg-white border border-slate-200 shadow-soft-lg p-8 md:p-12 rounded-3xl"
            >
              <h2 className="text-2xl font-bold mb-8 flex items-center text-slate-900">
                <MessageSquare className="w-6 h-6 mr-3 text-accent" /> Request a Consultation
              </h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold tracking-wide text-slate-600 mb-2">Full Name *</label>
                    <input 
                      type="text" 
                      className={`w-full bg-slate-50 border ${errors.name ? 'border-red-500' : 'border-slate-200'} rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-primary focus:bg-white transition-colors`}
                      {...register("name", { required: true })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold tracking-wide text-slate-600 mb-2">Email Address *</label>
                    <input 
                      type="email" 
                      className={`w-full bg-slate-50 border ${errors.email ? 'border-red-500' : 'border-slate-200'} rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-primary focus:bg-white transition-colors`}
                      {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold tracking-wide text-slate-600 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-primary focus:bg-white transition-colors"
                      {...register("phone")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold tracking-wide text-slate-600 mb-2">Company Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-primary focus:bg-white transition-colors"
                      {...register("company")}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold tracking-wide text-slate-600 mb-2">Service Requirement</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-primary focus:bg-white transition-colors"
                    {...register("requirement")}
                    defaultValue="General Inquiry"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Pharmacovigilance">Pharmacovigilance</option>
                    <option value="Medical Information">Medical Information</option>
                    <option value="Regulatory Affairs">Regulatory Affairs</option>
                    <option value="Medical Writing">Medical Writing</option>
                    <option value="Medical Affairs">Medical Affairs</option>
                    <option value="Quality Assurance">Quality Assurance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold tracking-wide text-slate-600 mb-2">Message *</label>
                  <textarea 
                    rows="5"
                    className={`w-full bg-slate-50 border ${errors.message ? 'border-red-500' : 'border-slate-200'} rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-primary focus:bg-white transition-colors resize-none`}
                    {...register("message", { required: true })}
                  ></textarea>
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit" 
                  className="w-full sm:w-auto px-10 py-3 text-lg bg-primary text-white font-bold rounded-lg hover:bg-blue-800 transition-colors shadow-soft"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
