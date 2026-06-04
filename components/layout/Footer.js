import SkillsItem from "../main/skills/SkillsItem";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiThreedotjs,
  SiFramer,
} from "react-icons/si";

const techs = [
  {
    name: "NEXTJS",
    Icon: SiNextdotjs,
    color: "black",
  },
  {
    name: "TAILWINDCSS",
    Icon: SiTailwindcss,
    color: "black",
  },
  {
    name: "THREEJS",
    Icon: SiThreedotjs,
    color: "black",
  },
  {
    name: "MOTION",
    Icon: SiFramer,
    color: "black",
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-white dark:bg-neutral-900 transition-colors duration-300 w-full text-neutral-900 dark:text-neutral-100">
      <div>
        <div className="flex w-full justify-center border-t-[1px] border-neutral-200 dark:border-neutral-800">
          <p className="p-2 pt-3 text-xs text-bold">
            © Copyright | Chenna Nagesh{" "}
          </p>
        </div>
      </div>
    </footer>
  );
}
