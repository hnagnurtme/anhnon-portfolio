import React from "react";

interface SkillCardProps {
    category: string;
    skills: string[];
}

const SkillCard: React.FC<SkillCardProps> = ( { category, skills } ) => {
    return (
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col border border-gray-700 hover:border-purple-500 transition-all duration-300 card-hover">
            <h3 className="font-semibold text-xl mb-4 text-purple-400">{ category }</h3>
            <ul className="space-y-2 flex-grow">
                { skills.map( skill => (
                    <li key={ skill } className="flex items-center">
                        <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        <span className="text-gray-300">{ skill }</span>
                    </li>
                ) ) }
            </ul>
        </div>
    );
};

export default SkillCard;
