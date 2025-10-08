import { useState } from 'react';

export interface LogOffDialogState {
  isOpen: boolean;
  type: 'logoff' | 'shutdown';
  onRestart?: () => void;
  onLogOff?: () => void;
  onShutdown?: () => void;
}

export const useLogOffDialog = () => {
  const [dialogState, setDialogState] = useState<LogOffDialogState>({
    isOpen: false,
    type: 'logoff',
  });

  const showLogOffDialog = (onRestart?: () => void, onLogOff?: () => void) => {
    setDialogState({
      isOpen: true,
      type: 'logoff',
      onRestart,
      onLogOff,
    });
  };

  const showShutdownDialog = (
    onRestart?: () => void,
    onShutdown?: () => void
  ) => {
    setDialogState({
      isOpen: true,
      type: 'shutdown',
      onRestart,
      onShutdown,
    });
  };

  const hideDialog = () => {
    setDialogState(prev => ({
      ...prev,
      isOpen: false,
    }));
  };

  return {
    dialogState,
    showLogOffDialog,
    showShutdownDialog,
    hideDialog,
  };
};
