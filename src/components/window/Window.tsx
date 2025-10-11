import React, { useState, useEffect, useRef, type RefObject } from 'react';
import {
  useModal,
  ModalEvents,
  useSafeEventSubscription,
  type ModalWindow,
} from '../core/events';
import { useDraggable } from '@neodrag/react';
import { nanoid } from 'nanoid';
import { cn } from '@/lib/utils';
import XPIcon from '../XPIcon';
import { useWindowMaximize } from '@/hooks/useWindowMaximize';
import './Window.css';

// --- TypeScript Interfaces ---

export interface XPWindowHeaderNavItemProps {
  icon?: string;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'default' | 'primary' | 'secondary';
  showDropdown?: boolean;
  className?: string;
}

export interface XPWindowHeaderProps {
  // Component-specific props
  icon?: string;
  loading?: boolean;
  address?: string;

  // Navigation items specific to the component
  children?: React.ReactNode;

  // Styling
  className?: string;
}

export interface XPWindowProps {
  children: React.ReactNode;
  title?: string;
  id?: string;
  width?: number;
  height?: number;
  icon?: React.ReactElement;
  dragOptions?: any;
}

// --- Navigation Item Component ---

const XPWindowHeaderNavItem: React.FC<XPWindowHeaderNavItemProps> = ({
  icon,
  label,
  onClick,
  disabled = false,
  variant = 'default',
  showDropdown = false,
  className,
}) => {
  return (
    <div
      className={cn(
        'xp-window-nav-item relative flex items-center gap-1 px-2 py-1 cursor-pointer',
        variant === 'primary' && 'primary',
        variant === 'secondary' && 'secondary',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={!disabled ? onClick : undefined}
      role="button"
      tabIndex={!disabled ? 0 : -1}
      onKeyDown={e => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {icon && <XPIcon src={icon} alt={label} className="w-5 h-5" />}
      <span className="text-xs font-medium">{label}</span>
      {showDropdown && (
        <div className="w-0 h-0 border-l-2 border-l-transparent border-r-2 border-r-transparent border-t-2 border-t-black ml-1" />
      )}
    </div>
  );
};

// --- Menu Bar Component ---

const XPWindowHeaderMenuBar: React.FC<{
  className?: string;
}> = ({ className }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const menuItems = ['File', 'Edit', 'View', 'Favorites', 'Tools', 'Help'];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <div
      className={cn(
        'xp-window-menu-bar w-full flex items-center px-2 py-1 min-h-[24px] bg-gradient-to-b from-gray-200 to-gray-300 border-b border-gray-400 relative',
        className
      )}
    >
      {/* Desktop menu items */}
      <div className="hidden sm:flex items-center">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="px-2 py-1 text-sm font-medium text-black hover:bg-blue-600 hover:text-white cursor-pointer transition-colors duration-150"
          >
            {item}
          </div>
        ))}
      </div>

      {/* Mobile menu button */}
      <div className="sm:hidden flex items-center" ref={menuRef}>
        <div
          className="px-2 py-1 text-sm font-medium text-black hover:bg-blue-600 hover:text-white cursor-pointer transition-colors duration-150"
          onClick={toggleMobileMenu}
          role="button"
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleMobileMenu();
            }
          }}
        >
          ☰ Menu
        </div>

        {/* Mobile dropdown menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 bg-white border border-gray-400 shadow-lg z-50 min-w-[120px]">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="px-3 py-2 text-sm font-medium text-black hover:bg-blue-600 hover:text-white cursor-pointer transition-colors duration-150 border-b border-gray-200 last:border-b-0"
                onClick={() => {
                  console.log(`${item} menu clicked`);
                  setIsMobileMenuOpen(false);
                }}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1" />
      <XPIcon src="/assets/favicon.svg" alt="Windows XP" className="w-8 h-8" />
    </div>
  );
};

// --- Navigation Bar Component ---

const XPWindowHeaderNavigation: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const defaultNavItems = [
    {
      icon: '/assets/back.svg',
      label: 'Back',
      variant: 'primary' as const,
      showDropdown: true,
      priority: 'high' as const,
    },
    {
      icon: '/assets/forward.svg',
      label: 'Forward',
      disabled: true,
      priority: 'high' as const,
    },
    {
      icon: '/assets/up.svg',
      label: 'Up',
      variant: 'secondary' as const,
      priority: 'high' as const,
    },
    {
      icon: '/assets/copy.webp',
      label: 'Copy',
      disabled: true,
      priority: 'low' as const,
    },
    {
      icon: '/assets/paste.webp',
      label: 'Paste',
      disabled: true,
      priority: 'low' as const,
    },
    {
      icon: '/assets/cut.webp',
      label: 'Cut',
      priority: 'medium' as const,
    },
  ];

  return (
    <div
      className={cn(
        'xp-window-navigation w-full flex items-center gap-1 px-2 py-1 min-h-[32px]',
        className
      )}
    >
      {/* Default navigation items */}
      {defaultNavItems.map((item, index) => (
        <XPWindowHeaderNavItem
          key={index}
          {...item}
          className={cn(item.priority === 'low' && 'hide-mobile')}
        />
      ))}

      {/* Separator */}
      <div className="xp-window-separator" />

      {/* Custom navigation items from children */}
      {children}
    </div>
  );
};

