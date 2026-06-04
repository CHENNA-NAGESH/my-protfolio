import { useState, useRef, useEffect } from "react";
import { useTheme } from "../../lib/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";

export default function Nav() {
  const myMenu = useRef();
  const navBar = useRef();
  const [menuOpen, setMenuOpen] = useState(false);
  const [prevScroll, setPrevScroll] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [activeSection, setActiveSection] = useState("home");
  const clickTimesRef = useRef([]);

  const triggerConfetti = () => {
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.inset = "0";
    container.style.pointerEvents = "none";
    container.style.zIndex = "999999";
    document.body.appendChild(container);

    const colors = ["#a855f7", "#6366f1", "#06b6d4", "#ec4899", "#3b82f6"];
    const count = 90;

    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.style.position = "absolute";
      el.style.width = `${Math.random() * 8 + 5}px`;
      el.style.height = `${Math.random() * 8 + 5}px`;
      el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      el.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
      
      el.style.left = "50%";
      el.style.top = "50%";
      
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 14 + 6;
      let x = 0;
      let y = 0;
      let vx = Math.cos(angle) * velocity;
      let vy = Math.sin(angle) * velocity - 6;
      const gravity = 0.45;
      
      container.appendChild(el);
      
      let opacity = 1;
      const step = () => {
        x += vx;
        y += vy;
        vy += gravity;
        vx *= 0.975;
        opacity -= 0.012;
        
        el.style.transform = `translate(${x}px, ${y}px) rotate(${x * 2.2}deg)`;
        el.style.opacity = opacity;
        
        if (opacity > 0) {
          requestAnimationFrame(step);
        } else {
          el.remove();
        }
      };
      requestAnimationFrame(step);
    }
    
    setTimeout(() => {
      container.remove();
    }, 3200);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    
    const homeEl = document.getElementById("home");
    if (homeEl) {
      const rect = homeEl.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      window.scrollTo({
        top: rect.top + scrollTop,
        behavior: "smooth"
      });
    }

    const now = Date.now();
    // Filter click timestamps that are within the last 600ms
    const recentClicks = clickTimesRef.current.filter((t) => now - t < 600);
    recentClicks.push(now);
    clickTimesRef.current = recentClicks;

    // Trigger confetti on 3 rapid succession clicks (within 600ms)
    if (recentClicks.length >= 3) {
      triggerConfetti();
      clickTimesRef.current = []; // Reset tracker
    }
  };

  useEffect(() => {
    setMounted(true);

    const sections = ["home", "about", "education", "skills", "projects", "contact"];
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -55% 0px", // triggers when section is active in the viewport
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleMenuClick = () => {
    if (!menuOpen) {
      myMenu.current.classList.add("menuopen");
      setMenuOpen(true);
    } else {
      myMenu.current.classList.remove("menuopen");
      setMenuOpen(false);
    }
  };

  const handleScroll = () => {
    if (navBar) {
      const currentScroll = window.scrollY;
      if (prevScroll > currentScroll) {
        navBar.current.style.top = "0";
      } else {
        myMenu.current.classList.remove("menuopen");
        setMenuOpen(false);
        navBar.current.style.top = "-74px";
      }
      setPrevScroll(currentScroll);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll, false);
    return () => {
      document.removeEventListener("scroll", handleScroll, false);
    };
  }, [handleScroll]);

  return (
    <nav
      ref={navBar}
      className="flex fixed w-full text-neutral-900 dark:text-white z-[10010] transition-all"
    >
      <div
        className={`w-full justify-center flex p-4 bg-white bg-opacity-90 dark:bg-black dark:bg-opacity-75 border-b-[1px] border-neutral-200 dark:border-neutral-800 ${
          menuOpen ? "h-[390px] md:h-fit" : "h-[69px]"
        } transition-all`}
      >
        <div className="max-w-7xl w-full justify-between xl:justify-around flex-row hidden md:flex">
          <div className="flex font-nav text-3xl font-extrabold">
            <a
              href="#"
              onClick={handleLogoClick}
              className="cursor-pointer hover:text-neutral-600 dark:hover:text-neutral-300 hover:scale-110 transition-all"
              title="Click 5 times for a surprise!"
            >
              <span>{"<"}</span>
              <span>Chenna Nagesh</span>
              <span className="pl-2">{"/>"}</span>
            </a>
          </div>
          <div className="flex justify-center items-center font-extrabold font-home">
            <a
              href="#home"
              className={`pr-4 cursor-pointer hover:scale-110 transition-all ${
                activeSection === "home"
                  ? "text-purple-600 dark:text-purple-400"
                  : "hover:text-neutral-600 dark:hover:text-neutral-300"
              }`}
            >
              Home
            </a>
            <a
              href="#about"
              className={`pr-4 cursor-pointer hover:scale-110 transition-all ${
                activeSection === "about"
                  ? "text-purple-600 dark:text-purple-400"
                  : "hover:text-neutral-600 dark:hover:text-neutral-300"
              }`}
            >
              About
            </a>
            <a
              href="#education"
              className={`pr-4 cursor-pointer hover:scale-110 transition-all ${
                activeSection === "education"
                  ? "text-purple-600 dark:text-purple-400"
                  : "hover:text-neutral-600 dark:hover:text-neutral-300"
              }`}
            >
              Education
            </a>
            <a
              href="#skills"
              className={`pr-4 cursor-pointer hover:scale-110 transition-all ${
                activeSection === "skills"
                  ? "text-purple-600 dark:text-purple-400"
                  : "hover:text-neutral-600 dark:hover:text-neutral-300"
              }`}
            >
              Skills
            </a>
            <a
              href="#projects"
              className={`pr-4 cursor-pointer hover:scale-110 transition-all ${
                activeSection === "projects"
                  ? "text-purple-600 dark:text-purple-400"
                  : "hover:text-neutral-600 dark:hover:text-neutral-300"
              }`}
            >
              Projects
            </a>
            <a
              href="#contact"
              className={`pr-4 cursor-pointer hover:scale-110 transition-all ${
                activeSection === "contact"
                  ? "text-purple-600 dark:text-purple-400"
                  : "hover:text-neutral-600 dark:hover:text-neutral-300"
              }`}
            >
              Contact
            </a>
            <button
              onClick={toggleTheme}
              className="ml-2 p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:scale-110 cursor-pointer transition-all focus:outline-none"
              aria-label="Toggle Theme"
            >
              {!mounted ? (
                <div className="w-[20px] h-[20px]" />
              ) : theme === "dark" ? (
                <FiSun className="text-yellow-400" size={20} />
              ) : (
                <FiMoon className="text-indigo-600" size={20} />
              )}
            </button>
          </div>
        </div>
        <div
          className={`md:hidden w-full flex flex-col justify-between items-center ${
            menuOpen ? "h-[350px]" : "h-[35px]"
          }`}
        >
          <div className="flex w-full justify-between items-center">
            <a
              href="#"
              onClick={handleLogoClick}
              className="cursor-pointer font-extrabold font-nav text-xl hover:text-neutral-600 dark:hover:text-neutral-300 hover:scale-110 transition-all whitespace-nowrap"
              title="Click 5 times for a surprise!"
            >
              <span>{"<"}</span>
              <span>Chenna Nagesh</span>
              <span className="pl-2">{"/>"}</span>
            </a>
            <div className="flex items-center">
              <button
                onClick={toggleTheme}
                className="p-2 mr-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:scale-110 cursor-pointer transition-all focus:outline-none"
                aria-label="Toggle Theme"
              >
                {!mounted ? (
                  <div className="w-[18px] h-[18px]" />
                ) : theme === "dark" ? (
                  <FiSun className="text-yellow-400" size={18} />
                ) : (
                  <FiMoon className="text-indigo-600" size={18} />
                )}
              </button>
              <div
                ref={myMenu}
                onClick={handleMenuClick}
                className="py-4 mx-5 cursor-pointer"
              >
                <div className="myBurguer"></div>
              </div>
            </div>
          </div>
          <div
            className={`flex flex-col text-center font-extrabold font-home ${
              menuOpen ? "" : "opacity-0 pointer-events-none z-10"
            }  transition-all`}
          >
            <a
              onClick={handleMenuClick}
              href="#home"
              className={`p-3 cursor-pointer hover:scale-110 transition-all ${
                activeSection === "home"
                  ? "text-purple-600 dark:text-purple-400"
                  : "hover:text-neutral-600 dark:hover:text-neutral-300"
              }`}
            >
              Home
            </a>
            <a
              onClick={handleMenuClick}
              href="#about"
              className={`p-3 cursor-pointer hover:scale-110 transition-all ${
                activeSection === "about"
                  ? "text-purple-600 dark:text-purple-400"
                  : "hover:text-neutral-600 dark:hover:text-neutral-300"
              }`}
            >
              About
            </a>
            <a
              onClick={handleMenuClick}
              href="#education"
              className={`p-3 cursor-pointer hover:scale-110 transition-all ${
                activeSection === "education"
                  ? "text-purple-600 dark:text-purple-400"
                  : "hover:text-neutral-600 dark:hover:text-neutral-300"
              }`}
            >
              Education
            </a>
            <a
              onClick={handleMenuClick}
              href="#skills"
              className={`p-3 cursor-pointer hover:scale-110 transition-all ${
                activeSection === "skills"
                  ? "text-purple-600 dark:text-purple-400"
                  : "hover:text-neutral-600 dark:hover:text-neutral-300"
              }`}
            >
              Skills
            </a>
            <a
              onClick={handleMenuClick}
              href="#projects"
              className={`p-3 cursor-pointer hover:scale-110 transition-all ${
                activeSection === "projects"
                  ? "text-purple-600 dark:text-purple-400"
                  : "hover:text-neutral-600 dark:hover:text-neutral-300"
              }`}
            >
              Projects
            </a>
            <a
              onClick={handleMenuClick}
              href="#contact"
              className={`p-3 cursor-pointer hover:scale-110 transition-all ${
                activeSection === "contact"
                  ? "text-purple-600 dark:text-purple-400"
                  : "hover:text-neutral-600 dark:hover:text-neutral-300"
              }`}
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
