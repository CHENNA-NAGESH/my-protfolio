import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  const toggleVisibility = () => {
    const scrolled = window.scrollY || document.documentElement.scrollTop;
    if (scrolled > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    const homeEl = document.getElementById("home");
    if (homeEl) {
      const rect = homeEl.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      window.scrollTo({
        top: rect.top + scrollTop,
        behavior: "smooth"
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    setMounted(true);
    window.addEventListener("scroll", toggleVisibility);
    
    // Check initial scroll position in case they refreshed mid-page
    toggleVisibility();

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-[10005] p-3 rounded-full bg-white dark:bg-neutral-900 border border-purple-500/30 dark:border-purple-500/20 text-purple-600 dark:text-purple-400 bg-opacity-80 dark:bg-opacity-40 backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 shadow-[0_0_15px_rgba(168,85,247,0.25)] hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] focus:outline-none cursor-pointer ${
        isVisible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-label="Back to Top"
    >
      <FaArrowUp size={18} />
    </button>
  );
}
