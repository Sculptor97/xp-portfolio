import React from 'react';
import { XPWindow, XPWindowHeader, XPWindowBody } from '@/components/window';
import XPIcon from '@/components/XPIcon';

interface ProjectsWindowProps {
  id?: string;
  title?: string;
  icon?: string;
  width?: number;
  height?: number;
}

const ProjectsWindow: React.FC<ProjectsWindowProps> = ({
  id = 'my-projects',
  title = 'My Projects',
  icon = '/assets/IE.webp',
  width = 600,
  height = 500,
}) => {
  return (
    <XPWindow
      title={title}
      icon={<XPIcon src={icon} alt="Projects" className="w-5 h-5" />}
      id={id}
      width={width}
      height={height}
    >
      <XPWindowHeader icon={icon} address={title} />

      <XPWindowBody>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">My Projects</h2>
          <div className="space-y-4">
            <div className="border-b pb-2">
              <h3 className="font-semibold">Windows XP Portfolio</h3>
              <p className="text-sm text-gray-600">
                A nostalgic portfolio website built with React and TypeScript
              </p>
            </div>
            <div className="border-b pb-2">
              <h3 className="font-semibold">E-commerce Site</h3>
              <p className="text-sm text-gray-600">
                Full-stack e-commerce platform with payment integration
              </p>
            </div>
            <div className="border-b pb-2">
              <h3 className="font-semibold">Data Dashboard</h3>
              <p className="text-sm text-gray-600">
                Real-time analytics dashboard with interactive charts
              </p>
            </div>
          </div>
        </div>
      </XPWindowBody>
    </XPWindow>
  );
};

export default ProjectsWindow;
