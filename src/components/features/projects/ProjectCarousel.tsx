import React, { useRef, useState, useEffect } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import ProjectCard from "./ProjectCard";
import ProjectDetails from "./ProjectDetails";
import projectsData from "../../../data/projects.json";
import { type Project } from "./ProjectCard";

const ProjectCarousel: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null!); 
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const scrollToIndex = (index: number) => {
        const el = scrollRef.current;
        if (!el) return;
        const child = el.children[index] as HTMLElement;
        if (!child) return;
        const offset = child.offsetLeft - el.offsetWidth / 2 + child.offsetWidth / 2;
        el.scrollTo({ left: offset, behavior: "smooth" });
        setActiveIndex(index);
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const handleScroll = () => {
            const children = Array.from(el.children) as HTMLElement[];
            const center = el.scrollLeft + el.offsetWidth / 2;
            let closestIndex = 0;
            let closestDistance = Infinity;

            children.forEach((child, i) => {
                const childCenter = child.offsetLeft + child.offsetWidth / 2;
                const distance = Math.abs(center - childCenter);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = i;
                }
            });

            setActiveIndex(closestIndex);
        };

        el.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => el.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section ref={sectionRef} className="w-full py-20 bg-black text-white px-20 relative">
            <h2 className="text-3xl font-bold text-center mb-12">Projects</h2>

            <div className="relative max-w-full mx-auto">
                {/* Left Arrow */}
                <button
                    onClick={() => scrollToIndex(Math.max(activeIndex - 1, 0))}
                    className="absolute left-[-60px] top-1/2 -translate-y-1/2 z-10 bg-purple-700/30 hover:bg-purple-700/50 p-3 rounded-full"
                >
                    <HiChevronLeft size={28} />
                </button>

                {/* Right Arrow */}
                <button
                    onClick={() => scrollToIndex(Math.min(activeIndex + 1, projectsData.length - 1))}
                    className="absolute right-[-60px] top-1/2 -translate-y-1/2 z-10 bg-purple-700/30 hover:bg-purple-700/50 p-3 rounded-full"
                >
                    <HiChevronRight size={28} />
                </button>

                {/* Carousel */}
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto overflow-y-hidden scrollbar-hide scroll-snap-x gap-6 px-10 touch-pan-x"
                >
                    {projectsData.map((project, index) => {
                        const isActive = index === activeIndex || index === activeIndex + 1;
                        return (
                            <div
                                key={project.name}
                                className="flex-shrink-0 scroll-snap-child"
                                onMouseEnter={() => scrollToIndex(index)}
                            >
                                <ProjectCard
                                    project={project as Project}
                                    isActive={isActive}
                                    onDetails={(proj: Project) => setSelectedProject(proj)}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Modal Project Details */}
            {selectedProject && (
                <ProjectDetails
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                    parentRef={sectionRef}
                />
            )}
        </section>
    );
};

export default ProjectCarousel;
