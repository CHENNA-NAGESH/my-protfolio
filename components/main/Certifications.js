import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SiMicrosoftazure } from "react-icons/si";
import { FiAward, FiExternalLink } from "react-icons/fi";

const certifications = [
  {
    title: "Microsoft Certified: Azure Fundamentals",
    issuer: "Microsoft",
    date: "Completed",
    code: "AZ-900",
    Icon: SiMicrosoftazure,
    color: "#0078d4", // Microsoft Azure Blue
    verifyLink: "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/",
    description: "Demonstrated foundational knowledge of cloud services and how those services are provided with Microsoft Azure. Validated concepts including cloud computing, security, privacy, compliance, and trust, as well as Azure pricing and support."
  }
];

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: "easeOut"
    }
  }
};

export default function Certifications() {
  const controls = useAnimation();
  const { ref: inViewRef, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const titleRef = useRef(null);

  const cardRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});
  const [glowStyle, setGlowStyle] = useState({ opacity: 0 });

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

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rotateX = ((mouseY / height) - 0.5) * -10;
    const rotateY = ((mouseX / width) - 0.5) * 10;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      transition: 'transform 0.1s ease-out'
    });

    setGlowStyle({
      opacity: 1,
      background: `radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(0, 120, 212, 0.18), transparent 80%)`,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
      transition: 'transform 0.5s ease-out'
    });
    setGlowStyle({
      opacity: 0,
      transition: 'opacity 0.5s ease-out'
    });
  };

  return (
    <section id="certifications" className="my-20 w-full flex flex-col items-center justify-center px-4">
      <div className="max-w-4xl w-full z-[9999] flex flex-col items-center p-6 sm:p-10 section-hover-highlight">
        <h1
          ref={titleRef}
          className="font-home font-bold text-4xl sm:text-6xl text-neutral-800 dark:text-white transition-colors duration-300 pb-12"
        >
          CERTIFICATIONS
        </h1>

        <motion.div
          ref={inViewRef}
          variants={gridVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 w-full justify-center items-center"
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={tiltStyle}
              variants={cardVariants}
              className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 bg-opacity-80 dark:bg-opacity-40 backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(0,120,212,0.08)] flex flex-col sm:flex-row p-6 items-center gap-6 relative"
            >
              {/* Interactive Radial Mouse Glow */}
              <div 
                className="absolute inset-0 pointer-events-none z-[11] transition-opacity duration-300"
                style={glowStyle}
              />
              {/* Badge Icon container */}
              <div 
                style={{ backgroundColor: `${cert.color}15`, border: `2px solid ${cert.color}30` }}
                className="w-20 h-20 shrink-0 rounded-full flex justify-center items-center relative z-10"
              >
                <cert.Icon color={cert.color} size={40} />
                <span className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1 shadow">
                  <FiAward size={14} />
                </span>
              </div>

              {/* Certificate Info */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-1">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white font-home">
                    {cert.title}
                  </h3>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 rounded-full w-fit mx-auto sm:mx-0">
                    {cert.code}
                  </span>
                </div>
                <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-3">
                  Issued by {cert.issuer} • {cert.date}
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 font-sans mb-4 leading-relaxed">
                  {cert.description}
                </p>
                
                {cert.verifyLink && (
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href={cert.verifyLink}
                    className="inline-flex items-center gap-1.5 text-xs font-bold font-home text-[#0078d4] hover:text-[#005a9e] dark:text-[#42a5f5] dark:hover:text-[#64b5f6] hover:underline transition-all"
                  >
                    <span>VERIFY CREDENTIAL</span>
                    <FiExternalLink size={12} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
