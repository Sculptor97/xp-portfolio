import React from 'react';
import {
  XPWindow,
  XPWindowHeader,
  XPWindowHeaderNavItem,
  XPWindowBody,
} from '@/components/window';
import XPIcon from '@/components/XPIcon';
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from 'react-zoom-pan-pinch';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

// Controls Component
const ZoomControls: React.FC = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <div className="absolute top-2 left-2 z-10 flex gap-2">
      <div
        onClick={() => zoomIn()}
        role="button"
        className="flex items-center gap-1 md:px-3 md:py-1 px-2 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors shadow-md cursor-pointer"
        title="Zoom In"
      >
        <ZoomIn size={16} />
        <span className="hidden md:inline">Zoom In</span>
      </div>
      <div
        onClick={() => zoomOut()}
        role="button"
        className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors shadow-md cursor-pointer"
        title="Zoom Out"
      >
        <ZoomOut size={16} />
        <span className="hidden md:inline">Zoom Out</span>
      </div>
      <div
        onClick={() => resetTransform()}
        role="button"
        className="flex items-center gap-1 px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 transition-colors shadow-md cursor-pointer"
        title="Reset Zoom"
      >
        <RotateCcw size={16} />
        <span className="hidden md:inline">Reset</span>
      </div>
    </div>
  );
};

interface ResumeWindowProps {
  id?: string;
  title?: string;
  icon?: string;
  width?: number;
  height?: number;
}

const ResumeWindow: React.FC<ResumeWindowProps> = ({
  id = 'my-resume',
  title = 'My Resume',
  icon = '/assets/pdf.webp',
  width = 800,
  height = 600,
}) => {
  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = 'src/assets/Legha-gha_Resume.pdf';
    link.download = 'Legha-gha_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <XPWindow
      title={title}
      icon={<XPIcon src={icon} alt="Resume" className="w-5 h-5" />}
      id={id}
      width={width}
      height={height}
    >
      <XPWindowHeader icon={icon} address={title}>
        <XPWindowHeaderNavItem
          icon="/assets/send.webp"
          label="Save PDF"
          onClick={handleDownloadPDF}
          variant="primary"
        />
      </XPWindowHeader>

      <XPWindowBody>
        <div className="relative w-full h-full">
          <TransformWrapper
            initialScale={1}
            maxScale={3}
            centerOnInit={true}
            centerZoomedOut={true}
            limitToBounds={false}
            wheel={{ step: 0.1 }}
            pinch={{ step: 5 }}
          >
            <ZoomControls />
            <TransformComponent
              wrapperClass="w-full h-full"
              contentClass="w-full h-full flex items-center justify-center"
            >
              <img
                src="src/assets/Legha-gha_Resume.webp"
                alt="Resume"
                className="max-w-full max-h-full object-contain"
                style={{ width: 'auto', height: 'auto' }}
              />
            </TransformComponent>
          </TransformWrapper>
        </div>
      </XPWindowBody>
    </XPWindow>
  );
};

export default ResumeWindow;
