import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-max flex items-center justify-center bg-white dark:bg-accent-900"
    >
      <div className="flex flex-col items-center space-y-8">
        {/* Video Loader */}
        <div className="relative w-32 h-32 rounded-full overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/assets/loader.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/20 to-brand-600/20 rounded-full"></div>
        </div>

        {/* Animated Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-2xl heading-primary text-brand mb-2">
            Frontend Battle
          </h2>
          <p className="body-text">Crafting Digital Excellence</p>
        </motion.div>

        {/* Animated Progress Bar */}
        <div className="w-64 h-1 bg-accent-200 dark:bg-accent-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-brand-500 to-brand-600 rounded-full"
          />
        </div>

        {/* Floating Dots */}
        <div className="flex space-x-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              initial={{ y: 0 }}
              animate={{ y: [-10, 0, -10] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
              className="w-3 h-3 bg-primary-500 rounded-full"
            />
          ))}
        </div>
      </div>

      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
            className="absolute w-2 h-2 bg-primary-400/30 rounded-full"
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Loader;
