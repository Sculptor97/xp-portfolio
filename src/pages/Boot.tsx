import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '@/services';
import logo from '@/assets/logo.svg';
import bootWordmark from '@/assets/boot-wordmark.webp';

const Boot: React.FC = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const navigate = useNavigate();

  // ---- API loading ----
  const {
    data: portfolio,
    error: portfolioError,
    isLoading: portfolioLoading,
  } = usePortfolio();

  // ---- Image preloading ----
  useEffect(() => {
    const imagesToPreload = [
      '/assets/logo.svg',
      '/assets/boot-wordmark.webp',
      '/assets/profile.gif',
      '/assets/pdf.svg',
      '/assets/IE.png',
      '/assets/outlook_expresss.png',
      '/assets/picture_viewer.png',
      '/assets/WMP.png',
      '/assets/Paint.png',
      '/assets/mp3_player.png',
      '/assets/Tour_XP.png',
      '/assets/s_ok.png',
      '/assets/s_err.png',
      '/assets/sysInfo.png',
      '/assets/Information.png',
      '/assets/bliss_wallpaper.png',
    ];

    let loadedCount = 0;

    imagesToPreload.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = () => {
        loadedCount++;
        const percent = (loadedCount / imagesToPreload.length) * 100;

        // Mix image progress into the global progress bar
        setLoadingProgress(prev => {
          const mixed = Math.min(
            100,
            prev + percent / 2 // half-weight to avoid sudden jumps
          );
          return mixed;
        });

        if (loadedCount === imagesToPreload.length) {
          setImagesLoaded(true);
        }
      };
    });
  }, []);

  // ---- Progress during API loading ----
  useEffect(() => {
    if (portfolioLoading) {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + Math.random() * 8;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [portfolioLoading]);

  // ---- Complete when both data & images are ready ----
  useEffect(() => {
    if (!portfolioLoading && portfolio && imagesLoaded) {
      setLoadingProgress(100);
      setTimeout(() => navigate('/login', { replace: true }), 1000);
    }
  }, [portfolioLoading, portfolio, imagesLoaded, navigate]);

  // ---- Full screen toggle (unchanged) ----
  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

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

  // ---- Error state (unchanged visuals, cleaned layout) ----
  if (portfolioError) {
    return (
      <div className="flex flex-col justify-center items-center bg-black text-white font-sans z-[9999] min-h-screen p-4">
        <div className="text-center max-w-md w-full">
          <h1 className="text-red-500 mb-3 sm:mb-4 md:mb-5 text-lg sm:text-xl md:text-2xl font-bold">
            Error Loading Portfolio
          </h1>
          <p className="text-white mb-4 sm:mb-5 md:mb-6 text-sm sm:text-base md:text-lg leading-relaxed">
            {portfolioError.message || 'Failed to load portfolio data'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 border-none text-white px-4 sm:px-5 md:px-6 py-2 sm:py-3 md:py-4 cursor-pointer rounded text-sm sm:text-base md:text-lg font-semibold hover:bg-blue-700 transition-colors min-h-[44px] w-full sm:w-auto"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ---- Boot screen (unchanged visuals, cleaned layout) ----
  return (
    <div className="flex flex-col justify-between items-center bg-black text-white font-sans z-[9999] h-full overflow-y-auto">
      {/* Top section */}
      <div className="flex flex-col justify-center items-center flex-grow text-center pt-16 md:pt-32 px-4">
        <img
          src={logo}
          alt="Portfolio Logo"
          className="h-32 md:h-48 w-auto mb-6 md:mb-8 object-contain"
        />

        {/* Progress bar container */}
        <div className="relative w-48 h-4 sm:w-64 sm:h-5 md:w-80 md:h-6 border-2 border-white rounded-full mx-auto mb-4 bg-white/10 overflow-hidden">
          {/* Fill bar */}
          <div
            className="h-full bg-blue-600 transition-all duration-300 ease-in-out rounded-full"
            style={{ width: `${loadingProgress}%` }}
          />

          {/* Percentage overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-xs sm:text-xs md:text-sm font-bold drop-shadow-lg">
              {Math.round(loadingProgress)}%
            </span>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="w-full px-4 py-4 sm:py-6 md:py-8 flex justify-between items-end min-h-[80px] sm:min-h-[100px]">
        <div className="hidden md:block text-white text-lg">
          <p className="m-0 mb-2 font-semibold">For the best experience</p>
          <p className="m-0 text-base">Enter Full Screen (F11)</p>
        </div>

        <div className="flex items-center justify-end w-full md:w-auto">
          <img
            src={bootWordmark}
            alt="Portfolio"
            className="h-8 w-auto sm:h-12 md:h-16 brightness-0 invert drop-shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Boot;
