import Desktop from '@/components/desktop/Desktop';
import {
  XPTaskBar,
  XPTaskBarStartMenu,
  XPTaskBarSystemTray,
} from '../components/taskbar/XPTaskbar';
import SystemTrayButtons from '../components/SystemTrayButtons';
import { StartMenu } from '../components/startmenu';
import ConfirmationDialog from '../components/ConfirmationDialog';
import { playStartupSoundWithCallback } from '../lib/soundUtils';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppManager';

function DesktopPage() {
  const location = useLocation();
  const [shouldShowWelcome, setShouldShowWelcome] = useState(false);
  const [startupComplete, setStartupComplete] = useState(false);
  const { desktopOnlyDialogState, hideDesktopOnlyDialog } = useAppContext();

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
    <div className="h-screen w-screen bg-black relative overflow-hidden">
      {/* Desktop viewport - this is where windows will be rendered */}
      <div className="desktop-viewport fixed top-[-2px] left-0 right-0 bottom-[28px] z-[1]">
        {/* Desktop with shortcuts */}
        <Desktop />
      </div>

      {/* Taskbar at the bottom */}
      <XPTaskBar className="fixed bottom-0 left-0 right-0 z-50">
        <XPTaskBarStartMenu>
          <StartMenu
            user={{
              name: 'Legha-gha',
              avatar: '/assets/profile.gif',
              avatarAlt: 'Legha-gha',
            }}
            onLogOff={() => {
              // Handle log off logic
              console.log('Log off clicked');
            }}
          />
        </XPTaskBarStartMenu>

        <XPTaskBarSystemTray>
          <SystemTrayButtons
            shouldShowWelcome={shouldShowWelcome}
            onWelcomeShown={() => setShouldShowWelcome(false)}
          />
        </XPTaskBarSystemTray>
      </XPTaskBar>

      {/* Desktop Only Alert Dialog - rendered at top level so it's always available */}
      <ConfirmationDialog
        isOpen={desktopOnlyDialogState.isOpen}
        onClose={hideDesktopOnlyDialog}
        title={desktopOnlyDialogState.title}
        message={desktopOnlyDialogState.message}
        icon={desktopOnlyDialogState.icon}
        singleButton={true}
      />
    </div>
  );
}

export default DesktopPage;
