import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import XPIcon from './XPIcon';

interface WelcomeNotificationProps {
  isVisible: boolean;
  onClose: () => void;
}

const WelcomeNotification: React.FC<WelcomeNotificationProps> = ({
  isVisible,
  onClose,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

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
      className={`fixed bottom-14 right-16 md:right-25 z-[9999] transition-all duration-300 ${
        isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {/* Speech bubble container */}
      <div className="relative">
        {/* Main notification box */}
        <div className="bg-[#FEF9C2] rounded-lg max-w-sm">
          {/* Title bar */}
          <div className="bg-blue-500 text-white px-3 py-2 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <XPIcon
                src="/assets/Information.webp"
                alt="Information"
                className="h-4 w-4"
              />
              <span className="font-semibold text-sm">
                Welcome to Legha-gha XP
              </span>
            </div>
            <div
              onClick={handleClose}
              className="text-white hover:bg-blue-600 rounded px-1 text-sm font-bold cursor-pointer"
            >
              <X className="h-4 w-4" />
            </div>
          </div>

          {/* Content area */}
          <div className="p-4 text-gray-800">
            <p className="text-sm mb-3">
              A faithful XP-inspired interface, custom-built to showcase my work
              and attention to detail.
            </p>
            <div className="text-sm">
              <span className="text-gray-600">Get Started:</span>
              <div className="mt-1">
                <a
                  href="#about"
                  className="text-blue-600 hover:text-blue-800 hover:underline mr-2"
                >
                  About Me
                </a>
                <span className="text-gray-400">|</span>
                <a
                  href="#projects"
                  className="text-blue-600 hover:text-blue-800 hover:underline ml-2"
                >
                  My Projects
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Speech bubble pointer */}
        <div className="absolute bottom-0.5 right-5 transform translate-y-full">
          <div className="w-0 h-0 border-l-8 border-r-8 border-t-20 border-l-transparent border-r-transparent border-t-[#FEF9C2]"></div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeNotification;