// --- Address Bar Component ---

const XPWindowHeaderAddressBar: React.FC<{
  icon?: string;
  address?: string;
  loading?: boolean;
  className?: string;
}> = ({ icon, address = 'me', loading = false, className }) => {
  const [progress, setProgress] = React.useState(0);
  const progressIntervalRef = React.useRef<number | null>(null);
  const addressPrefix = `C:\\\\www.leghagaha.com\\\\${address.toLowerCase()}`;

  // Handle progress animation when loading state changes
  React.useEffect(() => {
    if (loading) {
      // Start progress animation
      setProgress(0);
      progressIntervalRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            return 100;
          }
          // Increment progress with some randomness to make it feel more natural
          const increment = Math.random() * 15 + 5; // 5-20% increments
          return Math.min(prev + increment, 100);
        });
      }, 150); // Update every 150ms
    } else {
      // Stop progress animation and reset
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      setProgress(0);
    }

    // Cleanup on unmount
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [loading]);

  return (
    <div
      className={cn(
        'xp-window-address-bar w-full flex items-center gap-2 px-2 py-1 min-h-[28px]',
        className
      )}
    >
      <span className="text-sm text-gray-700 font-medium hidden sm:inline">
        Address
      </span>
      <div className="flex-1 relative xp-window-address-input px-2 py-1">
        {/* Progress bar overlay */}
        {loading && (
          <div
            className="xp-window-progress-bar absolute inset-0 transition-all duration-300 ease-out"
            style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
          />
        )}

        {/* Address bar content */}
        <div className="relative flex items-center z-10">
          {icon && (
            <XPIcon src={icon} alt="Application" className="w-4 h-4 mr-2" />
          )}
          <span className="text-sm text-black flex-1 truncate">
            {addressPrefix}
          </span>
          {loading && (
            <div className="ml-2 w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin xp-window-loading" />
          )}
          <div className="w-0 h-0 border-l-2 border-l-transparent border-r-2 border-r-transparent border-t-2 border-t-gray-600 ml-2" />
        </div>
      </div>
      <div
        className="xp-window-go-button flex items-center gap-1 px-2 py-1 text-sm font-medium cursor-pointer"
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            // Add go functionality here if needed
          }
        }}
      >
        <span className="hidden sm:inline">Go</span>
        <span className="sm:hidden">→</span>
        <div className="w-0 h-0 border-l-2 border-l-transparent border-r-2 border-r-transparent border-t-2 border-t-white" />
      </div>
    </div>
  );
};

// --- Window Header Component ---

