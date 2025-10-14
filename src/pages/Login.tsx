import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntroData, useLogoText } from '@/services';
import { useAuth } from '@/hooks/useAuth';
import logo from '@/assets/logo.svg';
import restartIcon from '@/assets/restart.svg';
import profileGif from '@/assets/profile.webp';
import XPIcon from '@/components/XPIcon';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, restart } = useAuth();

  // Fetch portfolio data
  const { data: introData } = useIntroData();
  const { data: logoText } = useLogoText();

  const handleUserClick = () => {
    // Generate session ID and store in localStorage
    const session = login();
    console.log('Login successful, session ID:', session.sessionId);

    // Simulate login process
    setTimeout(() => {
      navigate('/welcome', { replace: true });
    }, 1000);
  };

  const handleRestart = () => {
    // Clear session and redirect to root
    restart();
  };

  return (
    <div className="flex flex-col h-full font-sans overflow-hidden bg-gradient-to-b from-blue-900 via-blue-500 to-blue-900">
      {/* Top dark blue bar — gradient line sits on the bottom edge */}
      <div className="h-12 sm:h-16 md:h-28 bg-brand-primary flex-shrink-0 relative">
        {/* White gradient line at bottom of top bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/80 to-transparent" />
      </div>

      {/* Main content area */}
      <main className="flex-1 flex items-center justify-center p-3 sm:p-4 md:p-10 bg-[#5A86F7] min-h-0">
        <div className="flex flex-col md:gap-8 md:flex-row items-center md:items-stretch justify-center w-full max-w-6xl z-10">
          {/* Left side - Windows XP Logo and instructions */}
          <div className="flex-1 text-center flex items-center justify-end">
            <div className="">
              <div className="flex justify-center items-center mb-2 sm:mb-3">
                <img
                  src={logo}
                  alt="Portfolio Logo"
                  className="h-48 w-48 md:w-52 md:h-52 drop-shadow-lg"
                />
              </div>
              <p className="text-xl hidden md:block md:-mt-5 text-white drop-shadow-sm m-0">
                To begin, click on {logoText || 'Legha-gha'} to log in
              </p>
            </div>
          </div>

          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-white/80 to-transparent md:w-0.5 md:h-auto md:bg-gradient-to-b md:mx-8" />

          {/* Right side - User profile */}
          <div className="flex-1 flex justify-start items-center">
            <div
              className="flex flex-col md:flex-row items-center cursor-pointer mt-5 p-4 md:p-6 rounded-lg transition-all duration-300"
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
              {/* User avatar with profile icon */}
              <div className="h-32 w-32 md:w-40 md:h-40 rounded-lg mb-2 md:mb-0 md:mr-5 flex items-center justify-center  p-1 sm:p-2">
                <XPIcon
                  src={profileGif}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* User info from API data */}
              <div className="text-center md:text-left">
                <div className="text-2xl sm:text-base md:text-4xl text-white m-0 mb-1 md:mb-2 drop-shadow-lg capitalize">
                  {logoText || 'Loading...'}
                </div>
                <p className="text-xl sm:text-sm md:text-2xl text-brand-primary m-0 drop-shadow-sm capitalize">
                  {introData?.title || 'Loading...'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom section with orange gradient line and restart button */}
      <footer className="h-16 md:h-28 bg-brand-primary flex items-center justify-between px-2 sm:px-3 md:px-5 relative flex-shrink-0">
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
        <div className="text-white text-sm sm:text-base text-right w-full">
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
      </footer>
    </div>
  );
};

export default Login;
