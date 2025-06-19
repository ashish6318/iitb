import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavbarProfessional from "./components/NavbarProfessional";
import HeroProfessional from "./components/HeroProfessional";
import FeaturesProfessional from "./components/FeaturesProfessional";
import ServicesProfessional from "./components/ServicesProfessional";
import ShowcaseProfessional from "./components/ShowcaseProfessional";
import StatsProfessional from "./components/StatsProfessional";
import TestimonialsProfessional from "./components/TestimonialsProfessional";
import FooterBeautiful from "./components/FooterBeautiful";
import Loader from "./components/Loader";
import ThemeProvider from "./context/ThemeContext";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <div className="App">
          <AnimatePresence mode="wait">
            {loading ? (
              <Loader key="loader" />
            ) : (
              <motion.div
                key="main-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen"
              >
                <NavbarProfessional />{" "}
                <main>
                  <HeroProfessional />
                  <FeaturesProfessional />
                  <ServicesProfessional />
                  <ShowcaseProfessional />
                  <StatsProfessional />
                  <TestimonialsProfessional />
                </main>
                <FooterBeautiful />
                <ScrollToTop />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
