import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import about from '../assets/images/about.png';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex flex-col lg:flex-row items-center gap-8 md:gap-12"
      >
        {/* Image - Hidden on medium screens, shown on large screens */}
        <div className="hidden md:block ">
          <div className="w-80 h-64 lg:w-96 lg:h-96 rounded-xl overflow-hidden border-4 border-primary-light dark:border-primary-dark shadow-lg">
            <img
              src={about}
              alt="Muhammad Haroon"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content - Full width on medium screens */}
        <div className="w-full lg:w-2/3">
          <h2 className="text-3xl font-bold mb-6 text-primary-light dark:text-primary-dark">About Me</h2>
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            I'm a passionate MERN Stack Developer currently pursuing my BS in Software Engineering at City University of Science and Information Technology, Peshawar.
          </p>
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Currently, I'm interning at Logic Gigs Pvt Ltd, where I'm undergoing training in the MERN stack under the guidance of senior developers. I'm actively learning and practicing React.js, Node.js, Express.js, and MongoDB to prepare for real-world projects.
          </p>
          <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
            With a CGPA of 3.42/4.00, I combine strong academic knowledge with practical skills to build modern web applications. I'm particularly interested in creating responsive, user-friendly interfaces with robust backend functionality.
          </p>
          <div className="flex flex-wrap gap-3 md:gap-4">
            <div className="bg-gray-100 dark:bg-gray-500 cursor-default px-3 py-1 md:px-4 md:py-2 rounded-lg text-sm md:text-base dark:text-gray-100">
              <span className="font-medium">Email:</span> haroonhk059@gmail.com
            </div>
            <div className="bg-gray-100 dark:bg-gray-500 cursor-default px-3 py-1 md:px-4 md:py-2 rounded-lg text-sm md:text-base dark:text-gray-100">
              <span className="font-medium">Phone:</span> +92 312 9386965
            </div>
            <div className="bg-gray-100 dark:bg-gray-500 cursor-default px-3 py-1 md:px-4 md:py-2 rounded-lg text-sm md:text-base dark:text-gray-100">
              <span className="font-medium">Location:</span> Peshawar, Pakistan
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;