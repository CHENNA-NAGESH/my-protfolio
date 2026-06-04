import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaBriefcase } from "react-icons/fa";

const experiences = [
  {
    company: "T-Hub",
    role: "Full-Stack Trainee",
    date: "Dec 2023 - May 2024",
    skills: ["HTML", "CSS", "JavaScript", "Bootstrap", "React.js"],
    achievements: [
      "Completed an intensive training program focused on modern full-stack web development practices.",
      "Mastered HTML5, CSS3, JavaScript (ES6+), Bootstrap, and React.js, applying them to real-world interface problems.",
      "Developed responsive, interactive user interfaces and built modular components for single-page applications.",
      "Collaborated with developers to design user-friendly layouts and write clean, maintainable, and standards-compliant code."
    ]
  }
];

const timelineVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

export default function Experience() {
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const titleRef = useRef(null);

  const parallax = (e) => {
    if (!titleRef.current) return;
    const x = (e.clientX * -1) / 100;
    const y = (e.clientY * -1) / 100;
    titleRef.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    window.addEventListener("mousemove", parallax);
    return () => window.removeEventListener("mousemove", parallax);
  }, []);

  return (
    <section id="experience" className="my-20 w-full flex flex-col items-center justify-center px-4">
      <div className="max-w-4xl w-full z-[9999] flex flex-col items-center p-6 sm:p-10 section-hover-highlight">
        <h1
          ref={titleRef}
          className="font-home font-bold text-4xl sm:text-6xl text-neutral-800 dark:text-white transition-colors duration-300 pb-12"
        >
          EXPERIENCE
        </h1>

        <motion.div
          ref={ref}
          variants={timelineVariants}
          initial="hidden"
          animate={controls}
          className="relative w-full border-l border-purple-500/30 dark:border-purple-500/20 ml-4 md:ml-0"
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="mb-12 pl-8 relative"
            >
              {/* Timeline Bullet Node */}
              <span className="absolute -left-[17px] top-1 flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 dark:bg-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                <FaBriefcase size={14} />
              </span>

              {/* Experience Card */}
              <div className="p-6 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 bg-opacity-80 dark:bg-opacity-40 backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] dark:hover:shadow-[0_0_25px_rgba(168,85,247,0.2)]">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white font-home">
                      {exp.role}
                    </h3>
                    <h4 className="text-md font-semibold text-purple-600 dark:text-purple-400">
                      {exp.company}
                    </h4>
                  </div>
                  <span className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 mt-1 md:mt-0 font-home">
                    {exp.date}
                  </span>
                </div>

                <ul className="list-disc list-inside space-y-2 text-neutral-700 dark:text-neutral-300 font-sans">
                  {exp.achievements.map((ach, aIndex) => (
                    <li key={aIndex} className="leading-relaxed">
                      <span className="text-neutral-700 dark:text-neutral-300">{ach}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.skills.map((skill, sIndex) => (
                    <span
                      key={sIndex}
                      className="px-2.5 py-1 rounded text-xs font-semibold font-home tracking-wider bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
