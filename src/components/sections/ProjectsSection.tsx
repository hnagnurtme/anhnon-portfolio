import React from "react";
import { motion } from "framer-motion";
import projectsData from "../../data/projects.json";

interface Project {
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
}

const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="w-full py-20 bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {(projectsData as Project[]).map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-purple-800/30 overflow-hidden flex flex-col"
            >
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
                    {project.duration}
                  </span>
                </div>
                
                <p className="text-gray-300 mb-4 text-sm">{project.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-purple-400 mb-2">Role: {project.role}</h4>
                  <p className="text-xs text-gray-400 mb-2">Team Size: {project.teamSize}</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-purple-400 mb-2">Key Responsibilities:</h4>
                  <ul className="list-disc list-inside text-xs text-gray-300 space-y-1">
                    {project.responsibilities.slice(0, 3).map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                    {project.responsibilities.length > 3 && (
                      <p className="text-purple-400 text-xs cursor-pointer hover:underline mt-1">
                        + {project.responsibilities.length - 3} more
                      </p>
                    )}
                  </ul>
                </div>
                
                <div className="flex gap-2 flex-wrap mt-3">
                  {project.technologies.slice(0, 6).map((tech) => (
                    <span
                      key={tech}
                      className="bg-purple-900/30 text-purple-300 px-2 py-0.5 rounded text-xs border border-purple-700/30"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 6 && (
                    <span className="text-xs text-purple-400">
                      +{project.technologies.length - 6} more
                    </span>
                  )}
                </div>
              </div>
              
              <div className="border-t border-gray-700/50 p-4 bg-gray-900/40 flex gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    GitHub
                  </a>
                )}
                
                {project.links && project.links.website && (
                  <a
                    href={project.links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Live Demo
                  </a>
                )}
                
                {project.links && project.links.figma && (
                  <a
                    href={project.links.figma}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Figma
                  </a>
                )}
                
                {project.links && project.links.github && !project.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
