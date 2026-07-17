import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import profile from '../assets/images/profile.png';
import { 
  FaExternalLinkAlt, 
  FaArrowRight, 
  FaLinkedin, 
  FaGithub, 
  FaEnvelope 
} from 'react-icons/fa';

const Home = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Typing animation state
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    'Full-Stack MERN Developer',
    'Software Engineer',
    'Turning Ideas into Web Applications'
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
        setDisplayText(prev => prev.substring(0, prev.length - 1));
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setDisplayText(currentRoleText.substring(0, displayText.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && displayText === currentRoleText) {
      clearTimeout(timer);
      timer = setTimeout(() => setIsDeleting(true), delayBetweenRoles);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [inView, displayText, currentRole, isDeleting]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.85, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  };

  const textVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 lg:py-0 bg-white dark:bg-gray-900 transition-colors duration-300">
      <motion.div
        ref={ref}
        className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16 max-w-6xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Left Section (Content & Socials) */}
        <div className="text-center lg:text-left flex-1 w-full">
          <motion.p 
            variants={textVariants}
            className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-primary-light dark:text-primary-dark mb-3"
          >
            Available for Opportunities
          </motion.p>

          <motion.h1
            variants={textVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight text-gray-900 dark:text-white"
          >
            Hi, I'm <span className="text-secondary-light dark:text-secondary-dark">Muhammad Haroon</span>
          </motion.h1>

          {/* Typing Container */}
          <motion.div variants={textVariants} className="mb-6 h-14 flex items-center justify-center lg:justify-start">
            <span className="px-4 py-2 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 shadow-sm text-primary-light dark:text-primary-dark font-medium rounded-full text-sm sm:text-base inline-flex items-center">
              {displayText}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="ml-1 font-bold text-secondary-light dark:text-secondary-dark"
              >
                |
              </motion.span>
            </span>
          </motion.div>

          <motion.p
            variants={textVariants}
            className="text-base sm:text-lg mb-8 text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed mx-auto lg:mx-0"
          >
            Software Engineer specializing in building secure, scalable, and high-performance web applications using the <strong>MERN Stack</strong>.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={textVariants}
            className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-8"
          >
            <motion.a
              href="https://drive.google.com/file/d/1TYbcagcK5tRyMevdxeekCu7TCUONDswJ/view?usp=drive_link" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary-light dark:bg-primary-dark text-white font-medium rounded-xl shadow-sm hover:bg-opacity-90 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Download CV <FaExternalLinkAlt className="ml-2 text-xs" />
            </motion.a>
            
            <motion.a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-300 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Let's Talk 
              <FaArrowRight className="ml-2 text-xs group-hover:translate-x-1 transition-transform duration-200" />
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            variants={textVariants}
            className="flex items-center justify-center lg:justify-start gap-6 border-t border-gray-100 dark:border-gray-800 pt-6 max-w-xs mx-auto lg:mx-0"
          >
            <a 
              href="https://github.com/your-username" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="text-xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-300"
            >
              <FaGithub />
            </a>
            <a 
              href="https://linkedin.com/in/your-username" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="text-xl text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-300"
            >
              <FaLinkedin />
            </a>
            <a 
              href="mailto:your.email@gmail.com"
              aria-label="Send Email"
              className="text-xl text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors duration-300"
            >
              <FaEnvelope />
            </a>
          </motion.div>
        </div>

        {/* Right Section (Profile Image with Gradient Ring) */}
        <motion.div
          variants={imageVariants}
          className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[350px] lg:h-[350px] flex items-center justify-center shrink-0"
        >
          {/* Subtle spinning gradient background ring (Only around the image as requested) */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark rounded-full opacity-80"
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Floating inner profile image container */}
          <motion.div
            className="relative w-[95%] h-[95%] rounded-full overflow-hidden border-4 border-white dark:border-gray-900 shadow-xl bg-gray-50 dark:bg-gray-800"
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src={profile}
              alt="Muhammad Haroon"
              className="w-full h-full object-cover transform scale-105 hover:scale-110 transition-transform duration-500"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;