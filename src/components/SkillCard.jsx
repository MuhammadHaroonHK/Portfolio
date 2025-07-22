import { motion } from 'framer-motion';

const SkillCard = ({ skill, index, inView }) => {
  // Unique animation for each card
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.8,
      rotate: -5
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: index * 0.1
      }
    },
    hover: {
      y: -5,
      scale: 1.05,
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  // Floating animation for the icon
  const iconVariants = {
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 3 + index * 0.2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover="hover"
      className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
    >
      <motion.div
        variants={iconVariants}
        animate={inView ? "float" : {}}
        className={`mb-3 ${skill.color}`}
      >
        {skill.icon}
      </motion.div>
      <h3 className="text-lg font-semibold text-center text-gray-800 dark:text-gray-200 mb-1">
        {skill.name}
      </h3>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
        <div 
          className={`h-2 rounded-full ${
            skill.level === 'Advanced' ? 'bg-green-500' :
            skill.level === 'Intermediate' ? 'bg-blue-500' :
            'bg-yellow-500'
          }`}
          style={{
            width: skill.level === 'Advanced' ? '90%' :
                  skill.level === 'Intermediate' ? '70%' : '50%'
          }}
        ></div>
      </div>
      <span className="text-xs mt-2 text-gray-500 dark:text-gray-400">
        {skill.level}
      </span>
    </motion.div>
  );
};

export default SkillCard;