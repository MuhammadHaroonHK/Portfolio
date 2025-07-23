import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
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
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimation();

  // Initialize animation
  useEffect(() => {
    controls.start({
      x: ['0%', '-100%'],
      transition: {
        duration: 80,
        repeat: Infinity,
        ease: 'linear',
      }
    });
  }, [controls]);

  // Pause/resume based on hover state
  useEffect(() => {
    if (isPaused) {
      controls.stop();
    } else {
      controls.start({
        x: ['0%', '-100%'],
        transition: {
          duration: 80,
          repeat: Infinity,
          ease: 'linear',
        }
      });
    }
  }, [isPaused, controls]);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-center text-primary-light dark:text-primary-dark">
        My <span className="text-secondary-light dark:text-secondary-dark">Certificates</span>
      </h2>

      <div className="relative h-64 overflow-hidden">
        <motion.div
          className="absolute flex gap-8"
          animate={controls}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {[...certificates, ...certificates].map((cert, index) => (
            <motion.div
              key={`${cert.id}-${index}`}
              className="w-64 h-48 flex-shrink-0 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedCert(cert)}
            >
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-full object-contain rounded-lg shadow-lg"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Certificate Modal */}
      {selectedCert && (
        <div 
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCert(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedCert.image}
              alt={selectedCert.title}
              className="w-full max-h-[90vh] object-contain rounded-lg"
            />
            <button
              className="absolute -top-12 right-0 text-white text-3xl"
              onClick={() => setSelectedCert(null)}
            >
              ×
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Certificates;