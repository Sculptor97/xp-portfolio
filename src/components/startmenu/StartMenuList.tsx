import React from 'react';
import cn from 'classnames';

export interface StartMenuListProps {
  children: React.ReactNode;
  className?: string;
  orientation?: 'vertical' | 'horizontal';
}

const StartMenuList: React.FC<StartMenuListProps> = ({
  children,
  className,
  orientation = 'vertical',
}) => {
  return (
    <div
      className={cn(
        'start-menu-list',
        {
          'start-menu-list--vertical': orientation === 'vertical',
          'start-menu-list--horizontal': orientation === 'horizontal',
        },
        className
      )}
    >
      {children}
    </div>
  );
};

export default StartMenuList;
