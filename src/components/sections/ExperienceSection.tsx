import React from "react";
import { motion } from "framer-motion";
import experienceData from "../../data/experience.json";

interface Achievement {
    description: string;
    link?: string;
    verify: string;
}

interface Experience {
    organization: string;
    duration: string;
    role: string;
    achievements: Achievement[];
}

const ExperienceSection: React.FC = () => {
    return (
        <section id="experience" className="w-full py-20 bg-gray-900 text-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <motion.h2
                    className="text-3xl font-bold text-center mb-12"
                    initial={ { opacity: 0, y: 20 } }
                    whileInView={ { opacity: 1, y: 0 } }
                    viewport={ { once: true } }
                    transition={ { duration: 0.6 } }
                >
                    Experience
                </motion.h2>

                <div className="space-y-12">
                    { ( experienceData as Experience[] ).map( ( exp ) => (
                        <motion.div
                            key={ exp.organization }
                            initial={ { opacity: 0, y: 30 } }
                            whileInView={ { opacity: 1, y: 0 } }
                            viewport={ { once: true } }
                            transition={ { duration: 0.8, delay: 0.2 } }
                            className="relative"
                        >
                            {/* Timeline dot and line */ }
                            <div className="hidden md:block absolute left-0 top-0 bottom-0 w-0.5 bg-purple-800/50 ml-6">
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-purple-500"></div>
                            </div>

                            <div className="md:ml-16">
                                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-800/30">
                                    <div className="flex flex-col md:flex-row justify-between mb-4">
                                        <div>
                                            <h3 className="font-semibold text-xl text-white">{ exp.role }</h3>
                                            <p className="text-purple-400">{ exp.organization }</p>
                                        </div>
                                        <span className="text-gray-400 text-sm mt-2 md:mt-0">{ exp.duration }</span>
                                    </div>

                                    <h4 className="text-sm font-medium text-purple-300 mb-3">Key Achievements:</h4>
                                    <ul className="space-y-4">
                                        { exp.achievements.map( ( achievement, idx ) => (
                                            <motion.li
                                                key={ idx }
                                                initial={ { opacity: 0, x: -10 } }
                                                whileInView={ { opacity: 1, x: 0 } }
                                                viewport={ { once: true } }
                                                transition={ { duration: 0.5, delay: 0.3 + ( idx * 0.1 ) } }
                                                className="bg-gray-700/30 rounded-lg p-4 border border-gray-700/50"
                                            >
                                                <p className="text-gray-300 text-sm">{ achievement.description }</p>

                                                <div className="flex gap-4 mt-3">
                                                    { achievement.link && (
                                                        <a
                                                            href={ achievement.link }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                                                        >
                                                            View Project
                                                        </a>
                                                    ) }

                                                    <a
                                                        href={ achievement.verify }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                                                    >
                                                        Verify
                                                    </a>
                                                </div>
                                            </motion.li>
                                        ) ) }
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    ) ) }
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;
