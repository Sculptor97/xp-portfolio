import React from 'react';
import {
  XPWindow,
  XPWindowHeader,
  XPWindowHeaderNavItem,
  XPWindowBody,
} from '@/components/window';
import XPIcon from '@/components/XPIcon';
import ImageGallery from '@/components/ImageGallery';
import { useUnsplashImages } from '@/services/portfolioQueries';

interface ImageViewerWindowProps {
  id?: string;
  title?: string;
  icon?: string;
  width?: number;
  height?: number;
}

const ImageViewerWindow: React.FC<ImageViewerWindowProps> = ({
  id = 'image-viewer',
  title = 'Image Viewer',
  icon = '/assets/picture_viewer.png',
  width = 900,
  height = 700,
}) => {
  const { data: images, isLoading, error, refetch } = useUnsplashImages(12);

  const handleRefresh = () => {
    refetch();
  };

  return (
    <XPWindow
      title={title}
      icon={<XPIcon src={icon} alt="Image Viewer" className="w-5 h-5" />}
      id={id}
      width={width}
      height={height}
    >
      <XPWindowHeader icon={icon} address={title} loading={isLoading}>
        <XPWindowHeaderNavItem
          icon="/assets/restart.svg"
          label="Refresh"
          onClick={handleRefresh}
          variant="primary"
          disabled={isLoading}
        />
        <XPWindowHeaderNavItem
          icon="/assets/new.webp"
          label="New Gallery"
          onClick={handleRefresh}
          variant="secondary"
          disabled={isLoading}
        />
      </XPWindowHeader>

      <XPWindowBody>
        <ImageGallery
          images={images || []}
          isLoading={isLoading}
          error={error}
        />
      </XPWindowBody>
    </XPWindow>
  );
};

export default ImageViewerWindow;
