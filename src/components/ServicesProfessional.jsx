import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Code,
  Palette,
  Smartphone,
  Zap,
  Users,
  Trophy,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ServicesProfessional = () => {
  const { isDark } = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Web Development",
      description:
        "Custom web applications built with modern technologies and best practices",
      features: [
        "React & Next.js",
        "TypeScript",
        "API Integration",
        "Performance Optimization",
      ],
      color: "brand",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "UI/UX Design",
      description:
        "Beautiful and intuitive user interfaces that convert visitors into customers",
      features: [
        "User Research",
        "Wireframing",
        "Prototyping",
        "Visual Design",
      ],
      color: "accent",
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Development",
      description:
        "Cross-platform mobile apps that deliver exceptional user experiences",
      features: [
        "React Native",
        "Flutter",
        "iOS & Android",
        "App Store Optimization",
      ],
      color: "success",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Performance Optimization",
      description:
        "Lightning-fast websites that rank higher and convert better",
      features: [
        "Core Web Vitals",
        "SEO Optimization",
        "Caching Strategies",
        "CDN Integration",
      ],
      color: "warning",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Augmentation",
      description:
        "Skilled developers to scale your team and accelerate your projects",
      features: [
        "Expert Developers",
        "Agile Methodology",
        "Seamless Integration",
        "Flexible Contracts",
      ],
      color: "brand",
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Digital Strategy",
      description:
        "Strategic consulting to help your business succeed in the digital landscape",
      features: [
        "Market Analysis",
        "Technology Roadmap",
        "Growth Strategy",
        "Digital Transformation",
      ],
      color: "accent",
    },
  ];

  return (
    <section id="services" className="relative py-20 overflow-hidden">
      {" "}
      {/* Enhanced Background with Better Dark Mode */}
      <div className="absolute inset-0 z-base">
        {" "}
        <video
          autoPlay
          loop
          muted
          playsInline
          className={`w-full h-full object-contain transition-opacity duration-1000 ${
            isDark ? "opacity-50" : "opacity-60"
          }`}
          style={{ objectPosition: "center center" }}
        >
          <source src="/assets/features-services.mp4" type="video/mp4" />
        </video>{" "}
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-br from-slate-950/80 via-slate-900/75 to-blue-950/80"
              : "bg-gradient-to-br from-white/80 via-slate-50/75 to-blue-50/80"
          }`}
        />
        {/* Enhanced grid pattern */}
        <div
          className={`absolute inset-0 ${isDark ? "opacity-20" : "opacity-10"}`}
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(${
                  isDark
                    ? "rgba(56, 189, 248, 0.1)"
                    : "rgba(14, 165, 233, 0.08)"
                } 1px, transparent 1px),
                linear-gradient(90deg, ${
                  isDark
                    ? "rgba(56, 189, 248, 0.1)"
                    : "rgba(14, 165, 233, 0.08)"
                } 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        {/* Animated overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent dark:via-blue-400/20 animate-pulse" />
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
            <Trophy className="w-4 h-4 text-brand-500" />
            <span className="text-sm font-medium text-brand-600 dark:text-brand-400">
              Our Services
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl heading-primary text-brand mb-6">
            What We
            <br />
            <span className="text-accent-800 dark:text-accent-200">
              Deliver
            </span>
          </h2>

          <p className="text-lg body-text max-w-3xl mx-auto">
            Comprehensive digital solutions tailored to your business needs,
            from concept to deployment and beyond.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * index, duration: 0.8 }}
              className="card-professional group hover-lift glow-on-hover"
            >
              <div className="p-8">
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-xl bg-${service.color}-500/10 border border-${service.color}-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <div
                    className={`text-${service.color}-600 dark:text-${service.color}-400`}
                  >
                    {service.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl heading-secondary text-accent-900 dark:text-accent-100 mb-4">
                  {service.title}
                </h3>

                <p className="body-text mb-6 text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center gap-2 text-sm"
                    >
                      <CheckCircle
                        className={`w-4 h-4 text-${service.color}-500 flex-shrink-0`}
                      />
                      <span className="body-text text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.button
                  whileHover={{ x: 5 }}
                  className={`inline-flex items-center gap-2 text-${service.color}-600 dark:text-${service.color}-400 font-medium text-sm hover:gap-3 transition-all duration-300 focus-ring`}
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="card-professional max-w-2xl mx-auto p-8">
            <h3 className="text-2xl heading-secondary text-accent-900 dark:text-accent-100 mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="body-text mb-6">
              Let's discuss how we can help bring your vision to life with our
              expertise and dedication.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-flex items-center gap-2 focus-ring"
            >
              <span>Get Free Consultation</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesProfessional;
