import React, { useRef } from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";

const ProjectCard = ({ project, index, inView }) => {
  const cardRef = useRef(null);

  // Updates CSS variables directly on DOM node — 0 React re-renders!
  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      className="h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: Math.min(index * 0.1, 0.3), duration: 0.4 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="relative rounded-2xl overflow-hidden p-[1px] flex flex-col flex-grow group shadow-xl shadow-black/5 dark:shadow-black/20 bg-slate-200/70 dark:bg-white/10"
      >
        {/* GPU-composited radial spotlight overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), rgba(158, 122, 255, 0.75), rgba(56, 189, 248, 0.75), rgba(255, 92, 92, 0.75), transparent 70%)",
          }}
        />

        {/* Inner Container (removed expensive backdrop-blur-2xl on 6 stacked cards) */}
        <div className="relative bg-white/95 dark:bg-gray-900/95 rounded-2xl overflow-hidden flex flex-col flex-grow h-full border border-white/20 dark:border-white/10">
          {/* Project Image */}
          <div className="relative h-48 overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-800">
            <img
              src={project.image}
              alt={project.title}
              width="600"
              height="338"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 pointer-events-none" />
          </div>

          {/* Content Container */}
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white tracking-tight">
              {project.title}
            </h3>

            <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 flex-grow leading-relaxed">
              {project.description}
            </p>

            {/* Technologies Used */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-100 dark:bg-white/5 border border-gray-200/80 dark:border-white/10 text-xs font-medium rounded-full text-gray-700 dark:text-gray-300"
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
                className="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-semibold bg-primary-light dark:bg-primary-dark text-white rounded-xl shadow-md hover:opacity-95 transition-transform duration-200 active:scale-[0.98]"
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