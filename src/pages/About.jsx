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
  FaCheckCircle,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaGlobe,
  FaMicrochip,
} from "react-icons/fa";

/* =========================================================
   INTERACTIVE TOPOLOGY CANVAS WIDGET (LIGHTWEIGHT HUD)
   ========================================================= */

const ArchitectureCanvas = () => {
  const canvasRef = useRef(null);
  const [activeNode, setActiveNode] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const nodes = [
      { id: "ui", label: "React / 3D Canvas", x: 70, y: 70, role: "Frontend Layer" },
      { id: "api", label: "Node.js REST API", x: 200, y: 150, role: "Backend Microservices" },
      { id: "db", label: "MongoDB / Cloud", x: 330, y: 70, role: "Database & Storage" },
      { id: "vps", label: "Docker / Hostinger", x: 200, y: 230, role: "Deployment & Observability" },
    ];

    let packetProgress = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Connection Lines
      ctx.strokeStyle = "rgba(99, 102, 241, 0.25)";
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      
      ctx.beginPath();
      ctx.moveTo(nodes[0].x, nodes[0].y);
      ctx.lineTo(nodes[1].x, nodes[1].y);
      ctx.lineTo(nodes[2].x, nodes[2].y);
      ctx.moveTo(nodes[1].x, nodes[1].y);
      ctx.lineTo(nodes[3].x, nodes[3].y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Animated Packet
      packetProgress = (packetProgress + 0.008) % 1;
      const p1 = nodes[0];
      const p2 = nodes[1];
      const packetX = p1.x + (p2.x - p1.x) * packetProgress;
      const packetY = p1.y + (p2.y - p1.y) * packetProgress;

      ctx.fillStyle = "#38bdf8";
      ctx.shadowColor = "#38bdf8";
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(packetX, packetY, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw Nodes
      nodes.forEach((node) => {
        const isSelected = activeNode?.id === node.id;
        ctx.fillStyle = isSelected ? "#6366f1" : "rgba(15, 23, 42, 0.85)";
        ctx.strokeStyle = isSelected ? "#38bdf8" : "rgba(99, 102, 241, 0.5)";
        ctx.lineWidth = isSelected ? 2.5 : 1.5;

        ctx.beginPath();
        ctx.arc(node.x, node.y, 22, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.font = '10px "Fira Code", monospace';
        ctx.fillStyle = isSelected ? "#38bdf8" : "#94a3b8";
        ctx.textAlign = "center";
        ctx.fillText(node.label, node.x, node.y + 36);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
      const mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);

      const found = nodes.find(
        (n) => Math.hypot(n.x - mouseX, n.y - mouseY) < 25
      );
      setActiveNode(found || null);
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [activeNode]);
};

/* =========================================================
   MAIN ABOUT COMPONENT
   ========================================================= */

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
      transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  };

  const tabs = [
    { id: "overview", label: "01 // Overview", icon: FaTerminal },
    { id: "timeline", label: "02 // Trajectory", icon: FaBriefcase },
    { id: "architecture", label: "03 // Philosophy", icon: FaServer },
  ];

  return (
    <section className="relative py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="space-y-10"
      >
        {/* =========================================================
           SECTION HEADER
           ========================================================= */}
        <div className="text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-6 border-b border-slate-200 dark:border-slate-800/80 pb-8">
          <div>
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 text-xs font-mono mb-3"
            >
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
              ENGINEER PROFILE & ARCHITECTURE
            </motion.div>
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white"
            >
              Architecting <span className="text-indigo-600 dark:text-indigo-400">Scalable</span> Systems
            </motion.h2>
          </div>

          {/* Quick Metrics Counter Strip */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-3 sm:gap-6 w-full lg:w-auto"
          >
            {[
              { label: "Degree", val: "BS SE" },
              { label: "Core Stack", val: "MERN + 3D" },
              { label: "Location", val: "PK Node" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="glass-panel p-3 rounded-xl text-center border border-slate-200 dark:border-slate-800"
              >
                <div className="text-sm sm:text-base font-bold font-mono text-indigo-600 dark:text-indigo-400">
                  {stat.val}
                </div>
                <div className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wider mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* =========================================================
           MAIN BENTO GRID LAYOUT
           ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Profile Visual & System HUD */}
          <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6">
            {/* 3D Cyber Frame Profile Card */}
            <div className="relative group rounded-2xl overflow-hidden glass-panel border border-slate-200 dark:border-slate-800 p-3">
              <div className="relative w-full h-80 sm:h-96 rounded-xl overflow-hidden">
                <img
                  src={aboutImg}
                  alt="Muhammad Haroon"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                {/* Cyber HUD Overlay Badges */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-mono">
                  <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    STATUS: ACTIVE
                  </div>
                  <div className="bg-indigo-600/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-indigo-400/30">
                    DEV // MERN STACK
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Architecture Canvas Box */}
            <div className="glass-panel rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-900/40 backdrop-blur-xl">
              <ArchitectureCanvas />
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Tabbed Interactive Matrix */}
          <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6">
            {/* Custom Tab Switcher */}
            <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-200/60 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-800 font-mono text-xs overflow-x-auto no-scrollbar">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                      isActive
                        ? "bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white shadow-md shadow-indigo-500/10"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <Icon className={isActive ? "text-indigo-600 dark:text-white" : "text-slate-400"} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Dynamic Tab Panels */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 min-h-[380px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                {/* TAB 1: OVERVIEW */}
                {activeTab === "overview" && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed"
                  >
                    <p>
                      I'm a <strong className="text-indigo-600 dark:text-indigo-400 font-semibold">Software Engineer</strong> specializing in full-stack MERN development. I hold a Bachelor of Science in Software Engineering from City University of Science and Information Technology, Peshawar.
                    </p>
                    <p>
                      My core expertise centers around engineering production-ready web applications using <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-indigo-500">React</span>, <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-indigo-500">Node.js</span>, <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-indigo-500">Express</span>, and <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-indigo-500">MongoDB</span>, supplemented with modern state management, Next.js, and interactive WebGL elements via Three.js.
                    </p>
                    <p>
                      I focus on bridging clean architectural design with smooth human-centered UI/UX, ensuring applications are performant, secure, and easily scalable.
                    </p>
                  </motion.div>
                )}

                {/* TAB 2: TIMELINE */}
                {activeTab === "timeline" && (
                  <motion.div
                    key="timeline"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="relative border-l-2 border-indigo-500/30 pl-6 space-y-6">
                      {/* Milestone 1 */}
                      <div className="relative group">
                        <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-indigo-500 border-4 border-slate-900 group-hover:scale-125 transition-transform" />
                        <span className="text-xs font-mono text-indigo-500 font-semibold">2025 - PRESENT</span>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">Full-Stack Software Engineering Projects</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                          Developing custom MERN solutions, high-performance dashboards, microservices APIs, and interactive portfolio components.
                        </p>
                      </div>

                      {/* Milestone 2 */}
                      <div className="relative group">
                        <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-indigo-500/60 border-4 border-slate-900 group-hover:scale-125 transition-transform" />
                        <span className="text-xs font-mono text-indigo-500 font-semibold">JUN 2025 - AUG 2025</span>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">MERN Stack Intern @ Logic Gigs Pvt Ltd</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                          Gained commercial experience building dynamic single-page applications, integrating secure authentication APIs, and deploying on VPS environments.
                        </p>
                      </div>

                      {/* Milestone 3 */}
                      <div className="relative group">
                        <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-indigo-500/30 border-4 border-slate-900 group-hover:scale-125 transition-transform" />
                        <span className="text-xs font-mono text-indigo-500 font-semibold">GRADUATED 2025</span>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">BS Software Engineering</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                          City University of Science & IT, Peshawar. Specialized in Software Architecture, Web Engineering, and Agile Methodologies.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB 3: ARCHITECTURE */}
                {activeTab === "architecture" && (
                  <motion.div
                    key="architecture"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  >
                    {[
                      {
                        title: "Modular REST APIs",
                        desc: "Scalable route controllers, middleware validation, and clean database abstraction.",
                        icon: FaServer,
                      },
                      {
                        title: "Reactive UI Systems",
                        desc: "Optimized React component trees with state isolation and Framer Motion dynamics.",
                        icon: FaDesktop,
                      },
                      {
                        title: "3D & Graphic Integration",
                        desc: "Enhancing user experiences with React Three Fiber, GLTF models, and Canvas shaders.",
                        icon: FaLayerGroup,
                      },
                      {
                        title: "Deployment & DevOps",
                        desc: "Deployments on VPS hosts, Vercel pipelines, and environment configuration.",
                        icon: FaTerminal,
                      },
                    ].map((pillar, idx) => {
                      const Icon = pillar.icon;
                      return (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-slate-100/60 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 space-y-2"
                        >
                          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                            <Icon className="text-sm" />
                          </div>
                          <h5 className="font-bold text-sm text-slate-900 dark:text-white">{pillar.title}</h5>
                          <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal">{pillar.desc}</p>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom Quick Contact Bar */}
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <FaEnvelope className="text-indigo-500 flex-shrink-0" />
                  <span className="truncate">haroonhk059@gmail.com</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <FaPhoneAlt className="text-indigo-500 flex-shrink-0" />
                  <span>+92 312 9386965</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <FaMapMarkerAlt className="text-indigo-500 flex-shrink-0" />
                  <span>Peshawar, Pakistan</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;