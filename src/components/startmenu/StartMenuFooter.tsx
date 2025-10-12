import React from 'react';
import cn from 'classnames';
import XPIcon from '../XPIcon';

export interface StartMenuFooterProps {
  onLogOff?: () => void;
  onShutDown?: () => void;
  className?: string;
}

const StartMenuFooter: React.FC<StartMenuFooterProps> = ({
  onLogOff,
  onShutDown,
  className,
}) => {
  return (
    <div className={cn('start-menu-footer', className)}>
      <div
        className="start-menu-footer__button start-menu-footer__button--logoff"
        onClick={onLogOff}
      >
        <XPIcon src="/assets/Logout.webp" alt="Log Off" className="w-5 h-5" />
        <span>Log Off</span>
      </div>

      <div
        className="start-menu-footer__button start-menu-footer__button--shutdown"
        onClick={onShutDown}
      >
        <XPIcon src="/assets/Power.webp" alt="Shut Down" className="w-5 h-5" />
        <span>Shut Down</span>
      </div>
    </div>
  );
};

export default StartMenuFooter;
