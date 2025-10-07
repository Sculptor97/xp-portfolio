import React from 'react';
import cn from 'classnames';

interface ShortcutProps {
  icon: string;
  title: string;
  onDoubleClick: () => void;
  className?: string;
}

const Shortcut: React.FC<ShortcutProps> = ({
  icon,
  title,
  onDoubleClick,
  className,
}) => {
  return (
    <div
      className={cn(
        'desktop-shortcut',
        'flex flex-col items-center',
        'text-white cursor-pointer',
        'p-2 rounded',
        'hover:bg-blue-600 hover:bg-opacity-20',
        'transition-colors duration-200',
        'select-none',
        className
      )}
      onDoubleClick={onDoubleClick}
      title={title}
    >
      <div
        className="text-4xl mb-1"
        style={{
          textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
          filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.5))',
        }}
      >
        {icon}
      </div>
      <div
        className="text-xs text-center max-w-16 break-words"
        style={{
          textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
          lineHeight: '1.2',
        }}
      >
        {title}
      </div>
    </div>
  );
};

export default Shortcut;
