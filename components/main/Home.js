import { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ScrollIcon from "./home/ScrollIcon";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { useTheme } from "../../lib/ThemeContext";

const divVariants = {
  hidden: {
    y: 200,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const innerDivVariants = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 0.5,
    },
  },
};

export default function Home() {
  const controls = useAnimation();
  const { ref, inView } = useInView();
  const [alreadySeen, setAlreadySeen] = useState(false);
  const { theme } = useTheme();
  const canvasRef = useRef(null);

  // Typing effect state and logic
  const roles = [
    "Full-Stack Web Developer",
    "AI & GenAI Solutions Developer",
    "Computer Science Engineer",
    "Creative Problem Solver"
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer;
    const currentFullText = roles[currentRoleIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        setDisplayText(currentFullText.substring(0, displayText.length + 1));
        setTypingSpeed(90);

        if (displayText === currentFullText) {
          timer = setTimeout(() => setIsDeleting(true), 1600);
          return;
        }
      } else {
        setDisplayText(currentFullText.substring(0, displayText.length - 1));
        setTypingSpeed(45);

        if (displayText === "") {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }

      timer = setTimeout(handleTyping, typingSpeed);
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex, typingSpeed]);

  // Starfield particle canvas background logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particleCount = 70;
    const particles = [];
    const colors = theme === "dark" 
      ? ["#a855f7", "#6366f1", "#38bdf8", "#ffffff"] 
      : ["#c084fc", "#818cf8", "#60a5fa", "#a3a3a3"];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.4,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    let mouse = { x: null, y: null };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const parent = canvas.parentElement;
    parent.addEventListener("mousemove", handleMouseMove);
    parent.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 1100;
            p.x -= dx * force;
            p.y -= dy * force;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      parent.removeEventListener("mousemove", handleMouseMove);
      parent.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
      setAlreadySeen(true);
    }
    if (!inView && !alreadySeen) {
      controls.start("hidden");
    }
  }, [inView, controls]);

  return (
    <>
      <ScrollIcon />
      <section
        id="home"
        className="flex text-center justify-center items-center w-full mt-28 font-home max-w-[1536px] mx-auto"
      >
        <motion.div
          variants={divVariants}
          initial="hidden"
          animate={controls}
          ref={ref}
          className="flex justify-center mx-auto border-x-0 2xl:border-x-2 bg-home w-full h-[640px] bg-cover text-white relative overflow-hidden"
        >
          <canvas ref={canvasRef} className="absolute inset-0 z-[1] pointer-events-none" />
          <motion.div
            variants={innerDivVariants}
            initial="hidden"
            animate={controls}
            className="z-[9999] justify-center flex flex-col p-5 m-2 h-fit bg-black bg-opacity-75 rounded-md self-center"
          >
            <h1 className="text-4xl sm:text-6xl font-bold">
              Chenna Nagesh
            </h1>
            <h3 className="text-xl sm:text-2xl font-semibold min-h-[38px] flex items-center justify-center gap-1.5 mt-2">
              <span>I'm a </span>
              <span className="text-purple-400 border-r-[3px] border-purple-400 pr-1 animate-[pulse_1s_infinite]">
                {displayText}
              </span>
            </h3>
            <p className="text-sm sm:text-base text-neutral-300 mt-2 max-w-md mx-auto">
              Specializing in Full-Stack Web & AI/GenAI Solutions
            </p>
            <div className="flex flex-wrap self-end my-2 w-full justify-center">
              <a
                rel="noreferrer"
                target="_blank"
                href="https://github.com/CHENNA-NAGESH"
                className={`px-3 hover:scale-125 cursor-pointer transition-all`}
                aria-label="GitHub"
              >
                <SiGithub color="white" size={30} />
              </a>
              <a
                rel="noreferrer"
                target="_blank"
                href="https://www.linkedin.com/in/chenna-nagesh/"
                className={`px-3 hover:scale-125 cursor-pointer transition-all`}
                aria-label="LinkedIn"
              >
                <SiLinkedin color="white" size={30} />
              </a>
            </div>
            <div className="flex flex-col items-center mt-3 w-full">
              <a
                href="/Resume.pdf"
                download="Chenna_Nagesh_Resume.pdf"
                className="px-6 py-2.5 rounded-full border border-purple-500 hover:border-purple-400 bg-purple-950 bg-opacity-40 text-white font-semibold text-sm hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(168,85,247,0.35)] hover:shadow-[0_0_20px_rgba(168,85,247,0.65)] focus:outline-none flex items-center gap-2"
              >
                <span>Download Resume</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 animate-bounce"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
