import React, { useEffect, useState } from 'react';
import XPIcon from './XPIcon';

export interface LogOffDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onRestart: () => void;
  onLogOff: () => void;
  onShutdown?: () => void;
  type: 'logoff' | 'shutdown';
  title?: string;
}

const LogOffDialog: React.FC<LogOffDialogProps> = ({
  isOpen,
  onClose,
  onRestart,
  onLogOff,
  onShutdown,
  type,
  title = 'Log Off Legha-gha XP',
}) => {
  const [overlayMounted, setOverlayMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setOverlayMounted(true), 400);
      return () => clearTimeout(timer);
    } else {
      setOverlayMounted(false);
    }
  }, [isOpen]);

  if (!isOpen && !overlayMounted) return null;

  const handleRestart = () => {
    onRestart();
    onClose();
  };

  const handleLogOff = () => {
    onLogOff();
    onClose();
  };

  const handleShutdown = () => {
    if (onShutdown) {
      onShutdown();
      onClose();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  const isShutdownDisabled = type === 'shutdown';

  return (
    <>
      {/* Grey overlay */}
      <div
        className={`fixed inset-0 z-[9999] transition-all duration-500`}
        style={{
          backgroundColor: 'rgba(0,0,0,0.2)',
          backdropFilter: overlayMounted
            ? 'grayscale(100%) brightness(0.6)'
            : 'grayscale(0%) brightness(1)',
        }}
        onClick={onClose}
      />

      {/* Dialog */}
      <div
        className="fixed inset-0 flex items-center justify-center z-[10000]"
        onClick={onClose}
      >
        <div
          className=" rounded-lg shadow-xl overflow-hidden"
          style={{
            width: '400px',
            maxWidth: '90vw',
          }}
          onClick={e => e.stopPropagation()}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          {/* XP Gradient Header */}
          <div
            className="h-10 md:h-12 text-white px-4 flex items-center justify-between select-none"
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
            <span className="text-sm md:text-lg font-bold drop-shadow-sm">
              {title}
            </span>
            <XPIcon
              src="/assets/favicon.svg"
              alt="Windows XP Logo"
              className="w-6 h-6 md:w-8 md:h-8"
            />
          </div>

          {/* Body */}
          <div className="p-6 bg-white">
            <div className="text-center">
              {/* Button container */}
              <div className="flex justify-center gap-8">
                {/* Restart Button */}
                <div
                  onClick={handleRestart}
                  className="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors"
                  style={{ minWidth: '80px' }}
                >
                  <XPIcon
                    src="/assets/restart.webp"
                    alt="Restart"
                    className="w-10 h-10 md:w-12 md:h-12 mb-2"
                  />
                  <span className="text-xs md:text-sm font-medium">
                    Restart
                  </span>
                </div>

                {/* Log Off or Shutdown Button */}
                <div
                  onClick={type === 'logoff' ? handleLogOff : handleShutdown}
                  className={`flex flex-col items-center justify-center p-2 rounded transition-colors ${
                    isShutdownDisabled
                      ? 'cursor-not-allowed opacity-50'
                      : 'cursor-pointer hover:bg-gray-100'
                  }`}
                  style={{ minWidth: '80px' }}
                >
                  <XPIcon
                    src={
                      type === 'logoff'
                        ? '/assets/Logout.webp'
                        : '/assets/Power.webp'
                    }
                    alt={type === 'logoff' ? 'Log Off' : 'Shutdown'}
                    className="w-10 h-10 md:w-12 md:h-12 mb-2"
                  />
                  <span className="text-sm font-medium">
                    {type === 'logoff' ? 'Log Off' : 'Shutdown'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* XP Gradient Footer */}
          <div
            className="h-10 md:h-12 flex items-center justify-end pr-4"
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
            <button
              onClick={onClose}
              className="px-6 py-2 h-8 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded text-sm font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogOffDialog;
