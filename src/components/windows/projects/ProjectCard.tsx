import React from 'react';
import type { ProjectCardProps } from './types';

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const handleClick = () => {
    onClick(project.id);
  };

  return (
    <div onClick={handleClick} className="cursor-pointer group">
      {/* Image ONLY - no card wrapper, just rounded corners */}
      <div className="relative mb-3">
        <img
          src={project.img}
          alt={project.title}
          className="w-full aspect-video object-cover rounded-xl group-hover:opacity-90 transition-opacity"
        />

        {/* Badge overlay on image */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs font-medium px-2.5 py-1 rounded-md">
            {project.gallery.length} Images
          </div>
        )}
      </div>

      {/* Content below - NO background */}
      <div className="flex items-start gap-2">
        {/* Profile/avatar circle */}
        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0 overflow-hidden">
          <img
            src={project.img}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title and category */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-white text-base line-clamp-1 mb-0.5">
            {project.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {project.isPublicRepo ? 'Personal Work' : 'Client Work'} •{' '}
            {project.technologies[0] || 'Web'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
