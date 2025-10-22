import React, { useEffect, useState } from "react";
import type { Project } from "./projects/ProjectCard";
import ListCircleImage from "./ListCricleImage";
import ProjectTitle from "./projects/ProjectTitle";

interface ProjectDetailsProps {
    project: Project;
    onClose: () => void;
    parentRef: React.RefObject<HTMLDivElement>;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ( { project, onClose, parentRef } ) => {
    const [ height, setHeight ] = useState<number>( 0 );

    useEffect( () => {
        const updateHeight = () => {
            if ( parentRef.current ) {
                setHeight( parentRef.current.offsetHeight );
            }
        };
        updateHeight();
        window.addEventListener( "resize", updateHeight );
        return () => window.removeEventListener( "resize", updateHeight );
    }, [ parentRef ] );

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            {/* Left (50%) - Details */ }
            <div
                className="bg-gray-900 rounded-l-2xl w-1/2 p-6 overflow-y-auto relative shadow-lg border-r border-purple-700/20"
                style={ { height } }
            >
                <button
                    className="absolute top-3 right-3 text-white text-lg hover:text-purple-400"
                    onClick={ onClose }
                >
                    &times;
                </button>

                <div className="space-y-3 text-sm leading-relaxed">
                    {/* <ProjectTitle project={project} /> */ } 
                    <ProjectTitle project={project} />
                    <p className="text-gray-400">{ project.description }</p>

                    <div>
                        <h4 className="text-purple-400 font-medium mb-1 text-sm">Key Responsibilities:</h4>
                        <ul className="list-disc list-inside text-gray-300 space-y-0.5">
                            { project.responsibilities.map( ( resp, idx ) => (
                                <li key={ idx }>{ resp }</li>
                            ) ) }
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-purple-400 font-medium mb-1 text-sm">Technologies:</h4>
                        <div className="flex flex-wrap gap-1.5">
                            { project.technologies.map( ( tech ) => (
                                <span
                                    key={ tech }
                                    className="bg-purple-900/30 text-purple-300 px-2 py-0.5 rounded text-[11px] border border-purple-700/30"
                                >
                                    { tech }
                                </span>
                            ) ) }
                        </div>
                    </div>

                    <div className="flex gap-3 mt-2 text-purple-400 text-sm">
                        { project.github && (
                            <a href={ project.github } target="_blank" rel="noopener noreferrer" className="hover:text-purple-300">
                                GitHub
                            </a>
                        ) }
                        { project.links?.website && (
                            <a href={ project.links.website } target="_blank" rel="noopener noreferrer" className="hover:text-purple-300">
                                Live Demo
                            </a>
                        ) }
                        { project.links?.figma && (
                            <a href={ project.links.figma } target="_blank" rel="noopener noreferrer" className="hover:text-purple-300">
                                Figma
                            </a>
                        ) }
                    </div>
                </div>
            </div>

            {/* Right (50%) - Centered Images */ }
            <div className="w-1/2 h-full flex items-center justify-center bg-gradient-to-br from-purple-900/10 to-black relative">
                <ListCircleImage
                    images={
                        Array.isArray( project.images )
                            ? project.images.map( ( img, idx ) => ( { id: idx, image: img } ) )
                            : project.images
                                ? [ { id: 0, image: project.images } ]
                                : []
                    }
                />
            </div>
        </div>
    );
};

export default ProjectDetails;
