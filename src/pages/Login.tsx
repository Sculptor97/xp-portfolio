import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntroData, useLogoText } from '@/services';
import logo from '@/assets/logo.svg';
import restartIcon from '@/assets/restart.svg';
import profileGif from '@/assets/profile.gif';
import 'xp.css/dist/98.css';

const Login: React.FC = () => {
  const navigate = useNavigate();

  // Fetch portfolio data
  const { data: introData } = useIntroData();
  const { data: logoText } = useLogoText();

  const handleUserClick = () => {
    // Simulate login process
    setTimeout(() => {
      navigate('/welcome', { replace: true });
    }, 1000);
  };

  const handleRestart = () => {
    navigate('/');
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-gradient-to-b from-blue-900 via-blue-500 to-blue-900 flex flex-col font-sans overflow-hidden">
      {/* Top dark blue bar */}
      <div className="h-16 md:h-28 bg-brand-primary relative">
        {/* White gradient line at bottom of top bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/80 to-transparent" />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-10 bg-[#5A86F7] relative">
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl z-10 relative">
          {/* Horizontal divider on mobile, vertical on desktop */}
          <div
            className="absolute left-0 right-0 top-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-white/80 to-transparent transform -translate-y-1/2 md:hidden"
            style={{ top: '45%' }}
          />
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-white/80 to-transparent transform -translate-x-1/2" />

          {/* Left side - Windows XP Logo and instructions */}
          <div className="flex-1 text-center">
            {/* Custom logo with name and title included */}
            <div className="mb-4 md:mb-8">
              <div className="flex justify-center items-center mb-3 md:mb-5">
                <img
                  src={logo}
                  alt="Portfolio Logo"
                  className="h-32 md:h-48 lg:h-56 drop-shadow-lg"
                />
              </div>
              <p className="text-sm hidden md:block text-white drop-shadow-sm m-0">
                To begin, click on {logoText || 'Legha-gha'} to log in
              </p>
            </div>
          </div>

          {/* Right side - User profile */}
          <div className="flex-1 flex justify-center">
            <div
              className="flex flex-col  md:flex-row items-center cursor-pointer p-4 md:p-6 rounded-lg transition-all duration-300"
              style={{
                background: 'transparent',
                border: 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background =
                  'linear-gradient(to right, #002490, transparent)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.border = 'none';
              }}
              onClick={handleUserClick}
            >
              {/* User avatar with profile gif */}
              <div className="w-16 h-16 md:w-30 md:h-30 rounded-lg mb-2 md:mb-0 md:mr-5 flex items-center justify-center border-2 border-white shadow-lg p-2">
                <img
                  src={profileGif}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* User info from API data */}
              <div className="text-center md:text-left">
                <h2 className="text-xs md:text-2xl text-white m-0 mb-1 md:mb-2 drop-shadow-lg capitalize">
                  {logoText || 'Loading...'}
                </h2>
                <p className="text-sm md:text-base text-white m-0 drop-shadow-sm capitalize">
                  {introData?.title || 'Loading...'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section with orange gradient line and restart button */}
      <div className="h-16 md:h-28 bg-brand-primary flex items-center justify-between px-3 md:px-5 relative">
        {/* Orange gradient line above the bar */}
        <div className="absolute top-0 left-0 w-2/3 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
        {/* Left side - Restart button */}
        <div className="hidden md:flex items-center">
          <div
            onClick={handleRestart}
            className="text-white cursor-pointer flex items-center text-base md:text-lg px-2 md:px-3 py-1 md:py-2 transition-colors"
          >
            <img
              src={restartIcon}
              alt="Restart"
              className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3"
            />
            <span className="md:inline text-nowrap">Restart Legha-gha XP</span>
            <span className="md:hidden">Restart</span>
          </div>
        </div>

        {/* Right side - Messages */}
        <div className="text-white text-base text-right w-full">
          <p className="m-0 mb-1 hidden md:block">
            After you log on, the system's yours to explore.
          </p>
          <p className="m-0 hidden md:block">
            Every detail has been designed with a purpose.
          </p>
          <p className="m-0 md:hidden text-center text-base">
            Tap the user icon to begin
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
