import React from "react";
import { motion } from "framer-motion";
import ImageCard from "../../ui/ImageCard";

export interface Project {
    title: string;
    name: string;
    duration: string;
    description: string;
    teamSize: number;
    role: string;
    responsibilities: string[];
    technologies: string[];
    github?: string;
    links?: {
        website?: string;
        figma?: string;
        github?: string;
    };
    images?: string[];
}

interface ProjectCardProps {
    project: Project;
    isActive: boolean;
    onDetails?: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isActive, onDetails }) => {
    return (
        <motion.div
            className={`
                flex-shrink-0
                w-[300px] sm:w-[350px] md:w-[400px]
                bg-gray-800/50 backdrop-blur-sm rounded-lg border border-purple-800/30 
                overflow-hidden flex flex-col
                p-5 transition-opacity duration-500 cursor-pointer
            `}
            style={{ opacity: isActive ? 1 : 0.3 }}
        >
            {/* Ảnh đại diện dự án */}
            {project.images?.length ? (
                <ImageCard
                    image={project.images[0]}
                    className="mb-4 w-full"
                />
            ) : (
                <div className="w-full aspect-[16/9] bg-gray-700 rounded-xl mb-4 flex items-center justify-center text-gray-300 text-sm">
                    No Image
                </div>
            )}

            {/* Title */}
            <h3 className="text-sm sm:text-base font-bold text-purple-400 mb-1">
                {project.title}
            </h3>

            {/* Name */}
            <h2 className="text-xl font-semibold text-white mb-2">{project.name}</h2>

            {/* Description */}
            <p className="text-gray-300 mb-4 text-sm">{project.description}</p>

            {/* Technologies */}
            <div className="flex gap-2 flex-wrap mb-4">
                {project.technologies.map((tech) => (
                    <span
                        key={tech}
                        className="bg-purple-900/30 text-purple-300 px-2 py-0.5 rounded text-xs border border-purple-700/30"
                    >
                        {tech}
                    </span>
                ))}
            </div>

            {/* Details Button */}
            {onDetails && (
                <button
                    onClick={() => onDetails(project)}
                    className="mt-auto bg-purple-600 hover:bg-purple-500 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                    Details
                </button>
            )}
        </motion.div>
    );
};

export default ProjectCard;
