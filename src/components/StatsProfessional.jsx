import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TrendingUp, Users, Award, Globe } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const StatsProfessional = () => {
  const { isDark } = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      number: "10,000+",
      label: "Happy Clients",
      description: "Satisfied customers worldwide",
      color: "brand",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      number: "150+",
      label: "Projects Done",
      description: "Successfully completed projects",
      color: "success",
    },
    {
      icon: <Award className="w-8 h-8" />,
      number: "25+",
      label: "Awards Won",
      description: "Industry recognition received",
      color: "warning",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      number: "50+",
      label: "Countries",
      description: "Global presence established",
      color: "brand",
    },
  ];

  const CountUp = ({ end, duration = 2500, inView }) => {
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
      if (!inView) return;

      let startTime = null;
      const endValue = parseInt(end.replace(/\D/g, ""));

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);

        setCount(Math.floor(progress * endValue));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, [inView, end, duration]);

    return (
      <span>
        {count.toLocaleString()}
        {end.replace(/\d/g, "").replace(/,/g, "")}
      </span>
    );
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with Stats Image */}
      <div className="absolute inset-0 z-base">
        <div className="w-full h-full bg-gradient-to-br from-brand-600/10 via-accent-500/5 to-success-600/10">
          <img
            src="/assets/stats.png"
            alt="Statistics Background"
            className="w-full h-full object-cover opacity-10 mix-blend-overlay"
          />
        </div>
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-br from-accent-900/90 via-accent-800/85 to-brand-900/90"
              : "bg-gradient-to-br from-white/90 via-accent-50/85 to-brand-50/90"
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
            <TrendingUp className="w-4 h-4 text-brand-500" />
            <span className="text-sm font-medium text-brand-600 dark:text-brand-400">
              Our Impact
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl heading-primary text-brand mb-6">
            Numbers That
            <br />
            <span className="text-accent-800 dark:text-accent-200">
              Speak Volumes
            </span>
          </h2>

          <p className="text-lg body-text max-w-3xl mx-auto">
            Our commitment to excellence is reflected in the trust our clients
            place in us and the results we deliver consistently.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.2 * index, duration: 0.8 }}
              className="card-professional text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="p-8">
                {/* Icon */}
                <div
                  className={`w-16 h-16 mx-auto rounded-xl bg-${stat.color}-500/10 border border-${stat.color}-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <div
                    className={`text-${stat.color}-600 dark:text-${stat.color}-400`}
                  >
                    {stat.icon}
                  </div>
                </div>

                {/* Number */}
                <div className="text-3xl sm:text-4xl font-bold text-brand-600 dark:text-brand-400 heading-secondary mb-2">
                  <CountUp end={stat.number} inView={inView} />
                </div>

                {/* Label */}
                <h3 className="text-lg heading-secondary text-accent-900 dark:text-accent-100 mb-2">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="body-text text-sm">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievement Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 flex flex-wrap justify-center gap-6"
        >
          {[
            "ISO 9001 Certified",
            "Google Partner",
            "AWS Certified",
            "React Specialist",
          ].map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
              className="px-4 py-2 bg-accent-100 dark:bg-accent-800 text-accent-700 dark:text-accent-300 rounded-full text-sm font-medium"
            >
              {badge}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsProfessional;
