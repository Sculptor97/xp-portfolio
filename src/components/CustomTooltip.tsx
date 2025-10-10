import React, { useState, useRef, useEffect } from 'react';
import cn from 'classnames';

interface CustomTooltipProps {
  children: React.ReactNode;
  content: string;
  className?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  children,
  content,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const updatePosition = () => {
    if (triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();

      setPosition({
        top: triggerRect.top - 50, // Position above the button
        left: triggerRect.left + triggerRect.width / 2 - 50, // Center horizontally (assuming ~100px tooltip width)
      });
    }
  };

  useEffect(() => {
    if (isVisible) {
      updatePosition();
    }
  }, [isVisible]);

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <div className="relative">
      <div
        ref={triggerRef}
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>

      {isVisible && (
        <div
          ref={tooltipRef}
          className={cn(
            'window-body bg-[#ffffe1]',
            'fixed z-[9999] px-2 py-1 text-xs md:text-sm text-black',
            'border border-gray-400 rounded-b-sm shadow-lg',
            'pointer-events-none whitespace-nowrap'
          )}
          style={{
            top: position.top,
            left: position.left,
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default CustomTooltip;