const XPWindowHeader: React.FC<XPWindowHeaderProps> & {
  MenuBar: typeof XPWindowHeaderMenuBar;
  Navigation: typeof XPWindowHeaderNavigation;
  AddressBar: typeof XPWindowHeaderAddressBar;
  NavItem: typeof XPWindowHeaderNavItem;
} = ({ icon, loading = false, address, children, className }) => {
  return (
    <div
      className={cn(
        'xp-window-header px-1.5 bg-transparent border-gray-400 shadow-lg',
        className
      )}
    >
      <XPWindowHeaderMenuBar />
      <XPWindowHeaderNavigation>{children}</XPWindowHeaderNavigation>
      <XPWindowHeaderAddressBar
        icon={icon}
        address={address}
        loading={loading}
      />
    </div>
  );
};

// --- Window Body Component ---

const XPWindowBody: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children }) => (
  <div className={cn('window-body overflow-auto', className)}>{children}</div>
);

// --- Window Footer Component ---

const XPWindowFooter: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children }) => (
  <div className={cn('status-bar', className)}>{children}</div>
);

// --- Main XPWindow Component ---

const XPWindow: React.FC<XPWindowProps> & {
  Header: typeof XPWindowHeader;
  Body: typeof XPWindowBody;
  Footer: typeof XPWindowFooter;
} = ({
  children,
  title = 'Window',
  id: windowId,
  width = 600,
  height = 600,
  icon = <XPIcon src="/assets/favicon.svg" alt="Window" className="w-5 h-5" />,
  dragOptions,
}) => {
  // --- STATE MANAGEMENT ---
  const [id] = useState<string>(windowId || nanoid());
  const [isActive, setIsActive] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  // --- HOOKS ---
  // Core logic from react95's useModal hook
  const { add, remove, focus, minimize, subscribe } = useModal();
  // Draggability logic
  const draggableRef = useRef<HTMLDivElement>(null);
  // Maximize logic with position preservation
  const { isMaximized, handleMaximizeToggle } = useWindowMaximize(
    draggableRef as RefObject<HTMLDivElement | null>
  );

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
    focus(id); // Focus on creation
  }, [id, title, icon, add, remove, focus, subscribe]);

  // --- Safe subscriptions ---
  useSafeEventSubscription<Partial<ModalWindow>>(
    cb => subscribe(ModalEvents.ModalVisibilityChanged, cb),
    data => setIsActive(data.id === id)
  );

  useSafeEventSubscription<Partial<ModalWindow>>(
    cb => subscribe(ModalEvents.MinimizeModal, cb),
    data => {
      if (data.id === id) setIsMinimized(true);
    }
  );

  useSafeEventSubscription<Partial<ModalWindow>>(
    cb => subscribe(ModalEvents.RestoreModal, cb),
    data => {
      if (data.id === id) setIsMinimized(false);
    }
  );

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

  // --- DYNAMIC STYLING ---
  const windowStyles = isMaximized
    ? { width: '100%', height: '100%', top: 0, left: 0 }
    : { width: `${width}px`, height: `${height}px` };

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
        <div className="title-bar-text flex items-center gap-1 text-white">
          {icon && icon}
          {title}
        </div>
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

// --- Compound Component Assignment ---
XPWindow.Header = XPWindowHeader;
XPWindow.Body = XPWindowBody;
XPWindow.Footer = XPWindowFooter;

XPWindowHeader.MenuBar = XPWindowHeaderMenuBar;
XPWindowHeader.Navigation = XPWindowHeaderNavigation;
XPWindowHeader.AddressBar = XPWindowHeaderAddressBar;
XPWindowHeader.NavItem = XPWindowHeaderNavItem;

export {
  XPWindow,
  XPWindowHeader,
  XPWindowHeaderMenuBar,
  XPWindowHeaderNavigation,
  XPWindowHeaderAddressBar,
  XPWindowHeaderNavItem,
  XPWindowBody,
  XPWindowFooter,
};
