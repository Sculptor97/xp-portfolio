import React from 'react';
import { cn } from '@/lib/utils';
import XPIcon from '../XPIcon';
import './XPExplorerHeader.css';

// --- TypeScript Interfaces ---

export interface XPExplorerNavItemProps {
  icon?: string;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'default' | 'primary' | 'secondary';
  showDropdown?: boolean;
  className?: string;
}

export interface XPExplorerHeaderProps {
  // Component-specific props
  icon?: string;
  loading?: boolean;
  address?: string;

  // Navigation items specific to the component
  children?: React.ReactNode;

  // Styling
  className?: string;
}

// --- Navigation Item Component ---

const XPExplorerNavItem: React.FC<XPExplorerNavItemProps> = ({
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
        'xp-explorer-nav-item relative flex items-center gap-1 px-2 py-1 cursor-pointer',
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
      {icon && <XPIcon src={icon} alt={label} className="w-4 h-4" />}
      <span className="text-xs font-medium">{label}</span>
      {showDropdown && (
        <div className="w-0 h-0 border-l-2 border-l-transparent border-r-2 border-r-transparent border-t-2 border-t-black ml-1" />
      )}
    </div>
  );
};

// --- Menu Bar Component ---

const XPExplorerMenuBar: React.FC<{
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
        'xp-explorer-menu-bar w-full flex items-center px-2 py-1 min-h-[24px] bg-gradient-to-b from-gray-200 to-gray-300 border-b border-gray-400 relative',
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
      <XPIcon src="/assets/logo.svg" alt="Windows XP" className="w-5 h-5" />
    </div>
  );
};

// --- Navigation Bar Component ---

const XPExplorerNavigation: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const defaultNavItems = [
    {
      icon: '/assets/arrow.webp',
      label: 'Back',
      variant: 'primary' as const,
      showDropdown: true,
      priority: 'high' as const,
    },
    {
      icon: '/assets/arrow.webp',
      label: 'Forward',
      disabled: true,
      priority: 'high' as const,
    },
    {
      icon: '/assets/arrow.webp',
      label: 'Up',
      variant: 'secondary' as const,
      priority: 'high' as const,
    },
    {
      icon: '/assets/arrow.webp',
      label: 'Move To',
      disabled: true,
      priority: 'low' as const,
    },
    {
      icon: '/assets/arrow.webp',
      label: 'Copy To',
      disabled: true,
      priority: 'low' as const,
    },
    {
      icon: '/assets/arrow.webp',
      label: 'Search',
      priority: 'medium' as const,
    },
    {
      icon: '/assets/arrow.webp',
      label: 'Folders',
      priority: 'medium' as const,
    },
  ];

  return (
    <div
      className={cn(
        'xp-explorer-navigation w-full flex items-center gap-1 px-2 py-1 min-h-[32px]',
        className
      )}
    >
      {/* Default navigation items */}
      {defaultNavItems.map((item, index) => (
        <XPExplorerNavItem
          key={index}
          {...item}
          className={cn(item.priority === 'low' && 'hide-mobile')}
        />
      ))}

      {/* Separator */}
      <div className="xp-explorer-separator" />

      {/* Custom navigation items from children */}
      {children}
    </div>
  );
};

// --- Address Bar Component ---

const XPExplorerAddressBar: React.FC<{
  icon?: string;
  address?: string;
  loading?: boolean;
  className?: string;
}> = ({ icon, address = 'C:\\', loading = false, className }) => {
  return (
    <div
      className={cn(
        'xp-explorer-address-bar w-full flex items-center gap-2 px-2 py-1 min-h-[28px]',
        className
      )}
    >
      <span className="text-sm text-gray-700 font-medium hidden sm:inline">
        Address
      </span>
      <div className="flex-1 flex items-center xp-explorer-address-input px-2 py-1">
        {icon && (
          <XPIcon src={icon} alt="Application" className="w-4 h-4 mr-2" />
        )}
        <span className="text-sm text-black flex-1 truncate">{address}</span>
        {loading && (
          <div className="ml-2 w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin xp-explorer-loading" />
        )}
        <div className="w-0 h-0 border-l-2 border-l-transparent border-r-2 border-r-transparent border-t-2 border-t-gray-600 ml-2" />
      </div>
      <div
        className="xp-explorer-go-button flex items-center gap-1 px-2 py-1 text-sm font-medium cursor-pointer"
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

// --- Main XP Explorer Header Component ---

const XPExplorerHeader: React.FC<XPExplorerHeaderProps> & {
  Navigation: typeof XPExplorerNavigation;
  AddressBar: typeof XPExplorerAddressBar;
  NavItem: typeof XPExplorerNavItem;
} = ({ icon, loading = false, address, children, className }) => {
  return (
    <div
      className={cn(
        'xp-explorer-header w-full bg-white border border-gray-400 shadow-lg',
        className
      )}
    >
      <XPExplorerMenuBar />
      <XPExplorerNavigation>{children}</XPExplorerNavigation>
      <XPExplorerAddressBar icon={icon} address={address} loading={loading} />
    </div>
  );
};

// --- Compound Component Assignment ---
XPExplorerHeader.Navigation = XPExplorerNavigation;
XPExplorerHeader.AddressBar = XPExplorerAddressBar;
XPExplorerHeader.NavItem = XPExplorerNavItem;

export default XPExplorerHeader;
