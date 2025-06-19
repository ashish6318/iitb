import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github, Eye, Play } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ShowcaseProfessional = () => {
  const { isDark } = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "Modern shopping experience with advanced filtering and real-time updates",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "/assets/cards.png",
      category: "Web Application",
    },
    {
      title: "Analytics Dashboard",
      description:
        "Real-time data visualization with interactive charts and insights",
      tech: ["Vue.js", "D3.js", "Express", "PostgreSQL"],
      image: "/assets/graph.png",
      category: "Data Visualization",
    },
    {
      title: "Performance Metrics",
      description:
        "Comprehensive analytics platform with real-time performance tracking",
      tech: ["Next.js", "Socket.io", "Redis", "AWS"],
      image: "/assets/stats.png",
      category: "Analytics Platform",
    },
  ];

  return (
    <section id="showcase" className="relative py-20 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-base">
        {" "}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-contain opacity-20"
          style={{ objectPosition: "center center" }}
        >
          <source src="/assets/showcase work.mp4" type="video/mp4" />
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
            <Eye className="w-4 h-4 text-brand-500" />
            <span className="text-sm font-medium text-brand-600 dark:text-brand-400">
              Our Showcase
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl heading-primary text-brand mb-6">
            Featured
            <br />
            <span className="text-accent-800 dark:text-accent-200">
              Projects
            </span>
          </h2>

          <p className="text-lg body-text max-w-3xl mx-auto">
            Discover our portfolio of successful projects that showcase our
            expertise in creating innovative digital solutions.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 * index, duration: 0.8 }}
              className="card-professional group overflow-hidden"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Overlay Actions */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-brand-500/80 transition-colors duration-200"
                    >
                      <Play className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-brand-500/80 transition-colors duration-200"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-brand-500/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl heading-secondary text-accent-900 dark:text-accent-100 mb-3">
                  {project.title}
                </h3>

                <p className="body-text text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-accent-100 dark:bg-accent-800 text-accent-700 dark:text-accent-300 text-xs rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-medium text-sm hover:gap-3 transition-all duration-300 focus-ring"
                  >
                    <span>View Project</span>
                    <ExternalLink className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 text-accent-600 dark:text-accent-400 font-medium text-sm hover:gap-3 transition-all duration-300 focus-ring"
                  >
                    <Github className="w-4 h-4" />
                    <span>Code</span>
                  </motion.button>
                </div>
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
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary inline-flex items-center gap-2 focus-ring"
          >
            <span>View All Projects</span>
            <ExternalLink className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ShowcaseProfessional;
