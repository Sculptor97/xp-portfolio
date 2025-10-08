import Desktop from '@/components/desktop/Desktop';
import XPTaskBar from '../components/taskbar/XPTaskbar';
import SystemTrayButtons from '../components/SystemTrayButtons';
import { playStartupSoundWithCallback } from '../lib/soundUtils';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function DesktopPage() {
  const location = useLocation();
  const [shouldShowWelcome, setShouldShowWelcome] = useState(false);
  const [startupComplete, setStartupComplete] = useState(false);

  // Handle startup sequence
  useEffect(() => {
    const state = location.state as any;
    
    // Only trigger on fresh navigation from Welcome page, not on refresh
    if (state?.startup && state?.welcomeComplete && !startupComplete) {
      // Add small delay before playing startup sound
      const soundDelay = setTimeout(() => {
        playStartupSoundWithCallback(() => {
          setShouldShowWelcome(true);
          setStartupComplete(true);
        });
      }, 1000);
      
      // Clear the navigation state to prevent refresh issues
      window.history.replaceState({}, document.title, window.location.pathname);
      
      return () => clearTimeout(soundDelay);
    }
  }, [location.state, startupComplete]);

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      {/* Desktop viewport - this is where windows will be rendered */}
      <div className="desktop-viewport fixed top-0 left-0 right-0 bottom-[40px] md:bottom-[35px] z-[1]">
        {/* Desktop with shortcuts */}
        <Desktop />
      </div>

      {/* Taskbar at the bottom */}
      <XPTaskBar className="fixed bottom-0 left-0 right-0 z-50">
        <XPTaskBar.StartMenu onClose={() => {}}>
          <div className="start-menu bg-gray-200 border-2 border-gray-300 p-2 min-w-48">
            <div className="text-sm font-semibold mb-2">Programs</div>
            <div className="space-y-1">
              <div className="hover:bg-blue-100 p-1 cursor-pointer">
                About Me
              </div>
              <div className="hover:bg-blue-100 p-1 cursor-pointer">
                My Projects
              </div>
              <div className="hover:bg-blue-100 p-1 cursor-pointer">
                Contact
              </div>
            </div>
          </div>
        </XPTaskBar.StartMenu>

        <XPTaskBar.SystemTray>
          <SystemTrayButtons 
            shouldShowWelcome={shouldShowWelcome}
            onWelcomeShown={() => setShouldShowWelcome(false)}
          />
        </XPTaskBar.SystemTray>
      </XPTaskBar>
    </div>
  );
}

export default DesktopPage;
