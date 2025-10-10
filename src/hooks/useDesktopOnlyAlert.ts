import { useState } from 'react';
import { apps } from '../apps';

export interface UseDesktopOnlyAlertReturn {
  dialogState: {
    isOpen: boolean;
    title: string;
    message: string;
    icon?: string;
  };
  showDesktopOnlyAlert: (appId: string) => void;
  hideDialog: () => void;
  isMobileDevice: () => boolean;
}

// Helper function to detect mobile devices
const isMobileDevice = (): boolean => {
  // Check for touch capability and screen size
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isSmallScreen = window.innerWidth < 768; // Mobile breakpoint
  
  // Additional checks for mobile user agents
  const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  return hasTouch && (isSmallScreen || isMobileUserAgent);
};

export const useDesktopOnlyAlert = (): UseDesktopOnlyAlertReturn => {
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    title: '',
    message: '',
    icon: undefined as string | undefined,
  });

  const showDesktopOnlyAlert = (appId: string) => {
    const app = apps.find(a => a.id === appId);
    if (!app) return;

    const isMobile = isMobileDevice();
    
    setDialogState({
      isOpen: true,
      title: app.title,
      message: isMobile 
        ? `${app.title} is only available on desktop devices. Please use a desktop computer to access this application.`
        : `${app.title} is currently not available. This feature is coming soon!`,
      icon: app.icon,
    });
  };

  const hideDialog = () => {
    setDialogState(prev => ({ ...prev, isOpen: false }));
  };

  return {
    dialogState,
    showDesktopOnlyAlert,
    hideDialog,
    isMobileDevice,
  };
};
