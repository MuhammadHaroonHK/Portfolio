import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import about from '../assets/images/about.webp';

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
            I'm a Software Engineer and MERN Stack Developer passionate about building modern, scalable, and user-friendly web applications. I recently completed my BS in Software Engineering from City University of Science and Information Technology, Peshawar, and enjoy turning ideas into real-world digital solutions.
          </p>
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            During my MERN Stack internship at Logic Gigs Pvt Ltd, I gained hands-on experience developing full-stack applications using React, Node.js, Express.js, and MongoDB. Since then, I have continued expanding my expertise by working with Next.js, TypeScript, PostgreSQL, Tailwind CSS, Git, and modern development workflows.
          </p>
          <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
            I enjoy solving real-world problems through clean, maintainable code and continuously improving my technical skills. Currently, I'm seeking an opportunity as a Software Engineer or MERN Stack Developer where I can contribute, learn from experienced teams, and grow as a full-stack developer.
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