import { BiLinkExternal } from 'react-icons/bi'
import { SiGithub } from 'react-icons/si'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion, useAnimation } from 'framer-motion'

const divVariants = {
    hidden: {
        scale: 1.25,
        opacity: 0
    },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.4
        }
    }
}

export default function ProjectItem({ link, color, title, description, techs, gitLink, bgPath, md, index, isAi }) {

    const [alreadySeen, setAlreadySeen] = useState(false)
    const { ref: inViewRef, inView } = useInView()
    const controls = useAnimation()

    const cardRef = useRef(null);
    const [tiltStyle, setTiltStyle] = useState({});
    const [glowStyle, setGlowStyle] = useState({ opacity: 0 });

    useEffect(() => {
        if (inView) {
            controls.start("visible")
            setAlreadySeen(true)
        }
        if (!inView && !alreadySeen) controls.start("hidden")
    }, [controls, inView])

    const setRefs = (node) => {
        cardRef.current = node;
        inViewRef(node);
    };

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const rotateX = ((mouseY / height) - 0.5) * -8;
        const rotateY = ((mouseX / width) - 0.5) * 8;

        setTiltStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: 'transform 0.1s ease-out'
        });

        setGlowStyle({
            opacity: 1,
            background: `radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(168, 85, 247, 0.15), transparent 80%)`,
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

    const hexToRgb = hex =>
    hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i ,(m, r, g, b) => '#' + r + r + g + g + b + b)
        .substring(1).match(/.{2}/g)
        .map(x => parseInt(x, 16))

    const colorRGB = hexToRgb(color)

    const inverted = index % 2 == 0

    return (
        <motion.div 
            variants={divVariants} 
            initial="hidden" 
            animate={controls} 
            ref={setRefs} 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={tiltStyle}
            className={`text-neutral-900 dark:text-white flex m-3 md:m-8 relative my-8 md:my-16 text-shadow rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 bg-opacity-80 dark:bg-opacity-40 backdrop-blur-md transition-shadow duration-300 ${
                isAi 
                ? 'shadow-[0_0_15px_rgba(168,85,247,0.15)] dark:shadow-[0_0_25px_rgba(168,85,247,0.25)] border-purple-500/30' 
                : 'hover:shadow-[0_0_20px_rgba(168,85,247,0.06)]'
            }`}
        >
            {/* Interactive Radial Mouse Glow */}
            <div 
                className="absolute inset-0 pointer-events-none z-[11] transition-opacity duration-300"
                style={glowStyle}
            />
            <div className={`${inverted ? 'order-2' : ''} rounded-l-xl absolute md:relative hidden md:block overflow-hidden`}>
                <a rel="noreferrer" target="_blank" href={link}>
                    <div style={{backgroundColor: `rgb(${colorRGB[0]} ${colorRGB[1]} ${colorRGB[2]} / var(--tw-bg-opacity))`}} className="absolute rounded-l-xl h-full w-full bg-opacity-30 hover:bg-opacity-0 transition-all"/>
                </a>
                <img alt="project" className="block w-fit h-full object-cover rounded-l-xl" src={bgPath} />
            </div>
            <div style={md ? {backgroundImage: `url(${bgPath})`} : {backgroundImage: 'none'}} className={`${inverted ? 'order-1 text-left' : 'text-right'} flex flex-col relative z-[10] md:p-0 bg-cover rounded-r-xl md:rounded-none`}>
                <div style={{backgroundColor: `rgb(${colorRGB[0]} ${colorRGB[1]} ${colorRGB[2]} / var(--tw-bg-opacity))`}} className="p-8 h-full w-full bg-opacity-80 absolute block rounded-xl md:hidden"/>
                <div className="z-[12] p-8 md:p-0 flex flex-col justify-center h-full">
                    {isAi && (
                        <div className={`flex ${inverted ? 'justify-start' : 'justify-end'} mb-1`}>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold font-home tracking-wider bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.4)]">
                                <svg className="h-3 w-3 fill-current animate-pulse" viewBox="0 0 24 24">
                                    <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                                </svg>
                                AI / GENAI
                            </span>
                        </div>
                    )}
                    <p className="font-home font-semibold text-xs pb-1 text-neutral-500 dark:text-neutral-400">Featured Project</p>
                    <h1 className="font-bold font-home py-1 text-lg text-neutral-900 dark:text-white transition-colors duration-300">{title}</h1>
                    <div style={md ? {backgroundColor: 'inherit', padding: 0} : {backgroundColor: color, padding: '24px'}} className={`${md ? 'ml-0' : inverted ? '-mr-12' : '-ml-12'} rounded-lg flex my-2 text-white`}>
                        <p className="font-semibold text-left">{description}</p>
                    </div>
                    <div className={`${inverted ? 'justify-start' : 'justify-end'} flex flex-wrap self-end my-2 w-full text-neutral-600 dark:text-neutral-300 transition-colors duration-300`}>
                        {techs.map((tech, index) => <p key={index} className={`${inverted ? 'pr-4' : 'pl-4'} font-home text-sm font-semibold`}>{tech}</p>)}
                    </div>
                    <div className={`${inverted ? 'justify-start' : 'justify-end'} flex flex-wrap self-end my-2 w-full`}>
                        <a rel="noreferrer" target="_blank" href={gitLink} className={`${inverted ? 'pr-2' : 'pl-2'} hover:scale-125 cursor-pointer transition-all`}>
                            <SiGithub color={md ? 'white' : color} size={30} />
                        </a>
                        <a rel="noreferrer" target="_blank" href={link} className={`${inverted ? 'pr-2' : 'pl-2'} hover:scale-125 cursor-pointer transition-all`}>
                            <BiLinkExternal color={md ? 'white' : color} size={30} />
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
