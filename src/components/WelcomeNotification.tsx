import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import XPIcon from './XPIcon';
import { useAppContext } from '@/hooks/useAppManager';
import { APP_IDS } from '@/apps';

interface WelcomeNotificationProps {
  isVisible: boolean;
  onClose: () => void;
}

const WelcomeNotification: React.FC<WelcomeNotificationProps> = ({
  isVisible,
  onClose,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const { openApp } = useAppContext();

  const handleOpenAboutMe = () => {
    openApp(APP_IDS.ABOUT_ME);
    handleClose();
  };

  const handleOpenProjects = () => {
    openApp(APP_IDS.MY_PROJECTS);
    handleClose();
  };

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      // Auto-close after 8 seconds
      const timer = setTimeout(() => {
        handleClose();
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-14 right-14 md:right-25 z-[9999] transition-all duration-300 ${
        isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="relative">
        {/* Main notification box */}
        <div className="bg-[#FEF9C2] rounded-lg w-[90vw] max-w-xs sm:max-w-sm md:max-w-md shadow-lg">
          {/* XP Gradient Title Bar */}
          <div
            className="text-white px-3 py-2 rounded-t-lg flex items-center justify-between"
            style={{
              background: `
                linear-gradient(to bottom, 
                  #4B8BF5 0%, 
                  #2A6CD6 40%, 
                  #1D59C1 70%, 
                  #2452A4 100%)`,
              boxShadow: 'inset 0 1px rgba(255,255,255,0.3)',
            }}
          >
            <div className="flex items-center gap-2 min-w-0">
              <XPIcon
                src="/assets/Information.webp"
                alt="Information"
                className="h-4 w-4 flex-shrink-0"
              />
              <span className="font-semibold text-sm truncate drop-shadow-sm">
                Welcome to Legha-gha XP
              </span>
            </div>
            <div
              onClick={handleClose}
              className="text-white hover:bg-blue-600 rounded px-1 text-sm font-bold cursor-pointer flex-shrink-0 transition-colors duration-150"
            >
              <X className="h-4 w-4" />
            </div>
          </div>

          {/* Content area */}
          <div className="p-3 sm:p-4 text-gray-800 text-sm sm:text-base leading-relaxed">
            <p className="mb-3">
              A faithful XP-inspired interface, custom-built to showcase my work
              and attention to detail.
            </p>
            <div>
              <span className="text-gray-600">Get Started:</span>
              <div className="mt-1 flex flex-wrap gap-x-2 gap-y-1">
                <div
                  onClick={handleOpenAboutMe}
                  role="button"
                  className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer bg-transparent border-none p-0 text-left"
                >
                  About Me
                </div>
                <span className="text-gray-400 hidden sm:inline">|</span>
                <div
                  onClick={handleOpenProjects}
                  role="button"
                  className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer bg-transparent border-none p-0 text-left"
                >
                  My Projects
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Speech bubble pointer (unchanged) */}
        <div className="absolute bottom-0.5 right-5 transform translate-y-full">
          <div className="w-0 h-0 border-l-8 border-r-8 border-t-20 border-l-transparent border-r-transparent border-t-[#FEF9C2]" />
        </div>
      </div>
    </div>
  );
};

export default WelcomeNotification;
