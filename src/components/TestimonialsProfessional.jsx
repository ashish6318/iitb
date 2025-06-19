import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const TestimonialsProfessional = () => {
  const { isDark } = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc.",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b302?w=150&h=150&fit=crop&crop=face",
      content:
        "The team delivered an exceptional product that exceeded our expectations. Their attention to detail and innovative approach made all the difference.",
      rating: 5,
      company: "TechStart Inc.",
    },
    {
      name: "Michael Chen",
      role: "CTO, InnovateAI",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content:
        "Working with this team was a game-changer for our business. They transformed our vision into reality with incredible precision and creativity.",
      rating: 5,
      company: "InnovateAI",
    },
    {
      name: "Emily Rodriguez",
      role: "Product Manager, DataFlow",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content:
        "Outstanding results! The project was delivered on time and within budget. The quality of work is simply phenomenal.",
      rating: 5,
      company: "DataFlow",
    },
  ];

  // Auto-play functionality
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Enhanced Background for Better Visibility */}
      <div className="absolute inset-0 z-base">
        {" "}
        <video
          autoPlay
          loop
          muted
          playsInline
          className={`w-full h-full object-contain transition-opacity duration-1000 ${
            isDark ? "opacity-45" : "opacity-55"
          }`}
          style={{ objectPosition: "center center" }}
        >
          <source src="/assets/testimonials.mp4" type="video/mp4" />
        </video>
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-br from-slate-950/98 via-slate-900/95 to-purple-950/98"
              : "bg-gradient-to-br from-white/98 via-slate-50/95 to-purple-50/98"
          }`}
        />
        {/* Enhanced pattern overlay */}
        <div
          className={`absolute inset-0 ${isDark ? "opacity-15" : "opacity-8"}`}
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, ${
                  isDark
                    ? "rgba(168, 85, 247, 0.1)"
                    : "rgba(139, 92, 246, 0.05)"
                } 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, ${
                  isDark
                    ? "rgba(56, 189, 248, 0.1)"
                    : "rgba(14, 165, 233, 0.05)"
                } 0%, transparent 50%)
              `,
            }}
          />
        </div>
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
            <Quote className="w-4 h-4 text-brand-500" />
            <span className="text-sm font-medium text-brand-600 dark:text-brand-400">
              Client Testimonials
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl heading-primary text-brand mb-6">
            What Our Clients
            <br />
            <span className="text-accent-800 dark:text-accent-200">
              Say About Us
            </span>
          </h2>

          <p className="text-lg body-text max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our valued clients have
            to say about their experience working with us.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="card-professional p-8 md:p-12"
            >
              {/* Quote Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
                  <Quote className="w-8 h-8 text-brand-500" />
                </div>
              </div>

              {/* Testimonial Content */}
              <blockquote className="text-center mb-8">
                <p className="text-lg md:text-xl body-text italic leading-relaxed mb-6">
                  "{testimonials[currentSlide].content}"
                </p>

                {/* Rating */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-warning-500 fill-current"
                    />
                  ))}
                </div>
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <img
                  src={testimonials[currentSlide].avatar}
                  alt={testimonials[currentSlide].name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-brand-500/20"
                />
                <div className="text-center">
                  <h4 className="text-lg heading-secondary text-accent-900 dark:text-accent-100">
                    {testimonials[currentSlide].name}
                  </h4>
                  <p className="body-text text-sm">
                    {testimonials[currentSlide].role}
                  </p>
                  <p className="text-brand-600 dark:text-brand-400 text-sm font-medium">
                    {testimonials[currentSlide].company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-600 dark:text-brand-400 hover:bg-brand-500/20 transition-colors duration-200 focus-ring"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-600 dark:text-brand-400 hover:bg-brand-500/20 transition-colors duration-200 focus-ring"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 focus-ring ${
                  index === currentSlide
                    ? "bg-brand-500"
                    : "bg-accent-300 dark:bg-accent-600 hover:bg-brand-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="card-professional max-w-2xl mx-auto p-8">
            <h3 className="text-2xl heading-secondary text-accent-900 dark:text-accent-100 mb-4">
              Ready to Join Our Success Stories?
            </h3>
            <p className="body-text mb-6">
              Let's discuss how we can help you achieve your goals and create
              your own success story.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary focus-ring"
            >
              Start Your Project Today
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsProfessional;
