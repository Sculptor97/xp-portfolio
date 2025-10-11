import React, { useState, useEffect, useCallback } from 'react';
import Masonry from 'react-masonry-css';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { UnsplashImage } from '@/lib/api/types/unsplash';

interface ImageGalleryProps {
  images: UnsplashImage[];
  isLoading: boolean;
  error: Error | null;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  isLoading,
  error,
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!lightboxOpen) return;

      switch (event.key) {
        case 'Escape':
          setLightboxOpen(false);
          break;
        case 'ArrowLeft':
          if (lightboxIndex > 0) {
            setLightboxIndex(lightboxIndex - 1);
          }
          break;
        case 'ArrowRight':
          if (lightboxIndex < images.length - 1) {
            setLightboxIndex(lightboxIndex + 1);
          }
          break;
      }
    },
    [lightboxOpen, lightboxIndex, images.length]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

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
      <div className="p-4">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex -ml-4 w-auto"
          columnClassName="pl-4 bg-clip-padding"
        >
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="mb-4 bg-gray-200 animate-pulse rounded-lg"
              style={{
                height: Math.random() * 200 + 150,
                width: '100%',
              }}
            />
          ))}
        </Masonry>
      </div>
    );
  }

  const lightboxSlides = images.map(image => ({
    src: image.urls.full,
    alt: image.alt_description || image.description || 'Unsplash image',
    width: image.width,
    height: image.height,
  }));

  return (
    <div className="p-4 relative bg-black h-full w-full">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex -ml-4 w-auto"
        columnClassName="pl-4 bg-clip-padding"
      >
        {images.map((image, index) => (
          <div
            key={image.id}
            className="mb-4 cursor-pointer group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            onClick={() => handleImageClick(index)}
          >
            <img
              src={image.urls.regular}
              alt={
                image.alt_description || image.description || 'Unsplash image'
              }
              className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gray bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-end">
              <div className="p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm font-medium truncate">
                  {image.user.name}
                </p>
                {image.description && (
                  <p className="text-xs truncate">{image.description}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </Masonry>

      {/* Lightbox contained within the window body */}
      {lightboxOpen && (
        <div className="absolute inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 rounded-lg">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Close button */}
            <div
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
            >
              <X size={20} />
            </div>

            {/* Main image */}
            <img
              src={lightboxSlides[lightboxIndex].src}
              alt={lightboxSlides[lightboxIndex].alt}
              className="max-w-full max-h-full object-contain"
            />

            {/* Image info */}
            <div className="absolute bottom-4 left-4 right-4 text-white bg-black bg-opacity-50 rounded p-2">
              <p className="text-sm font-medium">
                {images[lightboxIndex]?.user.name}
              </p>
              {images[lightboxIndex]?.description && (
                <p className="text-xs opacity-80">
                  {images[lightboxIndex].description}
                </p>
              )}
            </div>

            {/* Navigation arrows */}
            {lightboxIndex > 0 && (
              <div
                onClick={() => setLightboxIndex(lightboxIndex - 1)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
              >
                <ChevronLeft size={24} />
              </div>
            )}
            {lightboxIndex < images.length - 1 && (
              <div
                onClick={() => setLightboxIndex(lightboxIndex + 1)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
              >
                <ChevronRight size={24} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
