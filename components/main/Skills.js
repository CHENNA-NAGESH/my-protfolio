import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiPython,
  SiMysql,
  SiBootstrap,
  SiC,
  SiGit,
  SiGithub,
  SiCplusplus,
  SiVisualstudiocode,
  SiPycharm,
  SiSpring,
  SiReact,
  SiPostman,
  SiFigma,
} from "react-icons/si";
import {
  FaJava,
  FaBolt,
  FaHeart,
  FaMousePointer,
  FaCode,
} from "react-icons/fa";
import SkillsItem from "./skills/SkillsItem";

const skills = [
  { name: "HTML", Icon: SiHtml5, color: "#e34c26" },
  { name: "CSS", Icon: SiCss3, color: "#264de4" },
  { name: "JavaScript", Icon: SiJavascript, color: "#f0db4f" },
  { name: "Bootstrap", Icon: SiBootstrap, color: "#7952b3" },
  { name: "C", Icon: SiC, color: "#00599c" },
  { name: "C++", Icon: SiCplusplus, color: "#004482" },
  { name: "Java", Icon: FaJava, color: "#f89820" },
  { name: "Python", Icon: SiPython, color: "#3776ab" },
  { name: "XML", Icon: FaCode, color: "#f16529" },
  { name: "SQL", Icon: SiMysql, color: "#00758f" },
  { name: "Git", Icon: SiGit, color: "#f1502f" },
  { name: "GitHub", Icon: SiGithub, color: "#ffffff" },
  { name: "Spring", Icon: SiSpring, color: "#6db33f" },
  { name: "React", Icon: SiReact, color: "#61dafb" },
  { name: "Postman", Icon: SiPostman, color: "#ff6c37" },
  { name: "Figma", Icon: SiFigma, color: "#a259ff" },
  { name: "VS Code", Icon: SiVisualstudiocode, color: "#007acc" },
  { name: "PyCharm", Icon: SiPycharm, color: "#21d789" },
  { name: "Bolt", Icon: FaBolt, color: "#facc15" },
  { name: "Lovable", Icon: FaHeart, color: "#ec4899" },
  { name: "Cursor", Icon: FaMousePointer, color: "#38bdf8" },
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
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true });
  const titleRef = useRef(null);
  const skillsDivRef = useRef(null);

  const parallax = (e) => {
    if (!titleRef.current || !skillsDivRef.current) return;
    const x = (e.clientX * -1) / 100;
    const y = (e.clientY * -1) / 100;
    titleRef.current.style.transform = `translate(${x}px, ${y}px)`;
    skillsDivRef.current.style.transform = `translate(${-x}px, ${-y}px)`;
  };

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  useEffect(() => {
    window.addEventListener("mousemove", parallax);
    return () => window.removeEventListener("mousemove", parallax);
  }, []);

  return (
    <section id="skills" className="flex w-full justify-center items-center">
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
            className="p-4 py-8 flex flex-wrap justify-center max-w-4xl text-white"
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
