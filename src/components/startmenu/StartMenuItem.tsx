import React, { useState, useRef, useEffect } from 'react';
import cn from 'classnames';
import XPIcon from '../XPIcon';
import { Play } from 'lucide-react';
import { Spinner } from '../ui/spinner';

export interface StartMenuItemProps {
  icon?: string;
  iconAlt?: string;
  title: string;
  subtitle?: string;
  onClick?: () => void;
  hasSubmenu?: boolean;
  submenuItems?: StartMenuItemProps[];
  className?: string;
  disabled?: boolean;
  isInSubmenu?: boolean;
  isLoading?: boolean;
}

const StartMenuItem: React.FC<StartMenuItemProps> = ({
  icon,
  iconAlt,
  title,
  subtitle,
  onClick,
  hasSubmenu = false,
  submenuItems = [],
  className,
  disabled = false,
  isInSubmenu = false,
  isLoading = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const submenuRef = useRef<HTMLDivElement>(null);

  // Handle submenu positioning and visibility
  useEffect(() => {
    if (showSubmenu && submenuRef.current && itemRef.current) {
      const itemRect = itemRef.current.getBoundingClientRect();
      const submenu = submenuRef.current;

      // Special positioning for Recently Used - align with left edge of right column on desktop, left edge on mobile
      if (className?.includes('recently-used')) {
        // Check if we're on mobile (viewport width <= 768px)
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
          submenu.style.left = '0px';
          submenu.style.right = 'auto';
        } else {
          // On desktop, position relative to the right column (100% of StartMenu width)
          submenu.style.left = '100%';
          submenu.style.right = 'auto';
        }
        submenu.style.top = 'auto';
        submenu.style.bottom = '0px';
      } else {
        // Default positioning for All Programs and other items
        submenu.style.left = `${itemRect.width}px`;
        submenu.style.right = 'auto';

        if (className?.includes('all-programs')) {
          submenu.style.top = 'auto';
          submenu.style.bottom = '0px';
        } else {
          submenu.style.top = '0px';
          submenu.style.bottom = 'auto';
        }
      }
    }
  }, [showSubmenu, className]);

  const handleMouseEnter = () => {
    if (!disabled) {
      setIsHovered(true);
      if (hasSubmenu && submenuItems.length > 0) {
        setShowSubmenu(true);
      }
    }
  };

  const handleMouseLeave = () => {
    if (!disabled) {
      setIsHovered(false);
      // Delay hiding submenu to allow mouse to move to it
      setTimeout(() => {
        if (
          !submenuRef.current?.matches(':hover') &&
          !itemRef.current?.matches(':hover')
        ) {
          setShowSubmenu(false);
        }
      }, 100);
    }
  };

  const handleSubmenuMouseEnter = () => {
    setShowSubmenu(true);
  };

  const handleSubmenuMouseLeave = () => {
    setShowSubmenu(false);
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <div className="start-menu-item-container" ref={itemRef}>
      <div
        className={cn(
          'start-menu-item',
          {
            'start-menu-item--hovered': isHovered && !disabled,
            'start-menu-item--disabled': disabled,
            'start-menu-item--has-submenu': hasSubmenu,
          },
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <div className="start-menu-item__icon">
          {isLoading ? (
            <Spinner className={isInSubmenu ? 'w-5 h-5' : 'w-8 h-8'} />
          ) : icon ? (
            <XPIcon
              src={icon}
              alt={iconAlt || title}
              className={isInSubmenu ? 'w-5 h-5' : 'w-8 h-8'}
            />
          ) : null}
        </div>

        <div className="start-menu-item__content">
          <div className="start-menu-item__title">{title}</div>
          {subtitle && (
            <div className="start-menu-item__subtitle">{subtitle}</div>
          )}
        </div>

        {hasSubmenu && (
          <div className="start-menu-item__arrow">
            {className?.includes('all-programs') ? (
              <XPIcon
                src="/assets/arrow.webp"
                alt="All Programs"
                className="w-4 h-4"
              />
            ) : className?.includes('recently-used') ? (
              <Play size={16} />
            ) : (
              <Play size={16} />
            )}
          </div>
        )}
      </div>

      {hasSubmenu && submenuItems.length > 0 && showSubmenu && (
        <div
          ref={submenuRef}
          className="start-menu-submenu"
          onMouseEnter={handleSubmenuMouseEnter}
          onMouseLeave={handleSubmenuMouseLeave}
        >
          {submenuItems.map((item, index) => (
            <StartMenuItem
              key={index}
              {...item}
              onClick={item.onClick}
              isInSubmenu={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StartMenuItem;
