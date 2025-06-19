import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Zap, Shield, Rocket, Palette, Code, Smartphone } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const FeaturesProfessional = () => {
  const { isDark } = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description:
        "Optimized performance with modern React patterns and efficient rendering",
      color: "warning",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Reliable",
      description:
        "Built with security best practices and robust error handling",
      color: "success",
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Modern Stack",
      description: "Latest React, Tailwind CSS, and Framer Motion technologies",
      color: "brand",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Beautiful Design",
      description:
        "Pixel-perfect UI with smooth animations and professional aesthetics",
      color: "accent",
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Clean Code",
      description: "Well-structured, maintainable, and scalable codebase",
      color: "brand",
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Fully Responsive",
      description: "Perfect experience across all devices and screen sizes",
      color: "success",
    },
  ];

  return (
    <section id="features" className="relative py-20 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-base">
        {" "}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-contain opacity-40"
          style={{ objectPosition: "center center" }}
        >
          <source src="/assets/features-services.mp4" type="video/mp4" />
        </video>
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-br from-accent-900/95 via-accent-800/90 to-brand-900/95"
              : "bg-gradient-to-br from-white/95 via-accent-50/90 to-brand-50/95"
          }`}
        />
      </div>

      <div className="relative z-dropdown max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 backdrop-blur-sm mb-6"
          >
            <Rocket className="w-4 h-4 text-brand-500" />
            <span className="text-sm font-medium text-brand-600 dark:text-brand-400">
              Key Features
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl heading-primary text-brand mb-6">
            Why Choose
            <br />
            <span className="text-accent-800 dark:text-accent-200">
              Our Solutions
            </span>
          </h2>

          <p className="text-lg body-text max-w-3xl mx-auto">
            We combine cutting-edge technology with proven methodologies to
            deliver exceptional results that exceed expectations.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * index, duration: 0.8 }}
              className="card-professional group hover:scale-105 transition-transform duration-300"
            >
              <div className="p-8 text-center">
                {/* Icon */}
                <div
                  className={`w-16 h-16 mx-auto rounded-xl bg-${feature.color}-500/10 border border-${feature.color}-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <div
                    className={`text-${feature.color}-600 dark:text-${feature.color}-400`}
                  >
                    {feature.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl heading-secondary text-accent-900 dark:text-accent-100 mb-4">
                  {feature.title}
                </h3>

                <p className="body-text text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            { number: "99.9%", label: "Uptime" },
            { number: "2.5s", label: "Load Time" },
            { number: "A+", label: "Security Grade" },
            { number: "24/7", label: "Support" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl font-bold text-brand-600 dark:text-brand-400 heading-secondary mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-accent-600 dark:text-accent-400 body-text">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesProfessional;
