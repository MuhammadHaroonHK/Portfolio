import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SkillCard from "../components/SkillCard";
import { FaReact, FaNodeJs, FaGitAlt, FaFigma } from "react-icons/fa";
import {
  SiExpress,
  SiMongodb,
  SiNextdotjs,
  SiTailwindcss,
  SiRedux,
  SiJavascript,
  SiCplusplus,
  SiPhp,
  SiMysql,
  SiPostman,
  SiVercel,
} from "react-icons/si";

const SKILLS = [
  { name: "React.js", icon: <FaReact size={40} />, level: "Advanced", color: "text-cyan-400" },
  { name: "Node.js", icon: <FaNodeJs size={40} />, level: "Intermediate", color: "text-green-500" },
  { name: "Express.js", icon: <SiExpress size={40} />, level: "Intermediate", color: "text-gray-400" },
  { name: "MongoDB", icon: <SiMongodb size={40} />, level: "Intermediate", color: "text-emerald-500" },
  { name: "Next.js", icon: <SiNextdotjs size={40} />, level: "Basic", color: "text-gray-800 dark:text-white" },
  { name: "Redux Toolkit", icon: <SiRedux size={40} />, level: "Intermediate", color: "text-purple-500" },
  { name: "Tailwind CSS", icon: <SiTailwindcss size={40} />, level: "Advanced", color: "text-cyan-500" },
  { name: "JavaScript", icon: <SiJavascript size={40} />, level: "Advanced", color: "text-yellow-400" },
  { name: "C++", icon: <SiCplusplus size={40} />, level: "Intermediate", color: "text-blue-600" },
  { name: "PHP", icon: <SiPhp size={40} />, level: "Basic", color: "text-indigo-400" },
  { name: "MySQL", icon: <SiMysql size={40} />, level: "Intermediate", color: "text-blue-400" },
  { name: "Git/GitHub", icon: <FaGitAlt size={40} />, level: "Intermediate", color: "text-orange-500" },
  { name: "Postman", icon: <SiPostman size={40} />, level: "Intermediate", color: "text-orange-400" },
  { name: "Figma", icon: <FaFigma size={40} />, level: "Basic", color: "text-pink-500" },
  { name: "Vercel", icon: <SiVercel size={40} />, level: "Intermediate", color: "text-black dark:text-white" },
];

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.h2
        className="text-3xl font-bold mb-12 text-center text-primary-light dark:text-primary-dark"
        initial={{ opacity: 0, y: -16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
      >
        My{" "}
        <span className="text-secondary-light dark:text-secondary-dark">
          Skills
        </span>
      </motion.h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {SKILLS.map((skill, index) => (
          <SkillCard
            key={skill.name}
            skill={skill}
            index={index}
            inView={inView}
          />
        ))}
      </div>
    </div>
  );
};

export default Skills;