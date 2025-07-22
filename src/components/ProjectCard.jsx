import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';

const ProjectCard = ({ project, index, inView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.2, duration: 0.5 }}
      className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
    >
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
    </motion.div>
  );
};

export default ProjectCard;