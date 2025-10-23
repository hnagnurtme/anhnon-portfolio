import React from "react";
import { motion } from "framer-motion";
import aboutData from "../../data/personal.json";
import Video from "../ui/Video";

const AboutSection: React.FC = () => {
    return (
        <section id="about" className="w-full bg-black text-white px-0 md:px-0 flex justify-start items-center py-12">
            <div className="flex flex-col md:flex-row w-full gap-10 items-start">

                {/* Video */ }
                <motion.div
                    className="flex-[2] "
                    initial={ { opacity: 0, x: -30 } }
                    whileInView={ { opacity: 1, x: 0 } }
                    viewport={ { once: true } }
                    transition={ { duration: 0.8, delay: 0.2 } }
                >
                    <Video
                        src="/videos/DAILY1.webm"
                        className="w-full h-full object-cover rounded-lg"
                        aspectRatio={ 16 / 12 }
                    />
                </motion.div>

                {/* About Me Info */ }
                <motion.div
                    className="flex-[1] bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-purple-800/30 flex flex-col justify-center"
                    initial={ { opacity: 0, x: 50 } }
                    whileInView={ { opacity: 1, x: 0 } }
                    viewport={ { once: true } }
                    transition={ { duration: 0.8, delay: 0.4 } }
                >
                    <h3 className="text-3xl font-semibold mb-4 text-purple-400">{ aboutData.name }</h3>
                    <p className="text-gray-300 mb-4">
                        I am a passionate software engineer with a focus on web development and backend systems.
                    </p>
                    <p className="text-gray-300">
                        With experience in various programming languages and frameworks, I enjoy solving complex problems.
                    </p>
                    <div className="mt-6 text-gray-300">
                        <p><span className="font-semibold text-white">Role:</span> { aboutData.title }</p>
                        <p><span className="font-semibold text-white">Location:</span> { aboutData.location }</p>
                    </div>
                </motion.div>

            </div>
        </section>

    );
};

export default AboutSection;
