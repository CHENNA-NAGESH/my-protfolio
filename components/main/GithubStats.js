import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTheme } from "../../lib/ThemeContext";

const gridVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function GithubStats() {
  const { theme } = useTheme();
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const titleRef = useRef(null);
  const [mounted, setMounted] = useState(false);

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

  useEffect(() => {
    setMounted(true);
  }, []);

  // Theme-specific parameters for GitHub Readme Stats
  const getStatsParams = () => {
    if (theme === "dark") {
      // Dark mode styles (accent purple, transparent bg, white text, subtle purple border)
      return "bg_color=00000000&title_color=a855f7&text_color=e5e5e5&icon_color=a855f7&border_color=3b0764&show_icons=true";
    } else {
      // Light mode styles (accent purple, transparent bg, dark text, light purple border)
      return "bg_color=00000000&title_color=7c3aed&text_color=404040&icon_color=7c3aed&border_color=e9d5ff&show_icons=true";
    }
  };

  const getStreakParams = () => {
    if (theme === "dark") {
      // Streak stats dark theme
      return "background=00000000&fire=a855f7&ring=a855f7&stroke=e5e5e5&currStreakNum=e5e5e5&currStreakLabel=a855f7&sideNums=e5e5e5&sideLabels=a855f7&dates=a855f7";
    } else {
      // Streak stats light theme
      return "background=00000000&fire=7c3aed&ring=7c3aed&stroke=404040&currStreakNum=404040&currStreakLabel=7c3aed&sideNums=404040&sideLabels=7c3aed&dates=7c3aed";
    }
  };

  const username = "CHENNA-NAGESH";
  const statsCardUrl = `https://github-readme-stats-fast.vercel.app/api?username=${username}&${getStatsParams()}`;
  const topLangsUrl = `https://github-readme-stats-fast.vercel.app/api/top-langs/?username=${username}&layout=compact&${getStatsParams()}`;
  const streakCardUrl = `https://github-readme-streak-stats.herokuapp.com/?user=${username}&${getStreakParams()}`;

  return (
    <section id="github-stats" className="my-20 w-full flex flex-col items-center justify-center px-4">
      <div className="max-w-7xl w-full z-[9999] flex flex-col items-center p-6 sm:p-10 section-hover-highlight">
        <h1
          ref={titleRef}
          className="font-home font-bold text-4xl sm:text-6xl text-neutral-800 dark:text-white transition-colors duration-300 pb-12"
        >
          GITHUB STATS
        </h1>

        <motion.div
          ref={ref}
          variants={gridVariants}
          initial="hidden"
          animate={controls}
          className="flex flex-col lg:flex-row gap-6 justify-center items-center w-full max-w-5xl mx-auto min-h-[200px]"
        >
          {!mounted ? (
            <>
              {/* Skeletons during hydration to prevent mismatches */}
              <div className="w-full max-w-sm sm:max-w-md lg:w-1/3 h-[195px] rounded-md bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
              <div className="w-full max-w-sm sm:max-w-md lg:w-1/3 h-[195px] rounded-md bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
              <div className="w-full max-w-sm sm:max-w-md lg:w-1/3 h-[195px] rounded-md bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
            </>
          ) : (
            <>
              {/* GitHub Stats Card */}
              <div className="w-full max-w-sm sm:max-w-md lg:w-1/3 flex justify-center hover:scale-[1.02] transition-all duration-300">
                <img 
                  alt="GitHub Stats" 
                  src={statsCardUrl} 
                  className="w-full max-w-[400px] h-auto object-contain rounded-md" 
                />
              </div>

              {/* GitHub Streak Stats Card */}
              <div className="w-full max-w-sm sm:max-w-md lg:w-1/3 flex justify-center hover:scale-[1.02] transition-all duration-300">
                <img 
                  alt="GitHub Streak" 
                  src={streakCardUrl} 
                  className="w-full max-w-[400px] h-auto object-contain rounded-md" 
                />
              </div>

              {/* GitHub Top Languages Card */}
              <div className="w-full max-w-sm sm:max-w-md lg:w-1/3 flex justify-center hover:scale-[1.02] transition-all duration-300">
                <img 
                  alt="Top Languages" 
                  src={topLangsUrl} 
                  className="w-full max-w-[400px] h-auto object-contain rounded-md" 
                />
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
