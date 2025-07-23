import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import react from '../assets/images/React.png';
import front from '../assets/images/Front-End.png';
import database from '../assets/images/database.PNG';
import javascript_1 from '../assets/images/javascript_1.PNG';
import javascript from '../assets/images/javascript.PNG';
import node from '../assets/images/node.PNG';
import network from '../assets/images/network.PNG';

const certificates = [
  {
    id: 1,
    title: "React Certification",
    image: react,
  },
  {
    id: 2,
    title: "Front - End Certification",
    image: front,
  },
  {
    id: 3,
    title: "MongoDb & NodeJs Certification",
    image: database,
  },
  {
    id: 4,
    title: "JavaScript Certification",
    image: javascript_1,
  },
  {
    id: 5,
    title: "NodeJs & ExpressJs Certification",
    image: node,
  },
  {
    id: 6,
    title: "JavaScript Certification",
    image: javascript,
  },
  {
    id: 7,
    title: "Networking Certification",
    image: network,
  },
];

const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100
      }
    }
  };

  const hoverEffect = {
    scale: 1.03,
    y: -10,
    transition: { 
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.2 }
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: { 
        type: "spring",
        damping: 25,
        stiffness: 500
      }
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.h2 
        className="text-3xl font-bold mb-12 text-center text-primary-light dark:text-primary-dark"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My <span className="text-secondary-light dark:text-secondary-dark">Certificates</span>
      </motion.h2>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {certificates.map((cert, index) => (
          <motion.div
            key={cert.id}
            variants={item}
            whileHover={hoverEffect}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            onClick={() => setSelectedCert(cert)}
            className="relative overflow-hidden rounded-xl shadow-lg bg-white dark:bg-gray-800 cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-light/10 to-secondary-light/10 dark:from-primary-dark/10 dark:to-secondary-dark/10 z-10" />
            
            <motion.img
              src={cert.image}
              alt={cert.title}
              className="w-full h-64 object-contain p-4"
              initial={{ opacity: 0.9 }}
              animate={{ 
                opacity: hoveredIndex === index ? 1 : 0.9 
              }}
            />
            
            <motion.div 
              className="absolute bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 p-4 text-center"
              initial={{ y: '100%' }}
              animate={{ 
                y: hoveredIndex === index ? '0%' : '100%',
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
            >
              <h3 className="font-bold text-gray-800 dark:text-white">{cert.title}</h3>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div 
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="relative max-w-4xl w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="w-full max-h-[90vh] object-contain"
              />
              <motion.button
                className="absolute top-4 right-4 bg-white/80 dark:bg-gray-900/80 rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedCert(null)}
              >
                <span className="text-2xl">×</span>
              </motion.button>
              <motion.div 
                className="absolute bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 p-4 text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">{selectedCert.title}</h3>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;