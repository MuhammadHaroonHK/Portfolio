import React from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";

const clsx = (...args) => args.filter(Boolean).join(" ");

const ProjectCard = ({ project, index, inView }) => {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);
  const containerRef = React.useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Default gradient for mobile (centered)
  const mobileGradient = `radial-gradient(350px circle at 50% 50%, rgba(158,122,255,0.4), rgba(56,189,248,0.4), rgba(255,92,92,0.4), rgba(254,139,187,0.4), transparent 100%)`;

  return (
    <motion.div
      className="h-full flex flex-col"
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.5 }}
    >
      <div
        ref={containerRef}
        className={clsx(
          "relative rounded-2xl overflow-hidden p-[1px] transition-all duration-300 flex flex-col flex-grow group",
          "shadow-xl shadow-black/5 dark:shadow-black/20"
        )}
        style={{
          background:
            typeof window !== "undefined" && window.innerWidth < 640
              ? mobileGradient
              : isHovered
              ? `radial-gradient(
                  400px circle at ${mousePos.x}px ${mousePos.y}px,
                  rgba(158, 122, 255, 0.8),
                  rgba(56, 189, 248, 0.8),
                  rgba(255, 92, 92, 0.8),
                  rgba(254, 139, 187, 0.8),
                  transparent 70%
                )`
              : "rgba(255, 255, 255, 0.08)",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Glassmorphic Inner Container */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl rounded-2xl overflow-hidden transition-all duration-300 flex flex-col flex-grow h-full border border-white/20 dark:border-white/10">
          
          {/* Project Image with Zoom Effect */}
          <div className="relative h-48 overflow-hidden flex-shrink-0">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
          </div>

          {/* Content Container */}
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white tracking-tight">
              {project.title}
            </h3>
            
            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 flex-grow leading-relaxed">
              {project.description}
            </p>

            {/* Technologies Used (Glass pills) */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-100/80 dark:bg-white/5 border border-gray-200/60 dark:border-white/10 text-xs font-medium rounded-full text-gray-700 dark:text-gray-300 backdrop-blur-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Visit Project Button */}
            <div className="mt-auto pt-2">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-semibold bg-primary-light dark:bg-primary-dark text-white rounded-xl shadow-md hover:opacity-95 transition-all duration-300 transform active:scale-[0.98]"
              >
                Visit Project <FaExternalLinkAlt className="ml-2 text-xs" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;