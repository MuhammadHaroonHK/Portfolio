import { useState, useEffect, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import { Mascot } from "page-mascot";
import Home from "./pages/Home";

const InteractiveFluid = lazy(
  () => import("./components/InteractiveFluid/InteractiveFluid")
);
const About = lazy(() => import("./pages/About"));
const Skills = lazy(() => import("./pages/Skills"));
const Projects = lazy(() => import("./pages/Projects"));
const Certificates = lazy(() => import("./pages/Certificates"));
const Contact = lazy(() => import("./pages/Contact"));

const getInitialDarkMode = () => {
  if (typeof window === "undefined") return false;
  const savedMode = localStorage.getItem("darkMode");
  if (savedMode !== null) return savedMode === "true";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const SectionFallback = () => (
  <div className="w-full h-48 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

const MASCOT_OFFSETS = {
  home: { x: "50vw", y: "85vh" },
  about: { x: "92vw", y: "85vh" },
  skills: { x: "8vw", y: "25vh" },
  projects: { x: "92vw", y: "25vh" },
  certificates: { x: "8vw", y: "25vh" },
  contact: { x: "50vw", y: "85vh" },
};

function App() {
  const [darkMode, setDarkMode] = useState(getInitialDarkMode);
  const [activeSection, setActiveSection] = useState("home");
  const [mountFluid, setMountFluid] = useState(false);

  // Defer WebGPU fluid until after initial LCP paint, then keep active across all sections
  useEffect(() => {
    const startFluid = () => setMountFluid(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(startFluid, { timeout: 800 });
      return () => window.cancelIdleCallback(id);
    } else {
      const timer = setTimeout(startFluid, 400);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const sectionIds = [
      "home",
      "about",
      "skills",
      "projects",
      "certificates",
      "contact",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  };

  return (
    <div
      className={`min-h-screen relative font-sans bg-slate-50 dark:bg-slate-950 transition-colors duration-300 ${
        darkMode ? "dark" : ""
      }`}
    >
      {/* Full-page Interactive Fluid Background across all sections */}
      {mountFluid && (
        <Suspense fallback={null}>
          <InteractiveFluid />
        </Suspense>
      )}

      {/* GPU-Composited Floating Mascot */}
      <div className="hidden md:block fixed inset-0 z-50 pointer-events-none">
        <motion.div
          className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-auto will-change-transform"
          initial={false}
          animate={MASCOT_OFFSETS[activeSection] || MASCOT_OFFSETS.home}
          transition={{
            type: "spring",
            stiffness: 65,
            damping: 18,
            mass: 0.8,
          }}
        >
          <Mascot
            directions="/mascots/fox-directions.webp"
            reactions="/mascots/fox-reactions.webp"
          />
        </motion.div>
      </div>

      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="relative z-10">
        <section id="home" className="relative overflow-hidden">
          <Home />
        </section>

        <Suspense fallback={<SectionFallback />}>
          <motion.section
            id="about"
            className="py-2 relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={sectionVariants}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <About />
            </div>
          </motion.section>

          <motion.section
            id="skills"
            className="py-2 relative overflow-hidden bg-slate-100/50 dark:bg-slate-900/45"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={sectionVariants}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Skills />
            </div>
          </motion.section>

          <motion.section
            id="projects"
            className="py-2 relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={sectionVariants}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Projects />
            </div>
          </motion.section>

          <motion.section
            id="certificates"
            className="py-2 relative overflow-hidden bg-slate-100/50 dark:bg-slate-900/45"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={sectionVariants}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Certificates />
            </div>
          </motion.section>

          <motion.section
            id="contact"
            className="py-2 relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={sectionVariants}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Contact />
            </div>
          </motion.section>
        </Suspense>
      </main>
    </div>
  );
}

export default App;