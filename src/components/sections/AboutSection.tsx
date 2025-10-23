import React from "react";
import { motion } from "framer-motion";
import Video from "../ui/Video";
import SectionTitle from "../ui/SectionTitle";
import ParticipationCard from "./ActivitiesSection";
import FloatingParticles from "../ui/FloatingParticles";

const AboutSection: React.FC = () => {
    return (
        <section
            id="about"
            className="w-full md:py-12 bg-black text-white relative px-6 md:px-16 py-20 overflow-x-hidden"
        >
            <FloatingParticles />
            <SectionTitle planet="Saturn" title="About Me" />

            <div className="flex flex-col md:flex-row w-full gap-10 items-start">

                {/* Video */ }
                <motion.div
                    className="flex-[1] w-full md:w-auto"
                    initial={ { opacity: 0, x: -30 } }
                    whileInView={ { opacity: 1, x: 0 } }
                    viewport={ { once: true } }
                    transition={ { duration: 0.8, delay: 0.2 } }
                >
                    <Video src="/videos/DAILY1.webm" height={ 700 } />
                </motion.div>

                {/* About Info + ParticipationCard */ }
                <motion.div
                    className="flex-[1] flex flex-col gap-6 w-full"
                    initial={ { opacity: 0, x: 50 } }
                    whileInView={ { opacity: 1, x: 0 } }
                    viewport={ { once: true } }
                    transition={ { duration: 0.8, delay: 0.4 } }
                >
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-purple-800/30 flex flex-col justify-center ">
                        <p className="text-gray-300 mb-4">
                            I am a Java developer with a strong foundation in Java Core, OOP, and SOLID principles.
                        </p>
                        <p className="text-gray-300 mb-4">
                            I have hands-on experience developing RESTful APIs with Spring Boot and working with MySQL.
                        </p>
                        <p className="text-gray-300">
                            Proficient in Git/Gitflow and team collaboration, I am actively improving my English skills and eager to contribute to real-world projects in a professional development environment.
                        </p>
                    </div>
                    <div className="max-w-md -ml-20  bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-800/30">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-white text-lg">
                                Da Nang University of Science and Technology
                            </h4>
                            <span className="italic text-gray-300 text-sm">
                                Expected Graduation in 2027
                            </span>
                        </div>
                        <p className="text-gray-300 text-sm">Major: Information Technology</p>
                        <p className="text-gray-300 text-sm">CPA: 3.69</p>
                    </div>


                    {/* ParticipationCard nằm dưới About Info */ }
                    <div className="flex justify-end pr-6">
                        <ParticipationCard />
                    </div>
                </motion.div>
            </div>
        </section>


    );
};

export default AboutSection;
