import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Play,
  Sparkles,
  Github,
  Linkedin,
  Download,
} from "lucide-react";
import * as THREE from "three";
import { useTheme } from "../context/ThemeContext";

const HeroEnhanced = () => {
  const mountRef = useRef(null);
  const { isDark } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Enhanced mouse tracking with smooth interpolation
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

  // Enhanced Three.js scene with geometric patterns
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

    // Create floating geometric shapes
    const geometries = [
      new THREE.BoxGeometry(0.5, 0.5, 0.5),
      new THREE.SphereGeometry(0.3, 16, 16),
      new THREE.ConeGeometry(0.3, 0.6, 8),
      new THREE.OctahedronGeometry(0.4),
    ];
    const materials = [
      new THREE.MeshBasicMaterial({
        color: isDark ? 0x38bdf8 : 0x0ea5e9,
        transparent: true,
        opacity: isDark ? 0.8 : 0.6,
        wireframe: true,
      }),
      new THREE.MeshBasicMaterial({
        color: isDark ? 0x7dd3fc : 0x0284c7,
        transparent: true,
        opacity: isDark ? 0.6 : 0.4,
        wireframe: true,
      }),
      new THREE.MeshBasicMaterial({
        color: isDark ? 0x0ea5e9 : 0x38bdf8,
        transparent: true,
        opacity: isDark ? 0.7 : 0.5,
        wireframe: false,
      }),
    ];

    const meshes = [];

    // Create floating shapes
    for (let i = 0; i < 15; i++) {
      const geometry =
        geometries[Math.floor(Math.random() * geometries.length)];
      const material = materials[Math.floor(Math.random() * materials.length)];
      const mesh = new THREE.Mesh(geometry, material);

      mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );

      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      mesh.userData = {
        initialPosition: mesh.position.clone(),
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        floatSpeed: Math.random() * 0.01 + 0.005,
        floatAmplitude: Math.random() * 2 + 1,
      };

      scene.add(mesh);
      meshes.push(mesh);
    }

    // Enhanced particle system
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 50;
      positions[i + 1] = (Math.random() - 0.5) * 50;
      positions[i + 2] = (Math.random() - 0.5) * 50;

      velocities[i] = (Math.random() - 0.5) * 0.002;
      velocities[i + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i + 2] = (Math.random() - 0.5) * 0.002;

      sizes[i / 3] = Math.random() * 2 + 1;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particleGeometry.setAttribute(
      "velocity",
      new THREE.BufferAttribute(velocities, 3)
    );
    particleGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    const particleMaterial = new THREE.PointsMaterial({
      size: 3,
      color: isDark ? 0x38bdf8 : 0x0ea5e9,
      transparent: true,
      opacity: isDark ? 0.9 : 0.7,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      vertexColors: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    camera.position.z = 10;
    let time = 0;

    // Enhanced animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Animate geometric shapes
      meshes.forEach((mesh, index) => {
        const userData = mesh.userData;

        // Floating animation
        mesh.position.y =
          userData.initialPosition.y +
          Math.sin(time * userData.floatSpeed + index) *
            userData.floatAmplitude;

        // Rotation animation
        mesh.rotation.x += userData.rotationSpeed;
        mesh.rotation.y += userData.rotationSpeed * 0.7;
        mesh.rotation.z += userData.rotationSpeed * 0.5;

        // Scale animation
        const scale = 1 + Math.sin(time + index) * 0.1;
        mesh.scale.setScalar(scale);
      });

      // Animate particles
      const particlePositions = particles.geometry.getAttribute("position");
      const particleVelocities = particles.geometry.getAttribute("velocity");

      for (let i = 0; i < particleCount * 3; i += 3) {
        particlePositions.array[i] += particleVelocities.array[i];
        particlePositions.array[i + 1] += particleVelocities.array[i + 1];
        particlePositions.array[i + 2] += particleVelocities.array[i + 2];

        // Boundary wrapping
        if (Math.abs(particlePositions.array[i]) > 25)
          particleVelocities.array[i] *= -1;
        if (Math.abs(particlePositions.array[i + 1]) > 25)
          particleVelocities.array[i + 1] *= -1;
        if (Math.abs(particlePositions.array[i + 2]) > 25)
          particleVelocities.array[i + 2] *= -1;
      }

      particlePositions.needsUpdate = true;

      // Enhanced camera movement
      camera.position.x += (mousePosition.x * 2 - camera.position.x) * 0.02;
      camera.position.y += (mousePosition.y * 2 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, [isDark, mousePosition]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {" "}
      {/* Enhanced Background with Better Dark Mode */}
      <div className="absolute inset-0 z-base">
        {/* Background Video */}{" "}
        <video
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`w-full h-full object-contain transition-opacity duration-1000 ${
            isDark ? "opacity-60" : "opacity-70"
          }`}
          style={{ objectPosition: "center center" }}
        >
          <source src="/assets/homepage.mp4" type="video/mp4" />
        </video>
        {/* Strong background gradient for better readability */}{" "}
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-br from-slate-950/85 via-slate-900/80 to-blue-950/85"
              : "bg-gradient-to-br from-white/85 via-slate-50/80 to-blue-50/85"
          }`}
        />
        {/* Dynamic animated overlay */}
        <div
          className="absolute inset-0 opacity-60 dark:opacity-80"
          style={{
            background: isDark
              ? `radial-gradient(ellipse at ${50 + mousePosition.x * 20}% ${
                  50 + mousePosition.y * 20
                }%, rgba(14, 165, 233, 0.4) 0%, rgba(30, 41, 59, 0.3) 40%, rgba(15, 23, 42, 0.9) 70%)`
              : `radial-gradient(ellipse at ${50 + mousePosition.x * 20}% ${
                  50 + mousePosition.y * 20
                }%, rgba(56, 189, 248, 0.25) 0%, rgba(203, 213, 225, 0.2) 40%, rgba(248, 250, 252, 0.9) 70%)`,
          }}
        />
        {/* Grid pattern overlay */}
        <div
          className={`absolute inset-0 ${isDark ? "opacity-20" : "opacity-10"}`}
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(${
                  isDark
                    ? "rgba(14, 165, 233, 0.1)"
                    : "rgba(56, 189, 248, 0.08)"
                } 1px, transparent 1px),
                linear-gradient(90deg, ${
                  isDark
                    ? "rgba(14, 165, 233, 0.1)"
                    : "rgba(56, 189, 248, 0.08)"
                } 1px, transparent 1px)
              `,
              backgroundSize: "30px 30px",
            }}
          />
        </div>
      </div>{" "}
      {/* Enhanced Three.js Interactive Background */}
      <div
        ref={mountRef}
        className="absolute inset-0 z-base pointer-events-none opacity-90 dark:opacity-95"
      />
      {/* Main Content */}
      <div className="relative z-dropdown max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Professional Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-500/10 border border-brand-500/30 backdrop-blur-lg shadow-lg"
          >
            <Sparkles className="w-5 h-5 text-brand-500" />
            <span className="text-sm font-medium text-brand-600 dark:text-brand-400">
              Full Stack Developer & UI/UX Designer
            </span>
          </motion.div>

          {/* Main Heading with Personal Branding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-4"
          >
            {" "}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl heading-primary text-brand mb-6">
              Ashish
              <br />
              <span className="text-accent-800 dark:text-accent-200">
                Rajput
              </span>
            </h1>
            <div className="flex flex-wrap justify-center gap-2 text-lg sm:text-xl text-brand-600 dark:text-brand-400">
              <span className="px-3 py-1 bg-brand-500/10 rounded-full">
                React Developer
              </span>
              <span className="px-3 py-1 bg-brand-500/10 rounded-full">
                UI/UX Designer
              </span>
              <span className="px-3 py-1 bg-brand-500/10 rounded-full">
                Frontend Specialist
              </span>
            </div>
          </motion.div>

          {/* Enhanced Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl sm:text-2xl lg:text-3xl body-text max-w-4xl mx-auto leading-relaxed"
          >
            Crafting exceptional digital experiences with cutting-edge
            technology, beautiful design, and performance optimization.
            Passionate about creating
            <span className="text-brand font-semibold">
              {" "}
              innovative solutions
            </span>{" "}
            that make a difference.
          </motion.p>

          {/* Enhanced CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-flex items-center gap-3 text-lg px-8 py-4 focus-ring shadow-xl"
            >
              <span>View My Work</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary inline-flex items-center gap-3 text-lg px-8 py-4 focus-ring shadow-xl"
            >
              <Download className="w-5 h-5" />
              <span>Download CV</span>
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="flex justify-center gap-6 pt-8"
          >
            <motion.a
              href="https://github.com/ashish6318"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 rounded-full bg-brand-500/10 border border-brand-500/30 backdrop-blur-lg flex items-center justify-center text-brand-600 dark:text-brand-400 hover:bg-brand-500/20 transition-all duration-300 shadow-lg"
            >
              <Github className="w-6 h-6" />
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/ashishrajput0904/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 rounded-full bg-brand-500/10 border border-brand-500/30 backdrop-blur-lg flex items-center justify-center text-brand-600 dark:text-brand-400 hover:bg-brand-500/20 transition-all duration-300 shadow-lg"
            >
              <Linkedin className="w-6 h-6" />
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 rounded-full bg-brand-500/10 border border-brand-500/30 backdrop-blur-lg flex items-center justify-center text-brand-600 dark:text-brand-400 hover:bg-brand-500/20 transition-all duration-300 shadow-lg"
            >
              <Play className="w-6 h-6" />
            </motion.button>
          </motion.div>

          {/* Enhanced Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-16 max-w-3xl mx-auto"
          >
            {[
              { number: "50+", label: "Projects Completed", icon: "🚀" },
              { number: "3+", label: "Years Experience", icon: "⭐" },
              { number: "100%", label: "Client Satisfaction", icon: "❤️" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="card-professional p-6 text-center group hover:scale-105 transition-transform duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl sm:text-4xl font-bold text-brand-600 dark:text-brand-400 heading-secondary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-accent-600 dark:text-accent-400 body-text">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-dropdown"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-8 h-12 border-2 border-brand-500/50 rounded-full flex justify-center backdrop-blur-sm bg-brand-500/5"
        >
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-4 bg-brand-500 rounded-full mt-3"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroEnhanced;
