import React from "react";
import { motion } from "framer-motion";
import aboutData from "../../data/personal.json";
import educationData from "../../data/education.json";

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="w-full py-20 bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-800/30">
              <h3 className="text-xl font-semibold mb-3 text-purple-400">Personal Info</h3>
              <div className="space-y-2 text-gray-300">
                <p><span className="font-semibold text-white">Name:</span> {aboutData.name}</p>
                <p><span className="font-semibold text-white">Role:</span> {aboutData.title}</p>
                <p><span className="font-semibold text-white">Location:</span> {aboutData.location}</p>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-800/30">
              <h3 className="text-xl font-semibold mb-3 text-purple-400">Education</h3>
              {educationData.map((edu, index) => (
                <div key={index} className="space-y-2 text-gray-300">
                  <p className="font-semibold text-white">{edu.school}</p>
                  <p>Major: {edu.major}</p>
                  <p>Expected Graduation: {edu.expectedGraduation}</p>
                  <p>CPA: {edu.cpa}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-800/30 flex flex-col justify-center"
          >
            <h3 className="text-xl font-semibold mb-4 text-purple-400">About Me</h3>
            <p className="text-gray-300 mb-4">
              I am a passionate software engineer with a focus on web development and backend systems. 
              Currently pursuing my degree in Information Technology at Da Nang University of Science and Technology,
              I am dedicated to creating efficient and innovative software solutions.
            </p>
            <p className="text-gray-300">
              With experience in various programming languages and frameworks, I enjoy solving complex problems
              and continuously learning new technologies to enhance my skills.
            </p>

            <div className="mt-6">
              <h4 className="font-medium text-white mb-2">Contact Information:</h4>
              <div className="space-y-1 text-gray-300">
                <p><span className="font-semibold text-white">Email:</span> {aboutData.contact.email}</p>
                <p><span className="font-semibold text-white">Phone:</span> {aboutData.contact.phone}</p>
                <a 
                  href={aboutData.contact.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-purple-400 hover:text-purple-300 transition-colors"
                >
                  GitHub Profile
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
