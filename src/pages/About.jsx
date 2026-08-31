import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import aboutImg from "../assets/images/about.webp";
import {
  FaGraduationCap,
  FaBriefcase,
  FaTerminal,
  FaServer,
  FaDesktop,
  FaLayerGroup,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaCode,
  FaDatabase,
  FaCloud,
  FaGitAlt,
  FaReact,
  FaNodeJs,
} from "react-icons/fa";

/* ============================================================
   MAIN ABOUT COMPONENT — REDESIGNED
   ============================================================ */

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: FaCode },
    { id: "experience", label: "Experience", icon: FaBriefcase },
    { id: "stack", label: "Tech Stack", icon: FaServer },
  ];

  // Tech stack data
  const techStack = {
    frontend: [
      { name: "React", icon: FaReact },
      { name: "Next.js", icon: FaDesktop },
      { name: "TypeScript", icon: FaCode },
      { name: "Tailwind", icon: FaLayerGroup },
    ],
    backend: [
      { name: "Node.js", icon: FaNodeJs },
      { name: "Express", icon: FaServer },
      { name: "REST API", icon: FaTerminal },
      { name: "JWT Auth", icon: FaDatabase },
    ],
    database: [
      { name: "MongoDB", icon: FaDatabase },
      { name: "PostgreSQL", icon: FaDatabase },
      { name: "Redis", icon: FaDatabase },
      { name: "Prisma", icon: FaDatabase },
    ],
    devops: [
      { name: "Docker", icon: FaCloud },
      { name: "AWS", icon: FaCloud },
      { name: "Git", icon: FaGitAlt },
      { name: "CI/CD", icon: FaTerminal },
    ],
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="space-y-12"
      >
        {/* =============================================
                   SECTION HEADER
                ============================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 text-xs font-mono text-indigo-500 dark:text-indigo-400 mb-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              ABOUT / PROFILE
            </motion.div>
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white"
            >
              Software Engineer
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-1 max-w-xl"
            >
              Full-stack developer specializing in MERN, scalable APIs, and
              human-centered interfaces.
            </motion.p>
          </div>

          {/* Quick stats — clean & meaningful */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-6 text-sm"
          >
            <div className="text-center">
              <span className="block text-lg font-bold text-indigo-600 dark:text-indigo-400">
                2+
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-500">
                Years Code
              </span>
            </div>
            <div className="w-px h-8 bg-slate-200 dark:bg-slate-700" />
            <div className="text-center">
              <span className="block text-lg font-bold text-indigo-600 dark:text-indigo-400">
                MERN
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-500">
                Core Stack
              </span>
            </div>
            <div className="w-px h-8 bg-slate-200 dark:bg-slate-700" />
            <div className="text-center">
              <span className="block text-lg font-bold text-indigo-600 dark:text-indigo-400">
                BS SE
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-500">
                Degree
              </span>
            </div>
          </motion.div>
        </div>

        {/* =============================================
                   MAIN GRID: Profile + Tabs
                ============================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: Profile Image + Canvas */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 space-y-5"
          >
            {/* Profile Image Card */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="aspect-[4/3] w-full relative">
                <img
                  src={aboutImg}
                  alt="Muhammad Haroon — Software Engineer"
                  className="w-full h-full object-cover object-center"
                />
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />

                {/* Info badge — clean and minimal */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 bg-slate-900/70 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-700/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[10px] font-mono text-white/80">
                      ACTIVE
                    </span>
                  </div>
                  <div className="bg-indigo-600/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-indigo-400/30">
                    <span className="text-[10px] font-mono text-white">
                      MERN · FULL-STACK
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick contact row */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 rounded-xl px-4 py-3 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-indigo-500" />
                <span className="truncate">haroonhk059@gmail.com</span>
              </div>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <div className="flex items-center gap-2">
                <FaPhoneAlt className="text-indigo-500" />
                <span>+92 312 9386965</span>
              </div>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-indigo-500" />
                <span>Peshawar, PK</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Tabbed Content */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-7 space-y-5"
          >
            {/* Tab Buttons */}
            <div className="flex gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? "bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white shadow-md shadow-indigo-500/10"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
                    }`}
                  >
                    <Icon
                      className={
                        isActive
                          ? "text-indigo-600 dark:text-white"
                          : "text-slate-400"
                      }
                    />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab Panels */}
            <div className="bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 min-h-[340px]">
              <AnimatePresence mode="wait">
                {/* ——— OVERVIEW ——— */}
                {activeTab === "overview" && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed"
                  >
                    <p>
                      I'm a{" "}
                      <strong className="text-indigo-600 dark:text-indigo-400 font-semibold">
                        Software Engineer
                      </strong>{" "}
                      with a Bachelor's in Software Engineering from{" "}
                      <span className="text-slate-900 dark:text-white">
                        City University, Peshawar
                      </span>
                      . I build production-grade web applications with a focus
                      on clean architecture, maintainable code, and smooth user
                      experiences.
                    </p>
                    <p>
                      My core stack is{" "}
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-indigo-500">
                        MERN
                      </span>{" "}
                      — MongoDB, Express, React, Node.js — supplemented with
                      Next.js, TypeScript, and modern DevOps practices. I design
                      systems that are performant, secure, and scalable from the
                      ground up.
                    </p>
                    <p>
                      Beyond code, I care about architecture decisions,
                      developer experience, and bridging the gap between
                      technical constraints and business goals. I believe great
                      software is built with empathy — for both the user and the
                      team.
                    </p>
                  </motion.div>
                )}

                {/* ——— EXPERIENCE ——— */}
                {activeTab === "experience" && (
                  <motion.div
                    key="experience"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    {/* Timeline */}
                    <div className="relative border-l-2 border-indigo-500/30 pl-6 space-y-6">
                      {/* Item 1 */}
                      <div>
                        <div className="absolute -left-[9px] top-1.5 w-3.5 h-3.5 rounded-full bg-indigo-500 border-2 border-white dark:border-slate-900 shadow-sm" />
                        <div className="text-[10px] font-mono text-indigo-500 font-semibold uppercase tracking-wide">
                          2025 – Present
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                          Full-Stack Development
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                          Building custom MERN solutions, dashboards, and
                          microservices. Focus on performance, security, and
                          maintainable code.
                        </p>
                      </div>

                      {/* Item 2 */}
                      <div>
                        <div className="absolute -left-[9px] top-1.5 w-3.5 h-3.5 rounded-full bg-indigo-500/60 border-2 border-white dark:border-slate-900 shadow-sm" />
                        <div className="text-[10px] font-mono text-indigo-500 font-semibold uppercase tracking-wide">
                          Jun 2025 – Aug 2025
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                          MERN Stack Intern — Logic Gigs Pvt Ltd
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                          Commercial experience building SPAs, integrating
                          secure authentication, and deploying on VPS
                          environments.
                        </p>
                      </div>

                      {/* Item 3 */}
                      <div>
                        <div className="absolute -left-[9px] top-1.5 w-3.5 h-3.5 rounded-full bg-indigo-500/30 border-2 border-white dark:border-slate-900 shadow-sm" />
                        <div className="text-[10px] font-mono text-indigo-500 font-semibold uppercase tracking-wide">
                          Graduated 2025
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                          BS Software Engineering
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                          City University of Science & IT, Peshawar. Specialized
                          in Software Architecture, Web Engineering, and Agile.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ——— TECH STACK ——— */}
                {activeTab === "stack" && (
                  <motion.div
                    key="stack"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.entries(techStack).map(([category, items]) => (
                        <div
                          key={category}
                          className="rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-4"
                        >
                          <h5 className="text-[10px] font-mono uppercase tracking-wider text-indigo-500 dark:text-indigo-400 mb-3">
                            {category}
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {items.map((tech) => {
                              const Icon = tech.icon;
                              return (
                                <span
                                  key={tech.name}
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300"
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
    </section>
  );
};

export default About;
