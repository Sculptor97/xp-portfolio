import React from 'react';
import XPIcon from './XPIcon';

export interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  icon?: string;
  iconAlt?: string;
  singleButton?: boolean; // For alert-style dialogs with only OK button
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  onCancel,
  title = 'Open Link',
  message,
  confirmText = 'Visit',
  cancelText = 'Cancel',
  icon,
  iconAlt,
  singleButton = false,
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    onClose();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleCancel();
    } else if (event.key === 'Enter') {
      handleConfirm();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[10000]"
      onClick={onClose}
    >
      <div
        className="window"
        style={{
          width: '90vw',
        }}
        onClick={e => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        <div
          className="title-bar"
          style={{ height: '40px', minHeight: '24px' }}
        >
          <div
            className="title-bar-text flex items-center text-white"
            style={{ fontSize: '16px', fontWeight: 'bold' }}
          >
            {icon && (
              <XPIcon src={icon} alt={iconAlt || ''} className="w-6 h-6 mr-1" />
            )}
            {title}
          </div>
          <div className="title-bar-controls">
            <button aria-label="Close" onClick={onClose}></button>
          </div>
        </div>
        <div className="window-body">
          <div className="text-center my-2 px-4">
            {icon && (
              <div className="md:mb-2">
                <XPIcon
                  src={icon}
                  alt={iconAlt || ''}
                  className="w-8 h-8 md:w-12 md:h-12 mx-auto"
                />
              </div>
            )}
            <h3 className="text-sm md:text-base md:font-semibold">{title}</h3>
            <p className="mb-6 text-sm leading-relaxed">{message}</p>
            <div
              className={`flex ${singleButton ? 'justify-center' : 'justify-between'}`}
            >
              {!singleButton && (
                <button
                  onClick={handleCancel}
                  className="px-4 py-1 text-sm h-8 w-30"
                >
                  {cancelText}
                </button>
              )}
              <button
                onClick={handleConfirm}
                autoFocus
                className="px-4 py-1 text-2xl h-8 w-30"
              >
                {singleButton ? 'OK' : confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
