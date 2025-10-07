import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { useModal } from '../../react95/components/Modal/hooks/useModal';
import { useOnClickOutside } from 'usehooks-ts';
import cn from 'classnames';
import type { ModalWindow } from '../../react95/components/Modal/types/modal';
import { ModalEvents } from '../../react95/components/Modal/types/modal';
import './XPTaskbar.css';
import XPIcon from '../XPIcon';

// --- Internal, Presentational Components ---

// A dedicated Start Button, decoupled from the window tabs.
const StartButton = ({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) => (
  <button
    className={cn('start-button', { 'is-active': active })}
    style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
    onClick={onClick}
  >
    <XPIcon src="/src/assets/favicon.svg" alt="Start" className="w-5 h-5" />
    <span className="text-base">Start</span>
  </button>
);

// A dedicated component for each window tab on the taskbar.
const WindowTab = ({
  icon,
  title,
  active,
  minimized,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  active: boolean;
  minimized?: boolean;
  onClick: () => void;
}) => (
  <button
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

// --- Public, Compound Components ---

// A wrapper for the user's custom Start Menu content.
const XPStartMenu = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // Close the menu if the user clicks outside of it, but exclude the start button
  useOnClickOutside(ref as React.RefObject<HTMLElement>, event => {
    // Check if the click is on the start button or its children
    const target = event.target as HTMLElement;
    const isStartButton = target.closest('.start-button');

    // Only close if the click is not on the start button
    if (!isStartButton) {
      onClose();
    }
  });

  return (
    <div ref={ref} className="start-menu-container">
      {children}
    </div>
  );
};

// A wrapper for the system tray, which includes the clock and custom children.
const XPSystemTray = ({ children }: { children: React.ReactNode }) => (
  <div className="system-tray">
    {/* Render custom children first */}
    <div className="system-tray-custom-children mr-2">{children}</div>
    {/* Default clock is always displayed */}
    <Clock />
  </div>
);

// --- Main XPTaskBar Component ---

export type XPTaskBarProps = {
  children?: React.ReactNode;
  className?: string;
};

const XPTaskBar = forwardRef<HTMLDivElement, XPTaskBarProps>(
  ({ children, className }, ref) => {
    // --- STATE MANAGEMENT ---
    const [isStartMenuOpen, setStartMenuOpen] = useState(false);
    const [modalWindows, setModalWindows] = useState<ModalWindow[]>([]);
    const [activeWindowId, setActiveWindowId] = useState<string>('');

    // --- HOOKS ---
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
          const filteredModals = prevModals.filter(
            modal => modal.id !== data.id
          );

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

    // --- COMPOUND COMPONENT LOGIC ---
    // Find the StartMenu and SystemTray components from children
    const startMenu = React.Children.toArray(children).find(
      child => React.isValidElement(child) && child.type === XPStartMenu
    );
    const systemTray = React.Children.toArray(children).find(
      child => React.isValidElement(child) && child.type === XPSystemTray
    );

    return (
      <div ref={ref} className={cn('xp-taskbar', className)}>
        {/* 1. Render Start Menu and its button */}
        <div className="taskbar-section start-section">
          <StartButton
            active={isStartMenuOpen}
            onClick={() => setStartMenuOpen(prev => !prev)}
          />
          {isStartMenuOpen &&
            startMenu &&
            React.cloneElement(
              startMenu as React.ReactElement<{ onClose: () => void }>,
              { onClose: () => setStartMenuOpen(false) }
            )}
        </div>

        {/* 2. Render Window Tabs */}
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

        {/* 3. Render System Tray */}
        <div className="taskbar-section system-tray-section">{systemTray}</div>
      </div>
    );
  }
);

// --- ASSIGN SUB-COMPONENTS TO THE MAIN EXPORT ---
const XPTaskBarWithSubComponents = XPTaskBar as typeof XPTaskBar & {
  StartMenu: typeof XPStartMenu;
  SystemTray: typeof XPSystemTray;
};

XPTaskBarWithSubComponents.StartMenu = XPStartMenu;
XPTaskBarWithSubComponents.SystemTray = XPSystemTray;

export default XPTaskBarWithSubComponents;
