import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Certificates from "./pages/Certificates";
import Contact from "./pages/Contact";

/* =========================================================
   INITIAL THEME
   ========================================================= */

const getInitialDarkMode = () => {
  if (typeof window === "undefined") return false;

  const savedMode = localStorage.getItem("darkMode");

  if (savedMode !== null) {
    return savedMode === "true";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

function App() {
  const [darkMode, setDarkMode] = useState(getInitialDarkMode);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  /* =======================================================
     DARK MODE INITIALIZATION
     ======================================================= */

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  /* =======================================================
     PRELOADER
     ======================================================= */

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);

          setTimeout(() => {
            setIsLoading(false);
          }, 400);

          return 100;
        }

        return prev + 5;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  /* =======================================================
     TOGGLE DARK MODE
     ======================================================= */

  const toggleDarkMode = () => {
    const newMode = !darkMode;

    setDarkMode(newMode);

    localStorage.setItem("darkMode", newMode.toString());

    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },

    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  };

  return (
    <div
      className={`min-h-screen relative font-sans ${darkMode ? "dark" : ""}`}
    >
      {/* =====================================================
          THEME-AWARE PRELOADER
          ===================================================== */}

      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.05,
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
            }}
            className="
              fixed
              inset-0
              z-[100]
              flex
              flex-col
              items-center
              justify-center
              bg-slate-50
              dark:bg-slate-950
              text-slate-900
              dark:text-white
              transition-colors
              duration-300
            "
          >
            <div className="relative flex items-center justify-center">
              {/* Outer Ring */}
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  w-32
                  h-32
                  rounded-full
                  border-t-2
                  border-b-2
                  border-indigo-500
                  shadow-[0_0_35px_rgba(99,102,241,0.35)]
                  dark:shadow-[0_0_35px_rgba(99,102,241,0.5)]
                "
              />

              {/* Percentage */}
              <div className="absolute flex flex-col items-center">
                <span
                  className="
                    text-2xl
                    font-bold
                    tracking-tighter
                    text-indigo-600
                    dark:text-indigo-400
                  "
                >
                  {loadingProgress}%
                </span>
              </div>
            </div>

            {/* Status */}
            <motion.p
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
                mt-8
                text-sm
                uppercase
                tracking-widest
                text-slate-500
                dark:text-slate-400
                font-medium
              "
            >
              Initializing 3D Workspace...
            </motion.p>

            {/* Progress Bar */}
            <div
              className="
                w-48
                h-1
                bg-slate-200
                dark:bg-slate-800
                rounded-full
                mt-4
                overflow-hidden
              "
            >
              <motion.div
                className="
                  h-full
                  bg-gradient-to-r
                  from-indigo-500
                  via-purple-500
                  to-pink-500
                "
                style={{
                  width: `${loadingProgress}%`,
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          MAIN APP
          ===================================================== */}

      {!isLoading && (
        <>
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

          <main className="relative z-10">
            {/* Home */}
            <section
              id="home"
              className="relative overflow-hidden bg-mesh-pattern"
            >
              <Home />
            </section>

            {/* About */}
            <motion.section
              id="about"
              className="py-24 relative overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                margin: "-100px",
              }}
              variants={sectionVariants}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <About />
              </div>
            </motion.section>

            {/* Skills */}
            <motion.section
              id="skills"
              className="
                py-24
                relative
                overflow-hidden
                bg-slate-100/50
                dark:bg-slate-900/40
                backdrop-blur-3xl
              "
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                margin: "-100px",
              }}
              variants={sectionVariants}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Skills />
              </div>
            </motion.section>

            {/* Projects */}
            <motion.section
              id="projects"
              className="py-24 relative overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                margin: "-100px",
              }}
              variants={sectionVariants}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Projects />
              </div>
            </motion.section>

            {/* Certificates */}
            <motion.section
              id="certificates"
              className="
                py-24
                relative
                overflow-hidden
                bg-slate-100/50
                dark:bg-slate-900/40
                backdrop-blur-3xl
              "
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                margin: "-100px",
              }}
              variants={sectionVariants}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Certificates />
              </div>
            </motion.section>

            {/* Contact */}
            <motion.section
              id="contact"
              className="py-24 relative overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                margin: "-100px",
              }}
              variants={sectionVariants}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Contact />
              </div>
            </motion.section>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
