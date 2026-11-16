import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import aboutImg from "../assets/images/about.webp";
import {
  FaBriefcase,
  FaTerminal,
  FaServer,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaCode,
  FaDatabase,
  FaGitAlt,
  FaReact,
  FaNodeJs,
  FaFigma,
} from "react-icons/fa";
import {
  SiExpress,
  SiMongodb,
  SiNextdotjs,
  SiTailwindcss,
  SiPostman,
  SiVercel,
} from "react-icons/si";

const TABS = [
  { id: "overview", label: "Overview", icon: FaCode },
  { id: "experience", label: "Experience", icon: FaBriefcase },
  { id: "stack", label: "Tech Stack", icon: FaServer },
];

const TECH_STACK = {
  frontend: [
    { name: "React", icon: FaReact },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "TypeScript", icon: FaCode },
    { name: "Tailwind CSS", icon: SiTailwindcss },
  ],
  backend: [
    { name: "Node.js", icon: FaNodeJs },
    { name: "Express.js", icon: SiExpress },
    { name: "REST APIs", icon: FaTerminal },
    { name: "JWT Auth", icon: FaDatabase },
  ],
  database: [
    { name: "MongoDB", icon: SiMongodb },
    { name: "PostgreSQL", icon: FaDatabase },
    { name: "Prisma", icon: FaDatabase },
  ],
  tools: [
    { name: "Git", icon: FaGitAlt },
    { name: "GitHub", icon: FaGitAlt },
    { name: "Postman", icon: SiPostman },
    { name: "Figma", icon: FaFigma },
    { name: "Vercel", icon: SiVercel },
  ],
};

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeTab, setActiveTab] = useState("overview");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { y: 18, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  return (
    <div className="relative py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden rounded-3xl bg-white/90 dark:bg-slate-950/90 border border-slate-200/80 dark:border-slate-800/80 shadow-xl my-12">
      {/* Lightweight CSS radial glow (zero GPU blur-3xl filter cost) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(circle at 0% 0%, rgba(99,102,241,0.12), transparent 45%), radial-gradient(circle at 100% 100%, rgba(168,85,247,0.12), transparent 45%)",
        }}
      />

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative z-10 space-y-10"
      >
        {/* SECTION HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-6">
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Software Engineer
          </motion.h2>

          {/* Quick stats */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-6 text-sm"
          >
            <div className="text-center">
              <span className="block text-lg font-bold text-indigo-600 dark:text-indigo-400">
                2+
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Years Code
              </span>
            </div>

            <div className="w-px h-8 bg-slate-200 dark:bg-slate-700" />

            <div className="text-center">
              <span className="block text-lg font-bold text-indigo-600 dark:text-indigo-400">
                MERN
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Core Stack
              </span>
            </div>

            <div className="w-px h-8 bg-slate-200 dark:bg-slate-700" />

            <div className="text-center">
              <span className="block text-lg font-bold text-indigo-600 dark:text-indigo-400">
                BS SE
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Degree
              </span>
            </div>
          </motion.div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: Profile Image + Contact */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 space-y-5"
          >
            <div className="relative rounded-2xl overflow-hidden bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-md">
              <div className="aspect-[4/3] w-full relative">
                <img
                  src={aboutImg}
                  alt="Muhammad Haroon, Software Engineer"
                  width="600"
                  height="450"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Quick contact row */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/90 rounded-xl px-4 py-3 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
              <div className="flex items-center gap-1.5">
                <FaEnvelope className="text-indigo-500" />
                <span className="truncate">haroonhk059@gmail.com</span>
              </div>

              <span className="text-slate-300 dark:text-slate-700">|</span>

              <div className="flex items-center gap-1.5">
                <FaPhoneAlt className="text-indigo-500" />
                <span>+92 312 9386965</span>
              </div>

              <span className="text-slate-300 dark:text-slate-700">|</span>

              <div className="flex items-center gap-1.5">
                <FaMapMarkerAlt className="text-indigo-500" />
                <span>Islamabad, PK</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Tabbed Content */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-7 space-y-5"
          >
            {/* Tab Buttons */}
            <div className="flex gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm overflow-x-auto no-scrollbar">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium transition-colors duration-200 whitespace-nowrap ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    <Icon
                      className={isActive ? "text-white" : "text-slate-400"}
                    />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab Panels */}
            <div className="bg-slate-50/80 dark:bg-slate-900/80 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 min-h-[340px] shadow-sm">
              <AnimatePresence mode="wait">
                {activeTab === "overview" && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed"
                  >
                    <p>
                      I'm a{" "}
                      <strong className="text-indigo-600 dark:text-indigo-400 font-semibold">
                        Software Engineer
                      </strong>{" "}
                      with a Bachelor's degree in Software Engineering from{" "}
                      <span className="text-slate-900 dark:text-white font-medium">
                        City University, Peshawar
                      </span>
                      . I enjoy building web applications that are simple to
                      use, reliable, and easy to maintain.
                    </p>

                    <p>
                      I mainly work with the{" "}
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/40 text-indigo-600 dark:text-indigo-400">
                        MERN
                      </span>{" "}
                      stack, using MongoDB, Express.js, React, and Node.js. I
                      also work with Next.js, TypeScript, PostgreSQL, Prisma,
                      and modern development tools.
                    </p>

                    <p>
                      I have hands-on experience working on real projects,
                      fixing existing issues, adding new features, building
                      APIs, and deploying applications. I like learning new
                      technologies and improving my skills by working on
                      practical projects.
                    </p>
                  </motion.div>
                )}

                {activeTab === "experience" && (
                  <motion.div
                    key="experience"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div className="relative border-l-2 border-indigo-500/30 pl-6 space-y-6">
                      <div className="relative">
                        <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-indigo-500 border-2 border-white dark:border-slate-900 shadow-sm" />
                        <div className="text-[10px] font-mono text-indigo-500 font-semibold uppercase tracking-wide">
                          2023 - Present
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                          Software Engineer
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                          Working on full-stack web applications, building
                          features, fixing issues, and improving existing
                          projects using modern web technologies.
                        </p>
                      </div>

                      <div className="relative">
                        <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-indigo-500/60 border-2 border-white dark:border-slate-900 shadow-sm" />
                        <div className="text-[10px] font-mono text-indigo-500 font-semibold uppercase tracking-wide">
                          Jun 2025 - Aug 2025
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                          MERN Stack Intern at Logic Gigs Pvt Ltd
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                          Worked on a real MERN project, fixed frontend and
                          backend issues, added new features, and deployed the
                          application on a Hostinger VPS.
                        </p>
                      </div>

                      <div className="relative">
                        <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-indigo-500/30 border-2 border-white dark:border-slate-900 shadow-sm" />
                        <div className="text-[10px] font-mono text-indigo-500 font-semibold uppercase tracking-wide">
                          Graduated 2026
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                          BS Software Engineering
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                          City University of Science & IT, Peshawar. Studied
                          software development, web engineering, databases,
                          software architecture, and related subjects.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "stack" && (
                  <motion.div
                    key="stack"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.entries(TECH_STACK).map(([category, items]) => (
                        <div
                          key={category}
                          className="rounded-xl bg-white dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 p-4"
                        >
                          <h3 className="text-[10px] font-mono uppercase tracking-wider text-indigo-500 dark:text-indigo-400 mb-3">
                            {category}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {items.map((tech) => {
                              const Icon = tech.icon;
                              return (
                                <span
                                  key={tech.name}
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/70 text-xs text-slate-700 dark:text-slate-300 shadow-sm"
                                >
                                  <Icon className="text-indigo-500 text-[10px]" />
                                  {tech.name}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;