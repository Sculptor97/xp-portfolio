// Main CMD window component - no header, just terminal

import React, { useState } from 'react';
import { XPWindow, XPWindowBody } from '@/components/window';
import { useModal } from '@/components/core/events';
import XPIcon from '@/components/XPIcon';
import Terminal from '@/components/cmd/Terminal';

interface CmdWindowProps {
  id?: string;
  title?: string;
  icon?: string;
  width?: number;
  height?: number;
}

const CmdWindow: React.FC<CmdWindowProps> = ({
  id = 'cmd',
  title = 'Command Prompt - C:\\Portfolio',
  icon = '/assets/cmd.webp',
  width = 800,
  height = 600,
}) => {
  const [windowId] = useState(id);
  const { remove } = useModal();

  const handleExit = () => {
    remove(windowId);
  };

  return (
    <XPWindow
      title={title}
      icon={<XPIcon src={icon} alt="Command Prompt" className="w-5 h-5" />}
      id={id}
      width={width}
      height={height}
    >
      {/* NO XPWindowHeader - goes straight to body for authentic CMD experience */}
      <XPWindowBody className="p-0">
        <Terminal onExit={handleExit} />
      </XPWindowBody>
    </XPWindow>
  );
};

export default CmdWindow;
