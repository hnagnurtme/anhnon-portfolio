import React from "react";
import skillsData from "../../data/skills.json";

const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="w-full py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skillsData).map(([category, skills]) => (
            <div
              key={category}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col"
            >
              <h3 className="font-semibold text-lg mb-3">{category}</h3>
              <ul className="list-disc list-inside space-y-1">
                {(skills as string[]).map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
