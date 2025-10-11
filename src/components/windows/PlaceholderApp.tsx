import React from 'react';
import {
  XPWindow,
  XPWindowBody,
  XPWindowFooter,
  XPWindowHeader,
} from '../window/Window';

interface PlaceholderAppProps {
  title: string;
  description?: string;
  icon?: string;
}

const PlaceholderApp: React.FC<PlaceholderAppProps> = ({
  title,
  description = 'This application is coming soon!',
  icon,
}) => {
  return (
    <XPWindow>
      <XPWindowHeader icon={icon} address={title} />
      <XPWindowBody>
        <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-b from-blue-50 to-blue-100">
          <div className="text-center">
            {icon && (
              <div className="mb-4">
                <img src={icon} alt={title} className="w-16 h-16 mx-auto" />
              </div>
            )}
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{title}</h1>
            <p className="text-gray-600 mb-4">{description}</p>
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
              <p className="text-sm">
                <strong>Coming Soon!</strong> This application is currently
                under development.
              </p>
            </div>
          </div>
        </div>
      </XPWindowBody>
      <XPWindowFooter>
        This is a placeholder app.
        <div className="flex-1" />
        <div className="text-sm text-gray-500">This is a placeholder app.</div>
      </XPWindowFooter>
    </XPWindow>
  );
};

export default PlaceholderApp;
