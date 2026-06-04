import { useState } from "react";
import { useTheme } from "../../../lib/ThemeContext";

export default function SkillsItem({ name, Icon, color }) {
    const [isHovered, setIsHovered] = useState(false);
    const { theme } = useTheme();
    const isDark = theme === "dark";
    
    // Determine glow color: use white in dark theme and primary purple in light theme for currentColor (GitHub)
    const glowColor = color === "currentColor" 
        ? (isDark ? "#ffffff" : "#a855f7") 
        : color;

    return (
        <div 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex flex-col justify-center items-center p-4 w-[120px] cursor-default"
        >
            <div 
                className="transition-all duration-300"
                style={{ 
                    transform: isHovered ? "scale(1.25)" : "scale(1)",
                    filter: isHovered 
                        ? `drop-shadow(0 0 6px ${glowColor}) drop-shadow(0 0 15px ${glowColor})` 
                        : "drop-shadow(0 0 0px transparent)"
                }}
            >
                <Icon color={color} size={45} />
            </div>
            <p className={`text-bold p-2 text-xs transition-colors duration-300 ${
                isHovered ? "text-purple-600 dark:text-purple-400 font-bold" : ""
            }`}>{name}</p>
        </div>
    )
}
