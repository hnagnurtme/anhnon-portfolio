import React from "react";
import { motion } from "framer-motion";
import educationData from "../../data/education.json";
import schoolLogo from "../../assets/images/EDUCATION.svg";

const Education: React.FC = () => {
    return (
        <section id="education" className="w-full py-20 bg-black text-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <motion.h2
                    className="text-3xl font-bold text-center mb-12 text-purple-400"
                    initial={ { opacity: 0, y: 20 } }
                    whileInView={ { opacity: 1, y: 0 } }
                    viewport={ { once: true } }
                    transition={ { duration: 0.6 } }
                >
                    Education
                </motion.h2>

                <div className="flex flex-col gap-8">
                    { educationData.map( ( edu, index ) => (
                        <motion.div
                            key={ index }
                            initial={ { opacity: 0, y: 20 } }
                            whileInView={ { opacity: 1, y: 0 } }
                            viewport={ { once: true } }
                            transition={ { duration: 0.8, delay: index * 0.2 } }
                            className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-800/30 hover:scale-105 hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] transition-transform duration-300 flex"
                            style={ { minHeight: "200px" } }
                        >
                            {/* Logo bên trái full-height */ }
                            <div className="w-1/3 h-full">
                                <img
                                    src={ schoolLogo }
                                    alt={ edu.school }
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Thông tin bên phải */ }
                            <div className="w-2/3 p-6 flex flex-col justify-center gap-2">
                                <p className="text-white font-bold text-2xl">{ edu.school }</p>

                                <p className="text-gray-300 font-semibold">Major: { edu.major }</p>
                                <p className="text-gray-300 font-semibold">CPA: { edu.cpa }</p>
                                <p className="text-gray-300 font-semibold">Expected Graduation: { edu.expectedGraduation }</p>
                            </div>
                        </motion.div>
                    ) ) }
                </div>
            </div>
        </section>
    );
};

export default Education;
