import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-navigate to desktop after 3 seconds with startup state
    const timer = setTimeout(() => {
      navigate('/desktop', {
        state: {
          startup: true,
          welcomeComplete: true,
          timestamp: Date.now(),
        },
        replace: true,
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-900 via-blue-500 to-blue-900 font-sans overflow-hidden">
      {/* Top dark blue bar */}
      <div className="h-12 sm:h-16 md:h-28 bg-brand-primary border-b flex-shrink-0" />

      {/* Main content area */}
      <div className="relative flex-1 flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-400">
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        />

        {/* Welcome text */}
        <div className="text-center z-10 animate-fade-in px-4">
          <div className="text-4xl md:text-[80px] font-bold m-0 text-white drop-shadow-2xl italic tracking-wider">
            welcome
          </div>
        </div>
      </div>

      {/* Bottom dark blue bar */}
      <div className="h-12 sm:h-16 md:h-28 bg-brand-primary border-t border-brand-accent flex-shrink-0" />

      {/* CSS Animation */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Welcome;
