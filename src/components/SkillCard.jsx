import { motion } from "framer-motion";

const SkillCard = ({ skill, index, inView }) => {
  const barWidth =
    skill.level === "Advanced"
      ? "90%"
      : skill.level === "Intermediate"
        ? "70%"
        : "50%";

  const barColor =
    skill.level === "Advanced"
      ? "bg-green-500"
      : skill.level === "Intermediate"
        ? "bg-blue-500"
        : "bg-yellow-500";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.35,
        delay: Math.min(index * 0.05, 0.35),
        ease: "easeOut",
      }}
      className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-transform duration-200 ease-out will-change-transform hover:-translate-y-1.5 hover:scale-[1.03]"
    >
      <div
        className={`mb-3 animate-float-gpu ${skill.color}`}
        style={{ animationDelay: `${(index % 6) * 0.25}s` }}
      >
        {skill.icon}
      </div>

      <h3 className="text-lg font-semibold text-center text-gray-800 dark:text-gray-200 mb-1">
        {skill.name}
      </h3>

      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
        <div
          className={`h-2 rounded-full ${barColor}`}
          style={{ width: barWidth }}
        />
      </div>

      <span className="text-xs mt-2 text-gray-500 dark:text-gray-400">
        {skill.level}
      </span>
    </motion.div>
  );
};

export default SkillCard;