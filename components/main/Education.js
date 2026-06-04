import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaGraduationCap } from "react-icons/fa";

const educationDetails = [
  {
    institution: "KL University",
    degree: "Bachelor of Technology",
    specialization: "Computer Science and Engineering",
    date: "July 2024 to present"
  },
  {
    institution: "Aditya Polytechnic Colleges",
    degree: "Diploma",
    specialization: "Computer Engineering",
    date: "October 2021 to May 2024"
  },
  {
    institution: "Sri Sadguru Vidyalayam",
    degree: "X Class",
    specialization: "SSC",
    date: "June 2020 to May 2021"
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

export default function Education() {
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
    <section id="education" className="my-20 w-full flex flex-col items-center justify-center px-4">
      <div className="max-w-4xl w-full z-[9999] flex flex-col items-center p-6 sm:p-10 section-hover-highlight">
        <h1
          ref={titleRef}
          className="font-home font-bold text-4xl sm:text-6xl text-neutral-800 dark:text-white transition-colors duration-300 pb-12"
        >
          EDUCATION
        </h1>

        <motion.div
          ref={ref}
          variants={timelineVariants}
          initial="hidden"
          animate={controls}
          className="relative w-full border-l border-purple-500/30 dark:border-purple-500/20 ml-4 md:ml-0"
        >
          {educationDetails.map((edu, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="mb-12 pl-8 relative"
            >
              {/* Timeline Bullet Node */}
              <span className="absolute -left-[17px] top-1 flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 dark:bg-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                <FaGraduationCap size={16} />
              </span>

              {/* Education Card */}
              <div className="p-6 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 bg-opacity-80 dark:bg-opacity-40 backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] dark:hover:shadow-[0_0_25px_rgba(168,85,247,0.2)]">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white font-home">
                      {edu.degree}
                    </h3>
                    <h4 className="text-md font-semibold text-purple-600 dark:text-purple-400">
                      {edu.specialization}
                    </h4>
                    <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 mt-1">
                      {edu.institution}
                    </p>
                  </div>
                  <div className="text-left md:text-right mt-1 md:mt-0 font-home">
                    <span className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 block">
                      {edu.date}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
