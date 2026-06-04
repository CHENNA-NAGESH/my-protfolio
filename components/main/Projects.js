import ProjectItem from "./projects/ProjectItem";
import { useMediaQuery } from "../../lib/useMediaQuery";
import ProjectsTitle from "./projects/ProjectsTitle";

const projects = [
  {
    link: "https://github.com/CHENNA-NAGESH/Gesture-Detection/tree/main",
    color: "#5c16c5",
    title: "Gesture-Detection",
    description:
      "The AI-Based Hand Gesture Recognition System is a real-time computer vision application that detects and classifies user hand gestures using a pretrained deep learning model trained with Google Teachable Machine. The system captures live video through a webcam, detects hand landmarks using MediaPipe, and predicts gestures from the extracted hand region. This approach enables accurate, efficient, and touch-free interaction and can be applied in areas such as human–computer interaction, sign language recognition, and gesture-based control systems.",
    techs: [
      "Python",
      "OpenCV",
      "MediaPipe",
      "TensorFlow / Keras",
      "Google Teachable Machine",
    ],
    isAi: true,
    gitLink: "https://github.com/CHENNA-NAGESH/Gesture-Detection/tree/main",
    bgPath: "/gestures.png",
  },

  {
    link: "https://chromewebstore.google.com/detail/ghpijecphffmiffibgahodipapkhnebc?utm_source=item-share-cb",
    color: "#FF7A00",
    title: "AI Text Summarizer",
    description:
      "AI Text Summarizer is a browser-based extension designed to help users quickly understand long or complex text. It analyzes selected content on any webpage in real time and generates clear, concise summaries, helping users save time, improve readability, and grasp key ideas without leaving the page.",
    techs: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js"],
    isAi: true,
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
    isAi: true,
    gitLink: "https://github.com/CHENNA-NAGESH/Washore",
    bgPath: "/washore.png",
  },
  {
    link: "https://chromewebstore.google.com/detail/aeomblmibpegefnmpkmnjeebcbjbgeai?utm_source=item-share-cb",
    color: "#1ed760",
    title: "Focus Breaker",
    description:
      "Focus Breaker is a premium, privacy-focused Chrome Extension (Manifest V3) that curbs website addiction. It redirects blocked sites to an interactive cosmic screen with a guided breathing orb, concentric ripples, and 3D cursor-parallax stars to encourage mindful focus. Built with JavaScript, CSS, and Chrome Extension APIs.",
    techs: ["Manifest V3", "JavaScript", "CSS3", "HTML5"],
    isAi: false,
    gitLink: "https://github.com/CHENNA-NAGESH/focus-breaker-landing",
    bgPath: "/Focus.jpeg",
  },
];

export default function Projects() {
  const md = useMediaQuery(768);

  return (
    <section
      id="projects"
      className="flex justify-center items-center w-full mt-8"
    >
      <div className="max-w-7xl w-full flex flex-col justify-center items-center z-[9999] mt-14 p-6 sm:p-10 section-hover-highlight">
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
            isAi={project.isAi}
            index={index}
            md={md}
          />
        ))}
      </div>
    </section>
  );
}
