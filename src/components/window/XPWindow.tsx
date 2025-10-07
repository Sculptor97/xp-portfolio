import React, { useState, useEffect, useRef } from 'react';
import { useModal } from '../../react95/components/Modal/hooks/useModal';
import { ModalEvents } from '../../react95/components/Modal/types/modal';
import { useDraggable } from '@neodrag/react';
import { nanoid } from 'nanoid';
import cn from 'classnames';

// --- Sub-components for clean API usage ---

// XPWindow.Body: A simple wrapper for the main content area.
const XPWindowBody = ({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) => <div className={cn('window-body', className)}>{children}</div>;

// XPWindow.StatusBar: A simple wrapper for the status bar.
const XPWindowStatusBar = ({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) => <div className={cn('status-bar', className)}>{children}</div>;

// --- Main XPWindow Component ---

const XPWindow = ({
  children,
  title,
  id: windowId,
  width = 400,
  icon,
  dragOptions,
}: {
  children: React.ReactNode;
  title: string;
  id: string;
  width: number;
  icon: React.ReactElement;
  dragOptions?: any;
}) => {
  // --- STATE MANAGEMENT ---
  const [id] = useState<string>(windowId || nanoid());
  const [isActive, setIsActive] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  // --- HOOKS ---
  // Core logic from react95's useModal hook
  const { add, remove, focus, minimize, subscribe } = useModal();
  // Draggability logic
  const draggableRef = useRef<HTMLDivElement>(null);
  useDraggable(draggableRef as React.RefObject<HTMLElement>, {
    handle: '.draggable', // Only the title bar can be used for dragging
    disabled: isMaximized, // Disable dragging when maximized
    ...dragOptions, // Allow custom drag options
  });

  // --- EFFECTS ---
  // 1. Registering the window and handling focus
  useEffect(() => {
    // Add the window to the global state on mount
    add({ id, title, icon, hasButton: true });

    // Subscribe to focus changes
    const unsubFocus = subscribe(
      ModalEvents.ModalVisibilityChanged,
      ({ id: activeId }) => {
        setIsActive(activeId === id);
      }
    );

    focus(id); // Focus on creation

    // Cleanup on unmount
    return () => {
      remove(id);
      unsubFocus();
    };
  }, [id, title, icon, add, remove, focus, subscribe]);

  // 2. Handling minimize and restore events from the TaskBar
  useEffect(() => {
    const unsubMinimize = subscribe(
      ModalEvents.MinimizeModal,
      ({ id: activeId }) => {
        if (activeId === id) setIsMinimized(true);
      }
    );
    const unsubRestore = subscribe(
      ModalEvents.RestoreModal,
      ({ id: activeId }) => {
        if (activeId === id) setIsMinimized(false);
      }
    );

    return () => {
      unsubMinimize();
      unsubRestore();
    };
  }, [id, subscribe]);

  // --- INTERNAL EVENT HANDLERS ---
  const handleClose = () => {
    remove(id);
    minimize(id);
    focus('no-id');
  };
  const handleMinimize = () => {
    minimize(id);
    focus('no-id'); // Unfocus the window when minimizing
  };
  const handleMaximizeToggle = () => setIsMaximized(prev => !prev);

  // --- DYNAMIC STYLING ---
  const windowStyles = isMaximized
    ? { width: '100%', height: '100%', top: 0, left: 0 }
    : { width: `${width}px` };

  if (isMinimized) {
    return null; // Don't render anything if minimized (TaskBar handles it)
  }

  return (
    <div
      ref={draggableRef}
      className={cn('window xp-window', {
        'is-active': isActive,
        'is-minimized': isMinimized,
      })} // Add is-active for potential styling
      style={windowStyles}
      onMouseDown={() => focus(id)}
      role="dialog"
    >
      <div className="title-bar draggable">
        <div className="title-bar-text">{title}</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" onClick={handleMinimize}></button>
          {isMaximized ? (
            <button
              aria-label="Restore"
              onClick={handleMaximizeToggle}
            ></button>
          ) : (
            <button
              aria-label="Maximize"
              onClick={handleMaximizeToggle}
            ></button>
          )}
          <button aria-label="Close" onClick={handleClose}></button>
        </div>
      </div>
      {children}
    </div>
  );
};

// --- COMPOUND COMPONENT ASSIGNMENT ---
XPWindow.Body = XPWindowBody;
XPWindow.StatusBar = XPWindowStatusBar;

export default XPWindow;
