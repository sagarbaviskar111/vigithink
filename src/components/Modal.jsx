import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';

const Modal = ({ isOpen, onClose }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const payload = { ...data, requirement: data.service || '' };
      const response = await fetch(`http://${window.location.hostname}:3001/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        alert("Thank you for your inquiry! Your request has been logged securely.");
        reset();
        onClose();
      } else {
        alert("Error saving inquiry safely. Please try again.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Could not connect to the backend server.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 300 } }}
              exit={{ scale: 0.8, opacity: 0, y: 30, transition: { duration: 0.2 } }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden"
            >
              {/* Header */}
              <div className="bg-primary px-6 py-6 text-white relative">
                <button
                  onClick={onClose}
                  aria-label="Close modal"
                  className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
                <h2 className="text-2xl font-heading font-bold mb-1">Request a Quote</h2>
                <p className="text-blue-100 text-sm opacity-90">Let's discuss how we can accelerate your global clinical and safety operations.</p>
              </div>

              {/* Body */}
              <div className="p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <input 
                      type="text" 
                      aria-label="Your Name"
                      placeholder="Your Name" 
                      className={`w-full bg-slate-50 border ${errors.name ? 'border-red-500' : 'border-slate-200'} rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:border-primary transition-colors`}
                      {...register("name", { required: true })}
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      aria-label="Email Address"
                      placeholder="Email Address" 
                      className={`w-full bg-slate-50 border ${errors.email ? 'border-red-500' : 'border-slate-200'} rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:border-primary transition-colors`}
                      {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                    />
                  </div>
                  <div>
                    <input 
                      type="text" 
                      aria-label="Company Name"
                      placeholder="Company Name" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:border-primary transition-colors"
                      {...register("company")}
                    />
                  </div>
                  <div>
                    <select 
                      aria-label="Select a Service"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:border-primary transition-colors"
                      {...register("service")}
                      defaultValue=""
                    >
                      <option value="" disabled className="text-slate-500">Select a Service</option>
                      <option value="Pharmacovigilance">Pharmacovigilance</option>
                      <option value="Medical Information">Medical Information</option>
                      <option value="Regulatory Affairs">Regulatory Affairs</option>
                      <option value="Medical Writing">Medical Writing</option>
                      <option value="Medical Affairs">Medical Affairs</option>
                      <option value="Quality Assurance">Quality Assurance</option>
                    </select>
                  </div>
                  <div>
                    <textarea 
                      aria-label="How can we help?"
                      placeholder="How can we help?" 
                      rows="3"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:border-primary transition-colors resize-none"
                      {...register("message")}
                    ></textarea>
                  </div>
                  
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit" 
                    className="w-full bg-accent text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-colors shadow-soft mt-2"
                  >
                    Submit Request
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
