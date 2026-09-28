import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white">
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
        className="w-32 h-32 absolute bg-primary/10 rounded-full blur-2xl"
      />
      <motion.img 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        src="/Logo_Horizontal.png" 
        alt="VigiThink Loading" 
        className="w-64 mb-10 relative z-10 object-contain drop-shadow-sm"
      />
      
      <div className="flex space-x-3 relative z-10">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            animate={{
              y: ["0%", "-60%", "0%"],
              backgroundColor: ["#0a4b8f", "#f97316", "#0a4b8f"]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2,
            }}
            className="w-3.5 h-3.5 rounded-full bg-primary shadow-soft"
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;
