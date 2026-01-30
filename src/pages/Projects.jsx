import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ProjectCard from '../components/ProjectCard';
import rabit from '../assets/images/rabit.PNG';
import green from '../assets/images/green.PNG';
import netflix from '../assets/images/netflix.PNG';
import quiz from '../assets/images/quiz.PNG';
import gpa from '../assets/images/gpa.PNG';
import portfo from '../assets/images/portfo.PNG';
import adeverywhere from '../assets/images/AdEverywhere.PNG';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = [
    {
      title: "E-Commerce Website",
      description: "A full-stack e-commerce platform with product listings, cart functionality, user authentication, and payment processing.",
      technologies: ["ReactJS", "Redux Toolkit", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "JWT"],
      image: rabit,
      link: "https://e-commerce-web-3ftx.vercel.app/",
    },
    {
      title: "AdEverywhere",
      description: "The plateform aims to connect Advertiser's with Advertising Asset Owner's in this advance Tech world.",
      technologies: ["ReactJS", "Redux Toolkit", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "JWT"],
      image: adeverywhere,
      link: "https://ad-everywhere.vercel.app/",
    },
    {
      title: "Portfolio Website",
      description: "My personal portfolio website displays my skills, projects, achievements, and contact details professionally.",
      technologies: ["ReactJS", "Tailwind CSS", "Framer Motion", "React Icons"],
      image: portfo,
      link: "https://haroon-hk.vercel.app/",
    },
    {
      title: "Netflix Clone Website",
      description: "A Netflix-inspired UI with movie listings and trailers, demonstrating API integration and responsive design.",
      technologies: ["ReactJS", "CSS", "Axios"],
      image: netflix,
      link: "https://netflix-clone-sigma-gray-65.vercel.app/",
    },
    {
      title: "Green House Website",
      description: "A website for a greenhouse business showcasing their products and services with a modern UI.",
      technologies: ["ReactJS", "Tailwind CSS", "Redux Toolkit"],
      image: green,
      link: "https://shopping-seven-gilt.vercel.app/",
    },
    // {
    //   title: "Quiz App",
    //   description: "A simple quiz app that tests users with multiple-choice questions and shows their score at the end.",
    //   technologies: ["ReactJS", "CSS"],
    //   image: quiz,
    //   link: "https://quiz-app-ten-psi-40.vercel.app/",
    // },
    {
      title: "GPA Calculator",
      description: "A GPA calculator app that calculates SGPA and CGPA based on user input grades and credits.",
      technologies: ["ReactJS", "Tailwind CSS"],
      image: gpa,
      link: "https://quiz-app-ten-psi-40.vercel.app/",
    },
  ];

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.h2 
          className="text-3xl font-bold mb-12 text-center text-primary-light dark:text-primary-dark"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          My <span className="text-secondary-light dark:text-secondary-dark">Projects</span>
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              inView={inView}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Projects;