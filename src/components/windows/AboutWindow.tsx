import React from 'react';
import { XPWindow, XPWindowHeader, XPWindowBody } from '@/components/window';
import XPIcon from '@/components/XPIcon';

interface AboutWindowProps {
  id?: string;
  title?: string;
  icon?: string;
  width?: number;
  height?: number;
}

const AboutWindow: React.FC<AboutWindowProps> = ({
  id = 'about-me',
  title = 'About Me',
  icon = '/assets/Tour_XP.png',
  width = 500,
  height = 700,
}) => {
  return (
    <XPWindow
      title={title}
      icon={<XPIcon src={icon} alt="About" className="w-5 h-5" />}
      id={id}
      width={width}
      height={height}
    >
      <XPWindowHeader icon={icon} address={title} />

      <XPWindowBody>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">About Me</h2>
          <p className="text-gray-700">
            I'm a passionate developer creating cool things for the web! I
            specialize in React, TypeScript, and modern web technologies.
          </p>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Skills:</h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>React & TypeScript</li>
              <li>Node.js & Express</li>
              <li>Database Design</li>
              <li>UI/UX Design</li>
            </ul>
          </div>
        </div>
      </XPWindowBody>
    </XPWindow>
  );
};

export default AboutWindow;
