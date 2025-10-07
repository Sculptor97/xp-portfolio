import React from 'react';
import cn from 'classnames';
import XPIcon from '../XPIcon';

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
      className={cn('desktop-shortcut', className)}
      onDoubleClick={onDoubleClick}
      title={title}
    >
      <div className="shortcut-icon">
        <XPIcon src={icon} alt={title} className="w-full h-full" />
      </div>
      <div className="shortcut-label">{title}</div>
    </div>
  );
};

export default Shortcut;
