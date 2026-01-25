import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiPython,
  SiMysql,
  SiBootstrap,
  SiGit,
  SiCplusplus,
  SiVisualstudiocode,
  SiPycharm,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import SkillsItem from "./skills/SkillsItem";

const skills = [
  {
    name: "HTML",
    Icon: SiHtml5,
    color: "#e34c26",
  },
  {
    name: "CSS",
    Icon: SiCss3,
    color: "#264de4",
  },
  {
    name: "JavaScript",
    Icon: SiJavascript,
    color: "#f0db4f",
  },
  {
    name: "Bootstrap",
    Icon: SiBootstrap,
    color: "#7952b3",
  },
  {
    name: "C",
    Icon: SiCplusplus,
    color: "#00599c",
  },
  {
    name: "C++",
    Icon: SiCplusplus,
    color: "#004482",
  },
  {
    name: "Java",
    Icon: FaJava,
    color: "#f89820",
  },
  {
    name: "Python",
    Icon: SiPython,
    color: "#3776ab",
  },
  {
    name: "MySQL",
    Icon: SiMysql,
    color: "#00758f",
  },
  {
    name: "Git",
    Icon: SiGit,
    color: "#f1502f",
  },
  {
    name: "VS Code",
    Icon: SiVisualstudiocode,
    color: "#007acc",
  },
  {
    name: "PyCharm",
    Icon: SiPycharm,
    color: "#21d789",
  },
];

const divVariants = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8 },
  },
};

export default function Skills() {
  const [alreadySeen, setAlreadySeen] = useState(false);
  const controls = useAnimation();
  const { ref, inView } = useInView();
  const titleRef = useRef();
  const skillsDivRef = useRef();

  const parallax = (e) => {
    const y = (e.clientY * -1) / 100;
    const x = (e.clientX * -1) / 100;
    titleRef.current.style.transform = `translate(${x}px, ${y}px)`;
    skillsDivRef.current.style.transform = `translate(${-x}px, ${-y}px)`;
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
      setAlreadySeen(true);
    }
  }, [controls, inView]);

  useEffect(() => {
    window.addEventListener("mousemove", parallax);
    return () => window.removeEventListener("mousemove", parallax);
  }, []);

  return (
    <section
      id="skills"
      className="flex w-full justify-center items-center"
    >
      <motion.div
        variants={divVariants}
        initial="hidden"
        animate={controls}
        className="max-w-7xl w-full flex flex-col items-center mt-8"
      >
        <h1
          ref={titleRef}
          className="font-home font-bold text-4xl sm:text-6xl text-white"
        >
          SKILLS
        </h1>

        <div ref={skillsDivRef}>
          <div
            ref={ref}
            className="p-4 py-8 flex flex-wrap justify-center max-w-3xl text-white"
          >
            {skills.map((skill, index) => (
              <SkillsItem
                key={index}
                Icon={skill.Icon}
                name={skill.name}
                color={skill.color}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
