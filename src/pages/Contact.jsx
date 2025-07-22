import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ContactForm from '../components/ContactForm';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row gap-12"
      >
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold mb-8 text-primary-light dark:text-primary-dark">Get In Touch</h2>
          <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
            Have a project in mind or want to discuss potential opportunities? Feel free to reach out!
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="text-primary-light dark:text-primary-dark mr-4 mt-1">
                <FaEnvelope size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Email</h3>
                <a href="mailto:haroonhk059@gmail.com" className="text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-300">
                  haroonhk059@gmail.com
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="text-primary-light dark:text-primary-dark mr-4 mt-1">
                <FaPhone size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Phone</h3>
                <a href="tel:+923129386965" className="text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-300">
                  +92 312 9386965
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="text-primary-light dark:text-primary-dark mr-4 mt-1">
                <FaMapMarkerAlt size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Location</h3>
                <p className="text-gray-600 dark:text-gray-400">Peshawar, Pakistan</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="text-primary-light dark:text-primary-dark mr-4 mt-1">
                <FaLinkedin size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">LinkedIn</h3>
                <a 
                  href="https://linkedin.com/in/muhammad-haroon-842ba2298" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-300"
                >
                  muhammad-haroon-842ba2298
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:w-1/2">
          <ContactForm />
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;