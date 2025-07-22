import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('darkMode') === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    document.documentElement.classList.toggle('dark');
  };

  // Section-specific background colors
  const sectionColors = {
    home: darkMode ? 'bg-gray-900' : 'bg-indigo-50',
    about: darkMode ? 'bg-gray-800' : 'bg-indigo-100',
    skills: darkMode ? 'bg-gray-900' : 'bg-emerald-50',
    projects: darkMode ? 'bg-gray-800' : 'bg-indigo-100',
    contact: darkMode ? 'bg-gray-900' : 'bg-blue-50',
  };

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main>
        {/* Home Section */}
        <section 
          id="home" 
          className={`${sectionColors.home} transition-colors duration-500`}
        >
          <Home />
        </section>

        {/* About Section */}
        <motion.section
          id="about"
          className={`${sectionColors.about} transition-colors duration-500 py-20`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <About />
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          id="skills"
          className={`${sectionColors.skills} transition-colors duration-500 py-20`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Skills />
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          id="projects"
          className={`${sectionColors.projects} transition-colors duration-500 py-20`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Projects />
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          className={`${sectionColors.contact} transition-colors duration-500 py-20`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Contact />
          </div>
        </motion.section>
      </main>
    </div>
  );
}

export default App;