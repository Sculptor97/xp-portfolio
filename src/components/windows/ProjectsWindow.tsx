import React, { useState } from 'react';
import {
  XPWindow,
  XPWindowHeader,
  XPWindowBody,
  XPWindowFooter,
  XPWindowHeaderNavItem,
} from '@/components/window';
import XPIcon from '@/components/XPIcon';
import ProjectsIframe from './projects/ProjectsIframe';
import type { ViewState } from './projects/types';

interface ProjectsWindowProps {
  id?: string;
  title?: string;
  icon?: string;
  width?: number;
  height?: number;
  onSocialLinkClick?: (
    url: string,
    platform: string,
    onConfirm: () => void
  ) => void;
}

const ProjectsWindow: React.FC<ProjectsWindowProps> = ({
  id = 'my-projects',
  title = 'My Projects',
  icon = '/assets/IE.webp',
  width = 600,
  height = 500,
  onSocialLinkClick,
}) => {
  // Navigation state management
  const [viewStack, setViewStack] = useState<ViewState[]>([{ type: 'list' }]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const currentView = viewStack[currentIndex];

  // Navigation functions
  const navigateToDetail = (projectId: string) => {
    const newView: ViewState = { type: 'detail', projectId };
    const newStack = [...viewStack.slice(0, currentIndex + 1), newView];
    setViewStack(newStack);
    setCurrentIndex(newStack.length - 1);
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goForward = () => {
    if (currentIndex < viewStack.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Address bar logic
  const getAddressForView = (view: ViewState): string => {
    if (view.type === 'detail' && view.projectId) {
      return `My Projects/projects/${view.projectId}`;
    }
    return 'My Projects';
  };

  // Footer messages
  const getFooterMessage = () => {
    if (currentView.type === 'list') {
      return 'Click on a project to view details';
    }
    return 'Viewing project details - use toolbar to go back';
  };

  // Theme toggle function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <XPWindow
      title={title}
      icon={<XPIcon src={icon} alt="Projects" className="w-5 h-5" />}
      id={id}
      width={width}
      height={height}
    >
      <XPWindowHeader
        icon={icon}
        address={getAddressForView(currentView)}
        loading={isLoading}
        onBackClick={goBack}
        onForwardClick={goForward}
        canGoBack={currentIndex > 0}
        canGoForward={currentIndex < viewStack.length - 1}
      >
        {/* Theme Toggle Button */}
        <XPWindowHeaderNavItem
          icon="/assets/views.webp"
          label={isDarkMode ? 'Light' : 'Dark'}
          onClick={toggleTheme}
          variant="secondary"
        />
      </XPWindowHeader>

      <XPWindowBody>
        <ProjectsIframe
          currentView={currentView}
          onProjectClick={navigateToDetail}
          isDarkMode={isDarkMode}
          onLoadingChange={setIsLoading}
          onSocialLinkClick={onSocialLinkClick}
        />
      </XPWindowBody>

      <XPWindowFooter>
        <div className="text-xs md:text-sm font-medium px-4">
          {getFooterMessage()}
        </div>
      </XPWindowFooter>
    </XPWindow>
  );
};

export default ProjectsWindow;
