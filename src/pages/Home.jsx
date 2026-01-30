import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import profile from '../assets/images/profile.png'
import { FaExternalLinkAlt } from 'react-icons/fa';
const Home = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Typing animation state
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = ['MERN Stack Developer', 'Software Engineer', 'Web Developer'];
  const typingSpeed = 1500;
  const deletingSpeed = 500;
  const delayBetweenRoles = 10000;

  useEffect(() => {
    let timer;
    
    if (inView) {
      const currentRoleText = roles[currentRole];
      
      if (isDeleting) {
        // Backspace effect
        setDisplayText(currentRoleText.substring(0, displayText.length - 1));
        timer = setTimeout(() => {
          if (displayText === '') {
            setIsDeleting(false);
            setCurrentRole((currentRole + 1) % roles.length);
          }
        }, deletingSpeed);
      } else {
        // Typing effect
        setDisplayText(currentRoleText.substring(0, displayText.length + 1));
        timer = setTimeout(() => {
          if (displayText === currentRoleText) {
            setIsDeleting(true);
            timer = setTimeout(() => {}, delayBetweenRoles);
          }
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timer);
  }, [inView, displayText, currentRole, isDeleting]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const imageVariants = {
    hidden: { x: 100, opacity: 0, rotate: 10 },
    visible: {
      x: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const textVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
      },
    },
  };

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 150,
      },
    },
  };

  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        ref={ref}
        className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20 max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Content on the left */}
        <div className="text-center lg:text-left">
          <motion.h1
            variants={textVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-primary-light dark:text-primary-dark"
          >
            Hi, I'm <span className="text-secondary-light dark:text-secondary-dark">Muhammad Haroon</span>
          </motion.h1>

          <motion.div variants={textVariants} className="mb-6">
            <div className="h-16 flex items-center justify-center lg:justify-start">
              <span className="px-4 py-2 bg-primary-light/10 dark:bg-primary-dark/10 text-primary-light dark:text-primary-dark rounded-full text-lg sm:text-xl">
                {displayText}
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="ml-1"
                >
                  |
                </motion.span>
              </span>
            </div>
          </motion.div>

          <motion.p
            variants={textVariants}
            className="text-lg sm:text-xl mb-10 text-gray-600 dark:text-gray-400 max-w-2xl"
          >
            I build exceptional digital experiences with modern web technologies including React, Node.js, Express, and MongoDB.
          </motion.p>

          <motion.div
            variants={textVariants}
            className="flex flex-wrap justify-center lg:justify-start gap-4"
          >
            <motion.a
              href="https://drive.google.com/file/d/1TYbcagcK5tRyMevdxeekCu7TCUONDswJ/view?usp=drive_link" target='blank'
              className="px-8 py-3 bg-primary-light dark:bg-primary-dark text-white rounded-lg hover:bg-opacity-90 transition-colors duration-300"
              variants={buttonVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download CV <FaExternalLinkAlt className="ml-2 inline" />
            </motion.a>
            <motion.a
              href="#contact"
              className="px-6 py-3 border-2 border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
              variants={buttonVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
          </motion.div>
        </div>

        {/* Image on the right (top on mobile) */}
        <motion.div
          variants={imageVariants}
          className="relative w-64 h-64 md:w-96 md:h-96 order-last lg:order-last"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark rounded-full"
            style={{ rotate: 45 }}
            animate={{ rotate: [45, 405] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl"
            variants={floatingVariants}
            animate="float"
          >
            {/* Replace with your actual image */}
            <img
              src={profile}
              alt="Muhammad Haroon"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;