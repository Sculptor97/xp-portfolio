import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '@/services';
import logo from '@/assets/logo.svg';
import bootWordmark from '@/assets/boot-wordmark.webp';

const Boot: React.FC = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const navigate = useNavigate();

  // Fetch portfolio data
  const {
    data: portfolio,
    error: portfolioError,
    isLoading: portfolioLoading,
  } = usePortfolio();

  useEffect(() => {
    // Start loading progress when data starts loading
    if (portfolioLoading) {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90; // Stop at 90% until data is loaded
          }
          return prev + Math.random() * 10;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [portfolioLoading]);

  useEffect(() => {
    // Complete loading when data is loaded
    if (!portfolioLoading && portfolio) {
      setLoadingProgress(100);
      // Navigate to login after boot is complete
      setTimeout(() => navigate('/login', { replace: true }), 1000);
    }
  }, [portfolioLoading, portfolio, navigate]);

  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // Listen for F11 key press to toggle full screen
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'F11') {
        event.preventDefault();
        handleFullScreen();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Show error state if API calls fail
  if (portfolioError) {
    return (
      <div className="fixed inset-0 w-screen h-screen bg-black flex flex-col justify-center items-center text-white font-sans z-[9999]">
        <h1 className="text-red-500 mb-5">Error Loading Portfolio</h1>
        <p className="text-white mb-5">
          {portfolioError.message || 'Failed to load portfolio data'}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 border-none text-white px-5 py-2 cursor-pointer rounded hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black flex flex-col justify-center items-center text-white font-sans z-[9999]">
      {/* Main content */}
      <div className="text-center px-4">
        {/* Custom logo with name and title included - Large and prominent */}
        <div className="mb-6 md:mb-8">
          <img
            src={logo}
            alt="Portfolio Logo"
            className="h-48 w-auto mx-auto drop-shadow-2xl md:h-80"
          />
        </div>

        {/* Progress bar with percentage inside */}
        <div className="w-64 h-5 md:w-80 md:h-6 border-2 border-white rounded-full mx-auto mb-4 bg-white/10 overflow-hidden relative">
          <div
            className="h-full bg-blue-600 transition-all duration-300 ease-in-out rounded-full"
            style={{ width: `${loadingProgress}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-xs md:text-sm font-bold drop-shadow-lg">
              {Math.round(loadingProgress)}%
            </span>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="absolute bottom-8 md:bottom-12 left-4 right-4 md:left-5 md:right-5 flex justify-between items-end">
        {/* Left side - Full screen instruction - Hidden on mobile */}
        <div className="hidden md:block text-white text-lg">
          <p className="m-0 mb-2 font-semibold">For the best experience</p>
          <p className="m-0 text-base">Enter Full Screen (F11)</p>
        </div>

        {/* Right side - Portfolio branding - Responsive size */}
        <div className="flex items-center">
          <img
            src={bootWordmark}
            alt="Portfolio"
            className="h-12 w-auto md:h-16 brightness-0 invert drop-shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Boot;
