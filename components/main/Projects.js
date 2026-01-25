import ProjectItem from "./projects/ProjectItem";
import { useMediaQuery } from "../../lib/useMediaQuery";
import ProjectsTitle from "./projects/ProjectsTitle";

const projects = [
  // {
  //   link: "https://ai-subjective-exam-evaluator.vercel.app/",
  //   color: "#5c16c5",
  //   title: "AI-Exam-Evaluation-System",
  //   description:
  //     "The AI-Based Subjective Evaluation System is a web platform that uses Artificial Intelligence to automatically evaluate long-form (descriptive) student answers. It helps educators save time and ensures consistent, unbiased grading using NLP-based analysis.",
  //   techs: [
  //     "React",
  //     "Node.js",
  //     "Express.js",
  //     "MongoDB",
  //     "Gemini Generative AI",
  //   ],
  //   gitLink: "https://github.com/seethinajayadileep/AI-Exam-Evaluation-System",
  //   bgPath: "/SubjectiveExamEvaluator.png",
  // },

  {
    link: "https://chromewebstore.google.com/detail/ghpijecphffmiffibgahodipapkhnebc?utm_source=item-share-cb",
    color: "#FF7A00",
    title: "AI Text Summarizer",
    description:
      "AI Text Summarizer is a browser-based extension designed to help users quickly understand long or complex text. It analyzes selected content on any webpage in real time and generates clear, concise summaries, helping users save time, improve readability, and grasp key ideas without leaving the page.",
    techs: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js"],
    gitLink: "https://github.com/CHENNA-NAGESH/Ai-Text-Summarizer",
    bgPath: "/Summarizer.png",
  },

  {
    link: "https://github.com/CHENNA-NAGESH/Washore",
    color: "#1ed760",
    title: "Washore",
    description:
      "Washore is an AI-based beach monitoring system designed to detect littering activities along coastal areas. Using computer vision, the system identifies litter-related actions on beaches and automatically alerts marine authorities to enable timely intervention and cleanup.",

    techs: ["Python", "YOLO Object Detection", "Computer Vision"],

    gitLink: "https://github.com/CHENNA-NAGESH/Washore",
    bgPath: "/washore.png",
  },
];

export default function Projects() {
  const md = useMediaQuery(768);

  return (
    <section
      id="projects"
      className="flex justify-center items-center w-full mt-8"
    >
      <div className="max-w-7xl w-full flex flex-col justify-center items-center z-[9999] mt-14 overflow-hidden">
        <ProjectsTitle />
        {projects.map((project, index) => (
          <ProjectItem
            key={index}
            link={project.link}
            color={project.color}
            title={project.title}
            description={project.description}
            techs={project.techs}
            gitLink={project.gitLink}
            bgPath={project.bgPath}
            index={index}
            md={md}
          />
        ))}
      </div>
    </section>
  );
}
