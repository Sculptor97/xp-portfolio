import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogoText } from '@/services';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  // Fetch portfolio data
  const { data: logoText } = useLogoText();

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
    <div className="fixed inset-0 w-screen h-screen bg-gradient-to-b from-blue-900 via-blue-500 to-blue-900 flex flex-col font-sans overflow-hidden min-h-screen">
      {/* Top dark blue bar */}
      <div className="h-12 sm:h-16 md:h-28 bg-brand-primary border-b flex-shrink-0" />

      {/* Main content area */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-400 relative min-h-0">
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-30"
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
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold m-0 text-white drop-shadow-2xl italic tracking-wider">
            welcome
          </h1>
          {logoText && (
            <p className="text-lg sm:text-xl md:text-2xl text-white drop-shadow-lg mt-3 sm:mt-4 md:mt-5 m-0 italic">
              {logoText}
            </p>
          )}
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
