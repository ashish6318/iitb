import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import * as THREE from "three";
import { useTheme } from "../context/ThemeContext";

const HeroProfessional = () => {
  const mountRef = useRef(null);
  const { isDark } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Simplified mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Optimized Three.js particles
  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Single optimized particle system
    const particleCount = 100; // Reduced for performance
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 15;
      positions[i + 1] = (Math.random() - 0.5) * 15;
      positions[i + 2] = (Math.random() - 0.5) * 15;

      velocities[i] = (Math.random() - 0.5) * 0.001;
      velocities[i + 1] = (Math.random() - 0.5) * 0.001;
      velocities[i + 2] = (Math.random() - 0.5) * 0.001;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("velocity", new THREE.BufferAttribute(velocities, 3));

    const material = new THREE.PointsMaterial({
      size: 0.02,
      color: isDark ? 0x0ea5e9 : 0x38bdf8,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    camera.position.z = 5;

    // Smooth animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      const positions = particles.geometry.getAttribute("position");
      const velocities = particles.geometry.getAttribute("velocity");

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions.array[i] += velocities.array[i];
        positions.array[i + 1] += velocities.array[i + 1];
        positions.array[i + 2] += velocities.array[i + 2];

        // Wrap particles
        if (Math.abs(positions.array[i]) > 7.5) velocities.array[i] *= -1;
        if (Math.abs(positions.array[i + 1]) > 7.5)
          velocities.array[i + 1] *= -1;
        if (Math.abs(positions.array[i + 2]) > 7.5)
          velocities.array[i + 2] *= -1;
      }

      positions.needsUpdate = true;

      // Subtle camera movement
      camera.position.x += (mousePosition.x * 0.1 - camera.position.x) * 0.02;
      camera.position.y += (mousePosition.y * 0.1 - camera.position.y) * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [isDark, mousePosition]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-base">
        <video
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          className="w-full h-full object-cover opacity-30"
        >
          <source src="/assets/homepage.mp4" type="video/mp4" />
        </video>
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-br from-accent-900/90 via-accent-800/80 to-brand-900/90"
              : "bg-gradient-to-br from-white/90 via-accent-50/80 to-brand-50/90"
          }`}
        />
      </div>

      {/* Three.js Particles */}
      <div
        ref={mountRef}
        className="absolute inset-0 z-base pointer-events-none"
      />

      {/* Main Content */}
      <div className="relative z-dropdown max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-brand-500" />
            <span className="text-sm font-medium text-brand-600 dark:text-brand-400">
              Award-Winning Development Team
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl sm:text-6xl lg:text-7xl heading-primary text-brand mb-6"
          >
            Frontend
            <br />
            <span className="text-accent-800 dark:text-accent-200">
              Excellence
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg sm:text-xl lg:text-2xl body-text max-w-3xl mx-auto leading-relaxed"
          >
            Crafting exceptional digital experiences with cutting-edge
            technology, beautiful design, and performance optimization.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4 focus-ring"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary inline-flex items-center gap-2 text-lg px-8 py-4 focus-ring"
            >
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto"
          >
            {[
              { number: "150+", label: "Projects Completed" },
              { number: "98%", label: "Client Satisfaction" },
              { number: "24/7", label: "Support Available" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-brand-600 dark:text-brand-400 heading-secondary">
                  {stat.number}
                </div>
                <div className="text-sm text-accent-600 dark:text-accent-400 mt-1 body-text">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-dropdown"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-brand-500/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-brand-500 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroProfessional;
