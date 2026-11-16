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
  { id: 1, title: "Skillaton Participation Certification", image: skillathon },
  { id: 2, title: "Summer Upskill Certification", image: summerUpskill },
  { id: 3, title: "Synergy Fest 2026", image: synergy },
  { id: 4, title: "React Certification", image: react },
  { id: 5, title: "Front - End Certification", image: front },
  { id: 6, title: "MongoDb & NodeJs Certification", image: database },
  { id: 7, title: "JavaScript Certification", image: javascript_1 },
  { id: 8, title: "NodeJs & ExpressJs Certification", image: node },
  { id: 9, title: "AI Fundamentals Certification", image: Fundamentals },
  { id: 10, title: "Brainstorming & Planning Certification", image: Brainstorming },
  { id: 11, title: "JavaScript Advanced Certification", image: javascript },
  { id: 12, title: "Networking Certification", image: network },
];

const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    if (!selectedCert) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSelectedCert(null);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCert]);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-center text-primary-light dark:text-primary-dark">
        My{" "}
        <span className="text-secondary-light dark:text-secondary-dark">
          Certificates
        </span>
      </h2>

      {/* Pure CSS GPU-Composited Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            onClick={() => setSelectedCert(cert)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setSelectedCert(cert);
              }
            }}
            className="group relative overflow-hidden rounded-xl shadow-lg bg-white dark:bg-gray-800 cursor-pointer select-none transition-transform duration-300 ease-out will-change-transform hover:-translate-y-2 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-light/10 to-secondary-light/10 dark:from-primary-dark/10 dark:to-secondary-dark/10 pointer-events-none z-10" />

            <img
              src={cert.image}
              alt={cert.title}
              width="400"
              height="256"
              loading="lazy"
              decoding="async"
              draggable="false"
              className="relative z-0 w-full h-64 object-contain p-4 block opacity-90 transition-opacity duration-300 group-hover:opacity-100"
            />

            <div className="absolute bottom-0 left-0 right-0 z-20 bg-white/95 dark:bg-gray-900/95 p-4 text-center translate-y-full transition-transform duration-300 ease-out will-change-transform group-hover:translate-y-0">
              <h3 className="font-bold text-gray-800 dark:text-white">
                {cert.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Certificate Modal */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {selectedCert && (
              <motion.div
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 sm:p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedCert(null)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onClick={(event) => event.stopPropagation()}
                  className="relative flex flex-col items-center w-full max-w-5xl max-h-[95vh]"
                >
                  <div className="relative flex items-center justify-center w-full max-h-[88vh]">
                    <img
                      src={selectedCert.image}
                      alt={selectedCert.title}
                      draggable="false"
                      className="block max-w-[96vw] sm:max-w-[92vw] lg:max-w-[88vw] max-h-[82vh] sm:max-h-[84vh] lg:max-h-[86vh] w-auto h-auto object-contain rounded-lg shadow-2xl bg-white dark:bg-gray-900"
                    />

                    <button
                      type="button"
                      aria-label="Close certificate"
                      onClick={() => setSelectedCert(null)}
                      className="absolute top-2 right-2 sm:top-4 sm:right-4 w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-black/70 hover:bg-black/90 text-white shadow-lg transition-transform duration-150 hover:scale-105 active:scale-95 z-20"
                    >
                      <span aria-hidden="true" className="text-xl sm:text-2xl leading-none">
                        ×
                      </span>
                    </button>
                  </div>

                  <div className="mt-3 sm:mt-4 px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-white/95 dark:bg-gray-900/95 shadow-lg max-w-[90vw] text-center">
                    <h3 className="text-sm sm:text-lg font-bold text-gray-800 dark:text-white">
                      {selectedCert.title}
                    </h3>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
};

export default Certificates;