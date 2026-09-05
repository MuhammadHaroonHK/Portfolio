import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

import react from "../assets/images/React.webp";
import front from "../assets/images/Front-End.webp";
import database from "../assets/images/database.webp";
import javascript_1 from "../assets/images/javascript_1.webp";
import javascript from "../assets/images/javascript.webp";
import node from "../assets/images/node.webp";
import network from "../assets/images/network.webp";
import skillathon from "../assets/images/skillathon.webp";
import synergy from "../assets/images/synergy.webp";
import summerUpskill from "../assets/images/Summer Upskill.webp";
import Brainstorming from "../assets/images/brainstorming & Planing.webp";
import Fundamentals from "../assets/images/AI fundamentals.webp";

const certificates = [
  {
    id: 1,
    title: "Skillaton Participation Certification",
    image: skillathon,
  },
  {
    id: 2,
    title: "Skillaton Participation Certification",
    image: summerUpskill,
  },
  {
    id: 3,
    title: "Synergy Fest 2026",
    image: synergy,
  },
  {
    id: 4,
    title: "React Certification",
    image: react,
  },
  {
    id: 5,
    title: "Front - End Certification",
    image: front,
  },
  {
    id: 6,
    title: "MongoDb & NodeJs Certification",
    image: database,
  },
  {
    id: 7,
    title: "JavaScript Certification",
    image: javascript_1,
  },
  {
    id: 8,
    title: "NodeJs & ExpressJs Certification",
    image: node,
  },
  {
    id: 9,
    title: "JavaScript Certification",
    image: Fundamentals,
  },
  {
    id: 10,
    title: "JavaScript Certification",
    image: Brainstorming,
  },
  {
    id: 11,
    title: "JavaScript Certification",
    image: javascript,
  },
  {
    id: 12,
    title: "Networking Certification",
    image: network,
  },
];

const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  /* =========================================================
     BODY SCROLL LOCK + ESCAPE KEY
     ========================================================= */

  useEffect(() => {
    if (!selectedCert) return;

    const originalOverflow = document.body.style.overflow;

    // Prevent background page scrolling while modal is open
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedCert(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCert]);

  /* =========================================================
     ANIMATION VARIANTS
     ========================================================= */

  const container = {
    hidden: {
      opacity: 0,
    },

    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: {
      y: 20,
      opacity: 0,
    },

    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
      },
    },
  };

  const hoverEffect = {
    scale: 1.03,
    y: -10,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.94,
    },

    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 350,
      },
    },

    exit: {
      opacity: 0,
      scale: 0.94,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* =====================================================
          SECTION TITLE
      ===================================================== */}

      <motion.h2
        className="text-3xl font-bold mb-12 text-center text-primary-light dark:text-primary-dark"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My{" "}
        <span className="text-secondary-light dark:text-secondary-dark">
          Certificates
        </span>
      </motion.h2>

      {/* =====================================================
          CERTIFICATE GRID
      ===================================================== */}

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {certificates.map((cert, index) => (
          <motion.div
            key={cert.id}
            variants={item}
            whileHover={hoverEffect}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            onClick={() => setSelectedCert(cert)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setSelectedCert(cert);
              }
            }}
            className="
              relative
              overflow-hidden
              rounded-xl
              shadow-lg
              bg-white
              dark:bg-gray-800
              cursor-pointer
              select-none
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-indigo-500
              focus-visible:ring-offset-2
              dark:focus-visible:ring-offset-gray-900
            "
          >
            {/* Decorative background */}
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-br
                from-primary-light/10
                to-secondary-light/10
                dark:from-primary-dark/10
                dark:to-secondary-dark/10
                pointer-events-none
                z-10
              "
            />

            {/* Certificate Image */}
            <motion.img
              src={cert.image}
              alt={cert.title}
              loading="lazy"
              draggable="false"
              className="
                relative
                z-0
                w-full
                h-64
                object-contain
                p-4
                block
              "
              initial={{
                opacity: 0.9,
              }}
              animate={{
                opacity: hoveredIndex === index ? 1 : 0.9,
              }}
            />

            {/* Desktop Hover Title */}
            <motion.div
              className="
                absolute
                bottom-0
                left-0
                right-0
                z-20
                bg-white/90
                dark:bg-gray-900/90
                backdrop-blur-sm
                p-4
                text-center
              "
              initial={{
                y: "100%",
              }}
              animate={{
                y: hoveredIndex === index ? "0%" : "100%",
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              <h3 className="font-bold text-gray-800 dark:text-white">
                {cert.title}
              </h3>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* =====================================================
          CERTIFICATE MODAL
          Rendered directly into <body> using React Portal
      ===================================================== */}

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {selectedCert && (
              <motion.div
                className="
                  fixed
                  inset-0
                  z-[100]
                  flex
                  items-center
                  justify-center
                  bg-black/80
                  backdrop-blur-sm
                  p-3
                  sm:p-6
                "
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.2,
                }}
                onClick={() => setSelectedCert(null)}
              >
                {/* =================================================
                    MODAL CONTENT
                ================================================= */}

                <motion.div
                  variants={modalVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={(event) => event.stopPropagation()}
                  className="
                    relative
                    flex
                    flex-col
                    items-center
                    w-full
                    max-w-5xl
                    max-h-[95vh]
                  "
                >
                  {/* ===============================================
                      IMAGE CONTAINER
                  =============================================== */}

                  <div
                    className="
                      relative
                      flex
                      items-center
                      justify-center
                      w-full
                      max-h-[88vh]
                    "
                  >
                    <img
                      src={selectedCert.image}
                      alt={selectedCert.title}
                      draggable="false"
                      className="
                        block
                        max-w-[96vw]
                        sm:max-w-[92vw]
                        lg:max-w-[88vw]
                        max-h-[82vh]
                        sm:max-h-[84vh]
                        lg:max-h-[86vh]
                        w-auto
                        h-auto
                        object-contain
                        rounded-lg
                        shadow-2xl
                        bg-white
                        dark:bg-gray-900
                      "
                    />

                    {/* =============================================
                        CLOSE BUTTON
                    ============================================= */}

                    <motion.button
                      type="button"
                      aria-label="Close certificate"
                      onClick={() => setSelectedCert(null)}
                      whileHover={{
                        scale: 1.08,
                      }}
                      whileTap={{
                        scale: 0.92,
                      }}
                      className="
                        absolute
                        top-2
                        right-2
                        sm:top-4
                        sm:right-4
                        w-9
                        h-9
                        sm:w-11
                        sm:h-11
                        rounded-full
                        flex
                        items-center
                        justify-center
                        bg-black/60
                        hover:bg-black/80
                        text-white
                        shadow-lg
                        backdrop-blur-md
                        transition-colors
                        duration-200
                        z-20
                      "
                    >
                      <span
                        aria-hidden="true"
                        className="text-xl sm:text-2xl leading-none"
                      >
                        ×
                      </span>
                    </motion.button>
                  </div>

                  {/* ===============================================
                      CERTIFICATE TITLE
                      Outside image so it never covers the image
                  =============================================== */}

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.1,
                    }}
                    className="
                      mt-3
                      sm:mt-4
                      px-4
                      py-2.5
                      sm:px-6
                      sm:py-3
                      rounded-xl
                      bg-white/95
                      dark:bg-gray-900/95
                      backdrop-blur-md
                      shadow-lg
                      max-w-[90vw]
                      text-center
                    "
                  >
                    <h3 className="text-sm sm:text-lg font-bold text-gray-800 dark:text-white">
                      {selectedCert.title}
                    </h3>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
};

export default Certificates;
