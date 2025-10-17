import React, { useRef, useEffect, useState, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProjectsList from './ProjectsList';
import ProjectDetail from './ProjectDetail';
import type { ViewState } from './types';

interface ProjectsIframeProps {
  currentView: ViewState;
  onProjectClick: (projectId: string) => void;
  isDarkMode?: boolean;
  onLoadingChange?: (isLoading: boolean) => void;
  onSocialLinkClick?: (
    url: string,
    platform: string,
    onConfirm: () => void
  ) => void;
}

// Create a separate QueryClient for the iframe to avoid conflicts
const iframeQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

const ProjectsIframeContent: React.FC<ProjectsIframeProps> = ({
  currentView,
  onProjectClick,
  onLoadingChange,
  onSocialLinkClick,
}) => {
  return (
    <QueryClientProvider client={iframeQueryClient}>
      <div className="h-screen bg-white dark:bg-gray-900">
        {currentView.type === 'list' && (
          <ProjectsList
            onProjectClick={onProjectClick}
            onLoadingChange={onLoadingChange}
            onSocialLinkClick={onSocialLinkClick}
          />
        )}
        {currentView.type === 'detail' && currentView.projectId && (
          <ProjectDetail
            projectId={currentView.projectId}
            onLoadingChange={onLoadingChange}
          />
        )}
      </div>
    </QueryClientProvider>
  );
};

const ProjectsIframe: React.FC<ProjectsIframeProps> = ({
  currentView,
  onProjectClick,
  isDarkMode = false,
  onLoadingChange,
  onSocialLinkClick,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const rootRef = useRef<any>(null);
  const isRenderingRef = useRef(false);
  const renderTimeoutRef = useRef<number | null>(null);

  // Safe render function to prevent race conditions
  const renderContent = useCallback(() => {
    if (renderTimeoutRef.current) {
      clearTimeout(renderTimeoutRef.current);
    }

    renderTimeoutRef.current = setTimeout(() => {
      if (isLoaded && rootRef.current && !isRenderingRef.current) {
        const iframe = iframeRef.current;
        if (!iframe) return;

        const iframeDoc =
          iframe.contentDocument || iframe.contentWindow?.document;
        if (!iframeDoc) return;

        const container = iframeDoc.getElementById('root');
        if (container && rootRef.current) {
          try {
            isRenderingRef.current = true;
            rootRef.current.render(
              <ProjectsIframeContent
                currentView={currentView}
                onProjectClick={onProjectClick}
                onLoadingChange={onLoadingChange}
                onSocialLinkClick={onSocialLinkClick}
              />
            );
          } catch (error) {
            console.warn('Error rendering iframe content:', error);
          } finally {
            // Use requestAnimationFrame to ensure render completes before resetting flag
            requestAnimationFrame(() => {
              isRenderingRef.current = false;
            });
          }
        }
      }
    }, 16); // ~60fps
  }, [
    currentView,
    onProjectClick,
    onLoadingChange,
    onSocialLinkClick,
    isLoaded,
  ]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      setIsLoaded(true);

      // Get the iframe's document
      const iframeDoc =
        iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) return;

      // Set dark mode class on iframe body
      if (isDarkMode) {
        iframeDoc.body.classList.add('dark');
      } else {
        iframeDoc.body.classList.remove('dark');
      }

      // Find or create the root container
      let container = iframeDoc.getElementById('root');
      if (!container) {
        container = iframeDoc.createElement('div');
        container.id = 'root';
        iframeDoc.body.appendChild(container);
      }

      // Only create root if it doesn't exist
      if (!rootRef.current) {
        rootRef.current = createRoot(container);
      }

      // Render content using debounced function
      renderContent();
    };

    iframe.addEventListener('load', handleLoad);
    return () => {
      iframe.removeEventListener('load', handleLoad);
    };
  }, [currentView, onProjectClick, isDarkMode, renderContent]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (renderTimeoutRef.current) {
        clearTimeout(renderTimeoutRef.current);
        renderTimeoutRef.current = null;
      }
      if (rootRef.current && !isRenderingRef.current) {
        try {
          rootRef.current.unmount();
        } catch (error) {
          console.warn('Error unmounting iframe root:', error);
        }
        rootRef.current = null;
      }
    };
  }, []);

  // Update content when currentView changes
  useEffect(() => {
    if (isLoaded) {
      renderContent();
    }
  }, [
    currentView,
    onProjectClick,
    isLoaded,
    onLoadingChange,
    onSocialLinkClick,
    renderContent,
  ]);

  // Update dark mode
  useEffect(() => {
    if (isLoaded) {
      const iframe = iframeRef.current;
      if (!iframe) return;

      const iframeDoc =
        iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) return;

      if (isDarkMode) {
        iframeDoc.body.classList.add('dark');
      } else {
        iframeDoc.body.classList.remove('dark');
      }
    }
  }, [isDarkMode, isLoaded]);

  return (
    <iframe
      ref={iframeRef}
      src="/projects-iframe.html"
      className="w-full h-full border-0"
      style={{
        width: '100%',
        height: '100%',
        border: 'none',
        background: 'transparent',
        overflow: 'hidden',
      }}
      title="Projects Content"
    />
  );
};

export default ProjectsIframe;
