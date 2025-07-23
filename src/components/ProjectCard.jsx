import React from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';

const clsx = (...args) => args.filter(Boolean).join(' ');

const ProjectCard = ({ project, index, inView }) => {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);
  const containerRef = React.useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Default gradient for mobile (centered)
  const mobileGradient = `radial-gradient(350px circle at 50% 50%, #9E7AFF, #38bdf8, #FF5C5C, #FE8BBB, transparent 100%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.2, duration: 0.5 }}
    >
      <div
        ref={containerRef}
        className={clsx(
          "relative rounded-lg overflow-hidden p-[3px] transition-all duration-300",
          "sm:hover:shadow-lg shadow-md"
        )}
        style={{
          background: isHovered
            ? `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, #9E7AFF, #38bdf8, #FF5C5C, #FE8BBB, transparent 80%)`
            : `sm:rgba(255, 255, 255, 0.05) ${mobileGradient}`,
          // Apply mobile gradient by default, desktop style only on sm+
          background: window.innerWidth < 640 ? mobileGradient : 
            (isHovered 
              ? `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, #9E7AFF, #38bdf8, #FF5C5C, #FE8BBB, transparent 80%)`
              : 'rgba(255, 255, 255, 0.05)')
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden transition-shadow duration-300 h-full">
          <div className="h-48 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
              {project.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {project.description}
            </p>
            <div className="mb-4">
              <h4 className="font-semibold text-sm mb-2 text-primary-light dark:text-primary-dark">
                Technologies Used:
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-600 text-xs rounded-full text-gray-700 dark:text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-primary-light dark:bg-primary-dark text-white rounded-lg hover:bg-opacity-90 transition-colors duration-300"
            >
              Visit Project <FaExternalLinkAlt className="ml-2" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;