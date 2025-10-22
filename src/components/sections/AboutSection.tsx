import React from "react";
import { motion } from "framer-motion";
import aboutData from "../../data/personal.json";
import avatar from "../../assets/images/AVATAR.png";
import Education from "../features/Education";

const AboutSection: React.FC = () => {
    return (
        <section id="about" className="w-full py-4 md:py-6 bg-black text-white px-4 md:px-6 relative">
            <div className="max-w-7xl mx-auto px-0 sm:px-4">
                <motion.h2
                    className="text-3xl font-bold text-center mb-12"
                    initial={ { opacity: 0, y: 20 } }
                    whileInView={ { opacity: 1, y: 0 } }
                    viewport={ { once: true } }
                    transition={ { duration: 0.6 } }
                >
                    About Me
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    {/* Avatar */ }
                    <motion.div
                        initial={ { opacity: 0, x: -30 } }
                        whileInView={ { opacity: 1, x: 0 } }
                        viewport={ { once: true } }
                        transition={ { duration: 0.8, delay: 0.2 } }
                        className="space-y-6"
                    >
                        {/* Avatar */ }
                        <div className="w-[500px] h-[500px] relative -ml-4 md:-ml-0">
                            <img
                                src={ avatar }
                                alt={ aboutData.name }
                                className="w-full h-full object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 rounded-lg shadow-[0_0_80px_rgba(139,92,246,0.7)] pointer-events-none"></div>
                        </div>
                        {/* Education Component */ }
                        <Education />
                    </motion.div>

                    {/* About Me Info */ }
                    <motion.div
                        initial={ { opacity: 0, x: 50 } }
                        whileInView={ { opacity: 1, x: 0 } }
                        viewport={ { once: true } }
                        transition={ { duration: 0.8, delay: 0.4 } }
                        className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-purple-800/30 flex flex-col justify-center"
                    >
                        <h3 className="text-3xl font-semibold mb-4 text-purple-400">{ aboutData.name }</h3>
                        <p className="text-gray-300 mb-4">
                            I am a passionate software engineer with a focus on web development and backend systems.
                            Currently pursuing my degree in Information Technology at Da Nang University of Science and Technology,
                            I am dedicated to creating efficient and innovative software solutions.
                        </p>
                        <p className="text-gray-300">
                            With experience in various programming languages and frameworks, I enjoy solving complex problems
                            and continuously learning new technologies to enhance my skills.
                        </p>
                        <div className="mt-6 text-gray-300">
                            <p><span className="font-semibold text-white">Role:</span> { aboutData.title }</p>
                            <p><span className="font-semibold text-white">Location:</span> { aboutData.location }</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
