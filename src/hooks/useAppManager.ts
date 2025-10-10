import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { apps, type App } from '../apps';
import { ModalEvents, type ModalWindow } from '../components/core/modal-types';
import { modals } from '../components/core/modalController';
import { useDesktopOnlyAlert } from './useDesktopOnlyAlert';

export interface UseAppManagerReturn {
  openWindows: App[];
  openApp: (id: string) => void;
  closeApp: (id: string) => void;
  isAppOpen: (id: string) => boolean;
  showDesktopOnlyAlert: (appId: string) => void;
  desktopOnlyDialogState: {
    isOpen: boolean;
    title: string;
    message: string;
    icon?: string;
  };
  hideDesktopOnlyDialog: () => void;
}

// Create the context
const AppContext = createContext<UseAppManagerReturn | undefined>(undefined);

// The actual hook implementation
const useAppManager = (): UseAppManagerReturn => {
  const [openWindows, setOpenWindows] = useState<App[]>([]);
  const { dialogState: desktopOnlyDialogState, showDesktopOnlyAlert, hideDialog: hideDesktopOnlyDialog } = useDesktopOnlyAlert();

  // Handle window removal events
  useEffect(() => {
    const handleRemove = ({ id }: Partial<ModalWindow>) => {
      if (!id) return;
      setOpenWindows(prev => prev.filter(app => app.id !== id));
    };

    modals.on(ModalEvents.RemoveModal, handleRemove);
    return () => modals.off(ModalEvents.RemoveModal, handleRemove);
  }, []);

  const openApp = (id: string) => {
    const app = apps.find(a => a.id === id);
    if (!app) {
      console.warn(`App with id "${id}" not found`);
      return;
    }

    // Check if app is already open
    const isAlreadyOpen = openWindows.some(w => w.id === id);
    
    if (isAlreadyOpen) {
      // Focus the existing window
      console.log('useAppManager: Focusing existing window:', id);
      modals.emit(ModalEvents.ModalVisibilityChanged, { id });
    } else {
      // Add to open windows (window will auto-focus when rendered)
      setOpenWindows(prev => [...prev, app]);
    }
  };

  const closeApp = (id: string) => {
    setOpenWindows(prev => prev.filter(app => app.id !== id));
    modals.emit(ModalEvents.RemoveModal, { id });
  };

  const isAppOpen = (id: string): boolean => {
    return openWindows.some(app => app.id === id);
  };

  return {
    openWindows,
    openApp,
    closeApp,
    isAppOpen,
    showDesktopOnlyAlert,
    desktopOnlyDialogState,
    hideDesktopOnlyDialog,
  };
};

// Provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const appManager = useAppManager();
  return React.createElement(AppContext.Provider, { value: appManager }, children);
};

// Hook to use the context
export const useAppContext = (): UseAppManagerReturn => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
