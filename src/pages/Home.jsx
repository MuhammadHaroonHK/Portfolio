import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import profile from "../assets/images/profile.webp";
import Interactive3DWorkspace from "../components/Interactive3DWorkspace";
import ParticleBackground from "../components/ParticleBackground";
import {
  FaExternalLinkAlt,
  FaArrowRight,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaCode,
} from "react-icons/fa";

const Home = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Dynamic Typing State
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    "Full-Stack MERN Developer",
    "Software Engineer",
    "Building Scalable Web Apps",
  ];

  const typingSpeed = 75;
  const deletingSpeed = 35;
  const delayBetweenRoles = 2000;

  useEffect(() => {
    let timer;
    if (!inView) return;

    const currentRoleText = roles[currentRole];

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText((prev) => prev.substring(0, prev.length - 1));
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setDisplayText(currentRoleText.substring(0, displayText.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && displayText === currentRoleText) {
      clearTimeout(timer);
      timer = setTimeout(() => setIsDeleting(true), delayBetweenRoles);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [inView, displayText, currentRole, isDeleting]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-12 sm:pb-16 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 relative overflow-hidden transition-colors duration-300">
      {/* Interactive Dot & Mesh Canvas Background */}
      <ParticleBackground />

      <motion.div
        ref={ref}
        className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-4 lg:gap-8 items-center z-10"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* 3D Laptop Section - Reduced wrapper height & added negative margin to pull bottom text up */}
        <div className="order-first lg:order-last lg:col-span-5 relative flex items-center justify-center overflow-visible w-full -mb-10 sm:-mb-14 lg:mb-0">
          <div className="w-full h-[320px] sm:h-[380px] md:h-[400px] lg:h-[520px] xl:h-[580px] relative overflow-visible">
            <Interactive3DWorkspace />
          </div>
        </div>

        {/* Content & Action Buttons Section */}
        <div className="order-last lg:order-first lg:col-span-7 text-center lg:text-left">
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-4"
          >
            Hi, I'm <br className="hidden sm:inline" />
            <span className="text-indigo-600 dark:text-indigo-400">
              Muhammad Haroon
            </span>
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="mb-5 sm:mb-6 h-10 flex items-center justify-center lg:justify-start"
          >
            <div className="px-3.5 py-1.5 rounded-lg bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-mono text-sm sm:text-base flex items-center gap-2 shadow-sm">
              <FaCode className="text-indigo-600 dark:text-indigo-400" />
              <span>{displayText}</span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="font-bold text-indigo-600 dark:text-indigo-400"
              >
                |
              </motion.span>
            </div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0 mb-6 sm:mb-8"
          >
            Software Engineer specializing in MERN Stack development. I build
            high-performance, secure, and responsive web applications focused on
            clean architecture and human-centered user experiences.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-8 sm:mb-10"
          >
            <a
              href="https://drive.google.com/file/d/1TYbcagcK5tRyMevdxeekCu7TCUONDswJ/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-md shadow-indigo-500/20"
            >
              Download CV <FaExternalLinkAlt className="text-xs" />
            </a>

            <a
              href="#contact"
              className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold rounded-xl text-sm border border-slate-200 dark:border-slate-800 flex items-center justify-center gap-2 transition-all duration-200 group shadow-sm"
            >
              Let's Talk
              <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center lg:justify-start gap-4 border-t border-slate-200 dark:border-slate-800/80 pt-5 sm:pt-6"
          >
            <span className="text-xs uppercase font-semibold tracking-wider text-slate-400">
              Connect:
            </span>
            <a
              href="https://github.com/MuhammadHaroonHK"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2.5 rounded-lg bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 shadow-sm"
            >
              <FaGithub className="text-base" />
            </a>
            <a
              href="https://linkedin.com/in/muhammad-haroon-842ba2298"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2.5 rounded-lg bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 shadow-sm"
            >
              <FaLinkedin className="text-base" />
            </a>
            <a
              href="mailto:haroonhk059@gmail.com"
              aria-label="Send Email"
              className="p-2.5 rounded-lg bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 shadow-sm"
            >
              <FaEnvelope className="text-base" />
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
