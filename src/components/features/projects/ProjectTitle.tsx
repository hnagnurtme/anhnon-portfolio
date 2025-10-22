import React from "react";

interface ProjectTitleProps {
  project: {
    title: string;
    name: string;
    duration: string;
    role: string;
    teamSize: string | number;
  };
  onClose?: () => void;
}

const ProjectTitle: React.FC<ProjectTitleProps> = ({ project, onClose }) => {
  return (
    <div className="space-y-3 text-sm leading-relaxed">
      {/* Hàng đầu: Title (trái) + Duration (giữa) + Dấu X (phải) */}
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-purple-400 font-semibold text-base sm:text-lg whitespace-nowrap">
          {project.title}
        </h3>

        <div className="flex items-center gap-3 ml-auto">
          <p className="text-gray-300 text-xs sm:text-sm whitespace-nowrap">
            <strong>Duration:</strong> {project.duration}
          </p>

          {onClose && (
            <button
              onClick={onClose}
              className="text-white text-lg hover:text-purple-400 transition-colors"
            >
              &times;
            </button>
          )}
        </div>
      </div>

      {/* Tên project */}
      <h2 className="text-white font-bold text-xl sm:text-2xl mb-2 tracking-wide">
        {project.name}
      </h2>

      {/* Role + Team Size cùng hàng */}
      <div className="flex flex-wrap items-center gap-x-6 text-gray-300 text-sm">
        <p>
          <strong>Role:</strong> {project.role}
        </p>
        <p>
          <strong>Team Size:</strong> {project.teamSize}
        </p>
      </div>
    </div>
  );
};

export default ProjectTitle;
