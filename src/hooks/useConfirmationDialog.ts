import { useState, useCallback } from 'react';

export interface ConfirmationDialogState {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  icon?: string;
  iconAlt?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const useConfirmationDialog = () => {
  const [dialogState, setDialogState] = useState<ConfirmationDialogState>({
    isOpen: false,
    message: '',
  });

  const showDialog = useCallback(
    (config: Omit<ConfirmationDialogState, 'isOpen'>) => {
      setDialogState({
        ...config,
        isOpen: true,
      });
    },
    []
  );

  const hideDialog = useCallback(() => {
    setDialogState(prev => ({
      ...prev,
      isOpen: false,
    }));
  }, []);

  const showLinkConfirmation = useCallback(
    (url: string, platform: string, onConfirm: () => void) => {
      showDialog({
        title: 'Open Link',
        message: `Are you sure you want to open '${platform}'?`,
        confirmText: `Visit ${platform}`,
        cancelText: 'Cancel',
        icon: getPlatformIcon(platform),
        iconAlt: platform,
        onConfirm,
      });
    },
    [showDialog]
  );

  return {
    dialogState,
    showDialog,
    hideDialog,
    showLinkConfirmation,
  };
};

// Helper function to get platform icons
const getPlatformIcon = (platform: string): string => {
  const platformIcons: Record<string, string> = {
    LinkedIn: '/assets/linkedin.webp',
    Instagram: '/assets/instagram.webp',
    Github: '/assets/github.webp',
    GitHub: '/assets/github.webp',
  };

  return platformIcons[platform] || '/assets/IE.png';
};
