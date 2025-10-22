import React from "react";
import { motion } from "framer-motion";
import certsData from "../../data/certifications.json";

interface Certification {
    description: string;
    link?: string;
    verify: string;
}

const CertificationsSection: React.FC = () => {
    return (
        <section id="certifications" className="w-full py-20 bg-black text-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <motion.h2
                    className="text-3xl font-bold text-center mb-12"
                    initial={ { opacity: 0, y: 20 } }
                    whileInView={ { opacity: 1, y: 0 } }
                    viewport={ { once: true } }
                    transition={ { duration: 0.6 } }
                >
                    Certifications & Achievements
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    { ( certsData as Certification[] ).map( ( cert, index ) => (
                        <motion.div
                            key={ index }
                            initial={ { opacity: 0, y: 30 } }
                            whileInView={ { opacity: 1, y: 0 } }
                            viewport={ { once: true } }
                            transition={ { duration: 0.7, delay: index * 0.2 } }
                            className="bg-gray-800/50 backdrop-blur-sm border border-purple-800/30 rounded-lg p-6"
                        >
                            <p className="text-gray-300 mb-4">{ cert.description }</p>
                            <div className="flex gap-3">
                                { cert.link && (
                                    <a
                                        href={ cert.link }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                                    >
                                        View Project
                                    </a>
                                ) }
                                <a
                                    href={ cert.verify }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                                >
                                    Verify
                                </a>
                            </div>
                        </motion.div>
                    ) ) }
                </div>
            </div>
        </section>
    );
};

export default CertificationsSection;
