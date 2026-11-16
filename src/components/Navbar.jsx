import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { FaBars, FaTimes } from "react-icons/fa";

const NAV_LINKS = [
  { name: "Home", path: "#home" },
  { name: "About", path: "#about" },
  { name: "Skills", path: "#skills" },
  { name: "Projects", path: "#projects" },
  { name: "Certificates", path: "#certificates" },
  { name: "Contact", path: "#contact" },
];

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, path) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const targetId = path.replace("#", "");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      setTimeout(() => {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }, 80);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 transition-all duration-300">
      <nav
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${
          scrolled
            ? "bg-white/95 dark:bg-slate-900/95 shadow-lg shadow-indigo-500/5 py-3"
            : "bg-white/80 dark:bg-slate-900/80 py-4"
        }`}
      >
        <div className="px-4 sm:px-6 flex items-center justify-between">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2 group"
          >
            <span className="w-3 h-3 rounded-full bg-indigo-500 group-hover:scale-125 transition-transform duration-300 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
            Muhammad Haroon
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => handleNavClick(e, link.path)}
                className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}

            <div className="ml-4 pl-4 border-l border-slate-200 dark:border-slate-800">
              <ThemeToggle
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
              />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle Navigation"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <FaTimes className="h-5 w-5" />
              ) : (
                <FaBars className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown (GPU opacity + translateY) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="md:hidden border-t border-slate-200/50 dark:border-slate-800/50 mt-3"
            >
              <div className="px-4 pt-3 pb-4 space-y-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.path}
                    onClick={(e) => handleNavClick(e, link.path)}
                    className="block px-4 py-2.5 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;