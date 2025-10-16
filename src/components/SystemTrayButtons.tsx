import React, { useState, useEffect } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import XPIcon from './XPIcon';
import WelcomeNotification from './WelcomeNotification';
import { playBalloonSound } from '../lib/soundUtils';

interface SystemTrayButtonsProps {
  shouldShowWelcome?: boolean;
  onWelcomeShown?: () => void;
}

const SystemTrayButtons: React.FC<SystemTrayButtonsProps> = ({
  shouldShowWelcome = false,
  onWelcomeShown,
}) => {
  const [isGridVisible, setIsGridVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  // Handle startup welcome notification
  useEffect(() => {
    if (shouldShowWelcome) {
      setShowWelcome(true);
      playBalloonSound();
      onWelcomeShown?.();
    }
  }, [shouldShowWelcome, onWelcomeShown]);

  const toggleGrid = () => {
    setIsGridVisible(!isGridVisible);
    const gridOverlay = document.getElementById('xp-grid-overlay');
    if (gridOverlay) {
      gridOverlay.style.display = isGridVisible ? 'none' : 'block';
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const showInfo = () => {
    setShowWelcome(true);
    playBalloonSound();
  };

  return (
    <div className="flex items-center gap-1">
      {/* Information Button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <div onClick={showInfo} className="system-tray-button">
            <XPIcon
              src="/assets/Information.webp"
              alt="Information"
              className="h-5 w-5"
            />
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-[#ECE9D8] text-black" sideOffset={10}>
          <p>Information</p>
        </TooltipContent>
      </Tooltip>

      {/* CRT Grid Toggle Button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            onClick={toggleGrid}
            className={`system-tray-button ${isGridVisible ? 'active' : ''}`}
          >
            {isGridVisible ? (
              <XPIcon src="/assets/s_ok.webp" alt="Grid" className="h-5 w-5" />
            ) : (
              <XPIcon src="/assets/s_err.webp" alt="Grid" className="h-5 w-5" />
            )}
            {/* <XPIcon src="/src/assets/grid.png" alt="Grid" className="h-2 w-2" /> */}
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-[#ECE9D8] text-black" sideOffset={10}>
          <p>{isGridVisible ? 'CRT Effects: ON' : 'CRT Effects: OFF'}</p>
        </TooltipContent>
      </Tooltip>

      {/* Fullscreen Toggle Button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            onClick={toggleFullscreen}
            className={`system-tray-button mobile ${isFullscreen ? 'active' : ''}`}
          >
            <XPIcon
              src="/assets/sysInfo.webp"
              alt="Fullscreen"
              className="h-5 w-5"
            />
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-[#ECE9D8] text-black" sideOffset={10}>
          <p>{isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}</p>
        </TooltipContent>
      </Tooltip>

      {/* Welcome Notification */}
      <WelcomeNotification
        isVisible={showWelcome}
        onClose={() => setShowWelcome(false)}
      />
    </div>
  );
};

export default SystemTrayButtons;
