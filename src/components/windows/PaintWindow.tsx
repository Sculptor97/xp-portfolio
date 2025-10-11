import React, { useRef, useState, useCallback } from 'react';
import {
  XPWindow,
  XPWindowHeader,
  XPWindowHeaderNavItem,
  XPWindowBody,
} from '@/components/window';
import XPIcon from '@/components/XPIcon';

interface PaintWindowProps {
  id?: string;
  title?: string;
  icon?: string;
  width?: number;
  height?: number;
}

const PaintWindow: React.FC<PaintWindowProps> = ({
  id = 'paint',
  title = 'Paint',
  icon = '/assets/Paint.png',
  width = 900,
  height = 600,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const newCanvas = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    setIsLoading(true);
    const currentSrc = iframe.src;
    iframe.src = currentSrc;
  }, []);

  return (
    <XPWindow
      title={title}
      icon={<XPIcon src={icon} alt="Paint" className="w-5 h-5" />}
      id={id}
      width={width}
      height={height}
    >
      <XPWindowHeader icon={icon} address={title} loading={isLoading}>
        <XPWindowHeaderNavItem
          icon="/assets/new.webp"
          label="New"
          onClick={newCanvas}
          variant="primary"
          disabled={isLoading}
        />
      </XPWindowHeader>

      <XPWindowBody>
        <div className="w-full h-full bg-white">
          <iframe
            ref={iframeRef}
            src="https://jspaint.app/"
            width="100%"
            height="100%"
            frameBorder="0"
            title="Paint Application"
            className="w-full h-full"
            style={{ minHeight: '500px' }}
            onLoad={handleIframeLoad}
          />
        </div>
      </XPWindowBody>
    </XPWindow>
  );
};

export default PaintWindow;
