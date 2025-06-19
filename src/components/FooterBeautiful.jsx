import React from "react";
import { motion } from "framer-motion";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Heart,
  Star,
  Sparkles,
  Rocket,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { isDark } = useTheme();

  const footerLinks = {
    Company: [
      { name: "About Us", href: "#about" },
      { name: "Our Team", href: "#team" },
      { name: "Careers", href: "#careers" },
      { name: "Contact", href: "#contact" },
    ],
    Services: [
      { name: "Web Development", href: "#web-dev" },
      { name: "Mobile Apps", href: "#mobile" },
      { name: "UI/UX Design", href: "#design" },
      { name: "Consulting", href: "#consulting" },
    ],
    Resources: [
      { name: "Blog", href: "#blog" },
      { name: "Documentation", href: "#docs" },
      { name: "Help Center", href: "#help" },
      { name: "Privacy Policy", href: "#privacy" },
    ],
  };
  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/ashish6318",
      label: "GitHub",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://www.linkedin.com/in/ashishrajput0904/",
      label: "LinkedIn",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:ashishrajput0904@gmail.com",
      label: "Email",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      href: "tel:+91-XXXXXXXXXX",
      label: "Phone",
    },
  ];
  return (
    <footer className="relative overflow-hidden">
      {/* Enhanced Dark Mode Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent dark:from-black/40" />
      </div>
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              isDark ? "bg-brand-400" : "bg-brand-500"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>{" "}
      {/* Animated overlay */}
      <div
        className={`absolute inset-0 ${
          isDark
            ? "bg-gradient-to-r from-accent-800/20 via-brand-900/20 to-accent-800/20"
            : "bg-gradient-to-r from-brand-500/10 via-accent-500/10 to-brand-400/10"
        } animate-pulse`}
      ></div>
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              {" "}
              <motion.h3
                className={`text-3xl heading-primary mb-6 ${
                  isDark ? "text-accent-100" : "text-accent-900"
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-brand">FBWinner</span>
              </motion.h3>
              <p
                className={`text-lg mb-8 leading-relaxed ${
                  isDark ? "text-accent-300" : "text-accent-600"
                }`}
              >
                Crafting extraordinary digital experiences with cutting-edge
                technology and creative innovation.
              </p>
              {/* Contact Info */}
              <div className="space-y-4">
                <motion.div
                  className={`flex items-center space-x-3 ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                  whileHover={{ x: 5 }}
                >
                  <Mail className="w-5 h-5" />
                  <span>hello@digitalmagic.dev</span>
                </motion.div>
                <motion.div
                  className={`flex items-center space-x-3 ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                  whileHover={{ x: 5 }}
                >
                  <Phone className="w-5 h-5" />
                  <span>+1 (555) 123-4567</span>
                </motion.div>
                <motion.div
                  className={`flex items-center space-x-3 ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                  whileHover={{ x: 5 }}
                >
                  <MapPin className="w-5 h-5" />
                  <span>San Francisco, CA</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([category, links], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h4
                  className={`text-xl font-bold mb-6 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      {" "}
                      <motion.a
                        href={link.href}
                        className={`transition-colors duration-300 hover:scale-105 inline-block ${
                          isDark
                            ? "text-accent-300 hover:text-brand-400"
                            : "text-accent-600 hover:text-brand-600"
                        }`}
                        whileHover={{ x: 5 }}
                      >
                        {link.name}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="border-t border-accent-700/20 mt-16 pt-12"
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
              <div className="flex space-x-6">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className={`flex items-center justify-center w-12 h-12 rounded-full border transition-all duration-300 ${
                      isDark
                        ? "bg-white/5 border-white/10 hover:bg-brand-500/20 hover:border-brand-400/50 text-accent-300 hover:text-brand-400"
                        : "bg-black/5 border-black/10 hover:bg-brand-500/20 hover:border-brand-400/50 text-accent-600 hover:text-brand-600"
                    }`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>{" "}
              <motion.div
                className="flex items-center space-x-2 text-white dark:text-slate-200"
                whileHover={{ scale: 1.05 }}
              >
                <span>Made with</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Heart className="w-5 h-5 text-red-400" />
                </motion.div>
                <span>by Ashish Rajput for Frontend Battle 2025</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced Copyright with Personal Branding */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center pt-8 border-t border-white/10 dark:border-slate-700/30 mt-8 text-white/80 dark:text-slate-300"
          >
            {" "}
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span>
                &copy; {currentYear} FBWinner - Built by Ashish Rajput
              </span>
              <Sparkles className="w-4 h-4 text-blue-400" />
            </div>
            <div className="flex items-center justify-center space-x-4 text-sm text-white/60 dark:text-slate-400">
              <a
                href="https://github.com/ashish6318"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                GitHub: ashish6318
              </a>
              <span>•</span>
              <a
                href="https://www.linkedin.com/in/ashishrajput0904/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                LinkedIn: ashishrajput0904
              </a>
            </div>
          </motion.div>
        </div>
      </div>{" "}
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-brand-500/10 to-accent-500/10 rounded-full -translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-br from-accent-500/10 to-brand-500/10 rounded-full translate-x-24 translate-y-24"></div>
    </footer>
  );
};

export default Footer;
