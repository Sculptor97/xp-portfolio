import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import type { UnsplashImage } from '@/lib/api/types/unsplash';

interface ImageGalleryProps {
  images: UnsplashImage[];
  isLoading: boolean;
  error: Error | null;
}

const ImageGalleryComponent: React.FC<ImageGalleryProps> = ({
  images,
  isLoading,
  error,
}) => {
  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-500">
        <div className="text-center">
          <p className="text-lg font-semibold">Failed to load images</p>
          <p className="text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className=" relative flex h-full w-full items-center justify-center">
        <div className="text-center absolute inset-0 flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading beautiful images...</p>
        </div>
      </div>
    );
  }

  // Transform Unsplash images to react-image-gallery format
  const galleryItems = images.map(image => ({
    original: image.urls.full,
    thumbnail: image.urls.small,
    originalAlt: image.alt_description || image.description || 'Unsplash image',
    thumbnailAlt:
      image.alt_description || image.description || 'Unsplash image',
    description: `${image.user.name}${image.description ? ` - ${image.description}` : ''}`,
  }));

  return (
    <div className="h-full w-full bg-black">
      <ImageGallery
        items={galleryItems}
        showThumbnails={true}
        showFullscreenButton={false}
        showPlayButton={false}
        showBullets={false}
        showNav={true}
        autoPlay={false}
        slideInterval={3000}
        slideDuration={450}
        thumbnailPosition="bottom"
        useBrowserFullscreen={false}
      />
    </div>
  );
};

export default ImageGalleryComponent;
