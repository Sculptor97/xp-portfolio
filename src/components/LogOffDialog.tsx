import React from 'react';
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
  if (!isOpen) return null;

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
        className="fixed inset-0 bg-black opacity-50 z-[9999] transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Dialog */}
      <div
        className="fixed inset-0 flex items-center justify-center z-[10000]"
        onClick={onClose}
      >
        <div
          className="window"
          style={{
            width: '400px',
            maxWidth: '90vw',
          }}
          onClick={e => e.stopPropagation()}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          {/* Blue Header */}
          <div className="h-10 md:h-12 text-white p-4 flex items-center justify-between bg-gradient-to-b from-[#0353be] to-[#2d7dd1]">
            <div className="flex items-center">
              <span className="text-sm md:text-lg font-bold">{title}</span>
            </div>
            <XPIcon
              src="/assets/favicon.svg"
              alt="Windows XP Logo"
              className="w-8 h-8"
            />
          </div>

          {/*   Body */}
          <div className=" p-6">
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
                    src="/assets/restart.svg"
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
                        ? '/assets/Logout.png'
                        : '/assets/Power.png'
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

          {/* Blue Footer */}
          <div className="h-10 md:h-12 flex items-center justify-end pr-4 bg-gradient-to-b from-[#0353be] to-[#2d7dd1]">
            <button
              onClick={onClose}
              className="px-6 py-2 h-8 w-30 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded text-sm font-medium transition-colors"
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
