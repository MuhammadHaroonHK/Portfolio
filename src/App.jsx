import { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import { Mascot } from "page-mascot";

// Keep top-of-fold critical content static for immediate FCP
import Home from "./pages/Home";

// Code-split below-the-fold sections into separate dynamic chunks
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

// Minimal lightweight loader fallback while below-the-fold chunks download
const SectionFallback = () => (
  <div className="w-full h-48 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  const [darkMode, setDarkMode] = useState(getInitialDarkMode);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "skills",
        "projects",
        "certificates",
        "contact",
      ];

      const center = window.innerHeight / 2;
      let closestSection = "home";
      let closestDistance = Infinity;

      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const distance =
          center < rect.top
            ? rect.top - center
            : center > rect.bottom
              ? center - rect.bottom
              : 0;

        if (distance < closestDistance) {
          closestDistance = distance;
          closestSection = id;
        }
      });

      setActiveSection(closestSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* Theme Sync */
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  /* Non-blocking Preloader dismiss */
  useEffect(() => {
    const handleLoad = () => setIsLoading(false);

    if (document.readyState === "complete") {
      setIsLoading(false);
    } else {
      window.addEventListener("load", handleLoad);
      // Fallback safeguard to prevent hanging preloader
      const timer = setTimeout(() => setIsLoading(false), 1500);
      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(timer);
      };
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  };

  return (
    <div
      className={`min-h-screen relative font-sans ${darkMode ? "dark" : ""}`}
    >
      {/* Animated Floating Mascot */}
      {(() => {
        const positions = {
          home: { left: "50%", top: "85%" },
          about: { left: "92%", top: "85%" },
          skills: { left: "8%", top: "25%" },
          projects: { left: "92%", top: "25%" },
          certificates: { left: "8%", top: "25%" },
          contact: { left: "50%", top: "85%" },
        };

        return (
          <div className="hidden md:block fixed inset-0 z-50 pointer-events-none">
            <motion.div
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
              initial={false}
              animate={positions[activeSection]}
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
        );
      })()}
      {/* Preloader Overlay (Fades out seamlessly without unmounting root UI) */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
          >
            <div className="relative flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-2 border-t-indigo-500 border-r-transparent border-b-purple-500 border-l-transparent animate-spin" />
            </div>
            <p className="mt-4 text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-medium">
              Loading Portfolio...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Layout rendered immediately so browser paints DOM during bundle fetches */}
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="relative z-10">
        {/* Home Section (Statically Loaded for Immediate LCP) */}
        <section id="home" className="relative overflow-hidden">
          <Home />
        </section>

        {/* Deferred Sections via Suspense */}
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
            className="py-2 relative overflow-hidden bg-slate-100/50 dark:bg-slate-900/40 backdrop-blur-3xl"
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
            className="py-2 relative overflow-hidden bg-slate-100/50 dark:bg-slate-900/40 backdrop-blur-3xl"
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
