import React, { useState, useEffect, useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import cn from 'classnames';
import { type ModalWindow, ModalEvents, useModal } from '../core/events';
import './XPTaskbar.css';
import XPIcon from '../XPIcon';
import {
  registerButton,
  unregisterButton,
} from '../core/taskbarButtonRegistry';

// --- Internal Presentational Components ---

// The internal clock component for the system tray.
const Clock = (): React.ReactNode => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="clock">
      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </div>
  );
};

// A dedicated Start Button, decoupled from the window tabs.
const StartButton = ({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) => (
  <button
    className={cn('start-button modern-button', { 'is-active': active })}
    style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
    onClick={onClick}
  >
    <XPIcon src="/assets/favicon.svg" alt="Start" className="w-5 h-5" />
    <span className="text-sm md:text-base">Start</span>
  </button>
);

// A dedicated component for each window tab on the taskbar.
const WindowTab = ({
  icon,
  title,
  active,
  minimized,
  onClick,
  windowId,
}: {
  icon: React.ReactNode;
  title: string;
  active: boolean;
  minimized?: boolean;
  onClick: () => void;
  windowId: string;
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Register button ref for animations
  useEffect(() => {
    if (buttonRef.current) {
      registerButton(windowId, buttonRef);
    }

    return () => {
      unregisterButton(windowId);
    };
  }, [windowId]);

  return (
    <button
      ref={buttonRef}
      className={cn('window-tab', {
        'is-active': active,
        'is-minimized': minimized && !active,
      })}
      onClick={onClick}
    >
      {icon && <span className="icon">{icon}</span>}
      <span className="title">{title}</span>
    </button>
  );
};

// Internal component that manages window tabs
const WindowTabs = () => {
  const [modalWindows, setModalWindows] = useState<ModalWindow[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string>('');

  // The core business logic from react95
  const { minimize, restore, focus, subscribe } = useModal();

  // This effect contains the essential logic for syncing with the global modal state
  useEffect(() => {
    const addModal = (data: Partial<ModalWindow>) => {
      const window = data as ModalWindow;
      if (!window.id) {
        console.warn('Modal added without ID');
        return;
      }
      setModalWindows(prevModals => {
        // Prevent duplicates
        if (prevModals.some(modal => modal.id === window.id)) {
          return prevModals;
        }
        return [...prevModals, window];
      });
    };

    const removeModal = (data: Partial<ModalWindow>) => {
      if (!data.id) return;
      setModalWindows(prevModals => {
        const filteredModals = prevModals.filter(modal => modal.id !== data.id);

        const lastModal = filteredModals.at(-1);

        if (activeWindowId === data.id && lastModal) {
          focus(lastModal.id);
        }

        return filteredModals;
      });
    };

    const updateVisibleModal = (data: Partial<ModalWindow>) => {
      if (data.id) {
        setActiveWindowId(data.id);
      }
    };

    const unsubscribeAdd = subscribe(ModalEvents.AddModal, addModal);
    const unsubscribeRemove = subscribe(ModalEvents.RemoveModal, removeModal);
    const unsubscribeVisibility = subscribe(
      ModalEvents.ModalVisibilityChanged,
      updateVisibleModal
    );

    return () => {
      unsubscribeAdd();
      unsubscribeRemove();
      unsubscribeVisibility();
    };
  }, [activeWindowId, subscribe, focus]);

  return (
    <div className="taskbar-section window-tabs-section">
      {modalWindows.map(
        ({ id, icon, title, hasButton }) =>
          hasButton && (
            <WindowTab
              key={id}
              icon={icon}
              title={title}
              active={id === activeWindowId}
              minimized={
                id !== activeWindowId && modalWindows.some(w => w.id === id)
              }
              windowId={id}
              onClick={() => {
                if (id === activeWindowId) {
                  minimize(id);
                  setActiveWindowId('');
                } else {
                  restore(id);
                  focus(id);
                }
              }}
            />
          )
      )}
    </div>
  );
};

// --- Public Components ---

// Main taskbar container
const XPTaskBar: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  // Find the StartMenu and SystemTray components from children
  const startMenu = React.Children.toArray(children).find(
    child => React.isValidElement(child) && child.type === XPTaskBarStartMenu
  );
  const systemTray = React.Children.toArray(children).find(
    child => React.isValidElement(child) && child.type === XPTaskBarSystemTray
  );

  return (
    <div className={cn('xp-taskbar', className)}>
      {/* Start Menu Section */}
      {startMenu}

      {/* Window Tabs Section (Auto-inserted) */}
      <WindowTabs />

      {/* System Tray Section */}
      {systemTray}
    </div>
  );
};

// Start Menu wrapper with built-in button and state management
const XPTaskBarStartMenu: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close the menu if the user clicks outside of it, but exclude the start button
  useOnClickOutside(ref as React.RefObject<HTMLElement>, event => {
    // Check if the click is on the start button or its children
    const target = event.target as HTMLElement;
    const isStartButton = target.closest('.start-button');

    // Only close if the click is not on the start button
    if (!isStartButton) {
      setIsOpen(false);
    }
  });

  return (
    <div className="taskbar-section start-section">
      <StartButton active={isOpen} onClick={() => setIsOpen(prev => !prev)} />
      {isOpen && (
        <div ref={ref} className="start-menu-container">
          {React.cloneElement(
            children as React.ReactElement<{ onClose?: () => void }>,
            { onClose: () => setIsOpen(false) }
          )}
        </div>
      )}
    </div>
  );
};

// System Tray container with built-in clock
const XPTaskBarSystemTray: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => (
  <div className="taskbar-section system-tray-section">
    <div className="system-tray">
      {/* Render custom children first */}
      {children && (
        <div className="system-tray-custom-children mr-2">{children}</div>
      )}
      {/* Default clock is always displayed */}
      <Clock />
    </div>
  </div>
);

// System Tray button component
const XPTaskBarSystemTrayButton: React.FC<{
  icon: string;
  onClick?: () => void;
  tooltip?: string;
  alt?: string;
}> = ({ icon, onClick, tooltip, alt }) => (
  <button
    className="system-tray-button"
    onClick={onClick}
    title={tooltip}
    aria-label={alt || tooltip}
  >
    <XPIcon
      src={icon}
      alt={alt || tooltip || 'System tray button'}
      className="w-4 h-4"
    />
  </button>
);

// --- Exports ---
export {
  XPTaskBar,
  XPTaskBarStartMenu,
  XPTaskBarSystemTray,
  XPTaskBarSystemTrayButton,
};
