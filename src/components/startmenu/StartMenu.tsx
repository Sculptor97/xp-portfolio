import React from 'react';
import cn from 'classnames';
import UserProfile from './UserProfile';
import StartMenuList from './StartMenuList';
import StartMenuItem from './StartMenuItem';
import StartMenuFooter from './StartMenuFooter';
import './StartMenu.css';

export interface StartMenuProps {
  onClose?: () => void;
  className?: string;
  user?: {
    name: string;
    avatar?: string;
    avatarAlt?: string;
  };
  onLogOff?: () => void;
  onShutDown?: () => void;
  onNavigate?: (path: string) => void;
}

const StartMenu: React.FC<StartMenuProps> = ({
  onClose,
  className,
  user = { name: 'Legha-gha' },
  onLogOff,
  onShutDown,
  onNavigate
}) => {
  const handleNavigation = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    }
    if (onClose) {
      onClose();
    }
  };

  const handleLogOff = () => {
    if (onLogOff) {
      onLogOff();
    }
    if (onClose) {
      onClose();
    }
  };

  const handleShutDown = () => {
    if (onShutDown) {
      onShutDown();
    }
    if (onClose) {
      onClose();
    }
  };

  // Define menu items based on the images
  const leftColumnItems = [
    {
      icon: '/src/assets/IE.png',
      iconAlt: 'My Projects',
      title: 'My Projects',
      subtitle: 'View my work',
      onClick: () => handleNavigation('/projects')
    },
    {
      icon: '/src/assets/outlook_expresss.png',
      iconAlt: 'Contact Me',
      title: 'Contact Me',
      subtitle: 'Send me a message',
      onClick: () => handleNavigation('/contact')
    },
    {
      icon: '/src/assets/profile.gif',
      iconAlt: 'About Me',
      title: 'About Me',
      onClick: () => handleNavigation('/about')
    },
    {
      icon: '/src/assets/picture_viewer.png',
      iconAlt: 'Image Viewer',
      title: 'Image Viewer',
      onClick: () => handleNavigation('/gallery')
    },
    {
      icon: '/src/assets/WMP.png',
      iconAlt: 'Media Player',
      title: 'Media Player',
      onClick: () => handleNavigation('/media')
    },
    {
      icon: '/src/assets/Paint.png',
      iconAlt: 'Paint',
      title: 'Paint',
      onClick: () => handleNavigation('/paint')
    },
    {
      icon: '/src/assets/mp3_player.png',
      iconAlt: 'Music Player',
      title: 'Music Player',
      onClick: () => handleNavigation('/music')
    }
  ];

  const rightColumnItems = [
    {
      icon: '/src/assets/IE.png',
      iconAlt: 'Instagram',
      title: 'Instagram',
      onClick: () => window.open('https://instagram.com', '_blank')
    },
    {
      icon: '/src/assets/IE.png',
      iconAlt: 'Github',
      title: 'Github',
      onClick: () => window.open('https://github.com', '_blank')
    },
    {
      icon: '/src/assets/IE.png',
      iconAlt: 'LinkedIn',
      title: 'LinkedIn',
      onClick: () => window.open('https://linkedin.com', '_blank')
    }
  ];

  const recentlyUsedItems = [
    {
      icon: '/src/assets/IE.png',
      iconAlt: 'Command Prompt',
      title: 'C:\\ Command Prompt',
      onClick: () => handleNavigation('/terminal'),
      disabled: true
    },
    {
      icon: '/src/assets/pdf.svg',
      iconAlt: 'My Resume',
      title: 'My Resume',
      onClick: () => handleNavigation('/resume'),
      disabled: true
    },
    {
      icon: '/src/assets/IE.png',
      iconAlt: 'Adobe After Effects',
      title: 'Ae Adobe After Effects',
      onClick: () => handleNavigation('/after-effects'),
      disabled: true
    },
    {
      icon: '/src/assets/IE.png',
      iconAlt: 'Adobe Illustrator',
      title: 'Ai Adobe Illustrator',
      onClick: () => handleNavigation('/illustrator'),
      disabled: true
    },
    {
      icon: '/src/assets/IE.png',
      iconAlt: 'Adobe InDesign',
      title: 'Id Adobe InDesign',
      onClick: () => handleNavigation('/indesign'),
      disabled: true
    },
    {
      icon: '/src/assets/IE.png',
      iconAlt: 'Adobe Photoshop',
      title: 'Ps Adobe Photoshop',
      onClick: () => handleNavigation('/photoshop'),
      disabled: true
    },
    {
      icon: '/src/assets/IE.png',
      iconAlt: 'Adobe Premiere Pro',
      title: 'Pr Adobe Premiere Pro',
      onClick: () => handleNavigation('/premiere'),
      disabled: true
    },
    {
      icon: '/src/assets/IE.png',
      iconAlt: 'Blender',
      title: 'Blender',
      onClick: () => handleNavigation('/blender'),
      disabled: true
    },
    {
      icon: '/src/assets/IE.png',
      iconAlt: 'DaVinci Resolve',
      title: 'Davinci Resolve',
      onClick: () => handleNavigation('/davinci'),
      disabled: true
    },
    {
      icon: '/src/assets/IE.png',
      iconAlt: 'Figma',
      title: 'Figma',
      onClick: () => handleNavigation('/figma'),
      disabled: true
    },
    {
      icon: '/src/assets/IE.png',
      iconAlt: 'GitHub Copilot',
      title: 'GitHub Copilot',
      onClick: () => handleNavigation('/copilot'),
      disabled: true
    },
    {
      icon: '/src/assets/IE.png',
      iconAlt: 'OBS Studio',
      title: 'OBS Studio',
      onClick: () => handleNavigation('/obs'),
      disabled: true
    },
    {
      icon: '/src/assets/IE.png',
      iconAlt: 'VS Code',
      title: 'VS Code',
      onClick: () => handleNavigation('/vscode'),
      disabled: true
    },
    {
      icon: '/src/assets/IE.png',
      iconAlt: 'WordPress',
      title: 'Wordpress',
      onClick: () => handleNavigation('/wordpress'),
      disabled: true
    }
  ];

  const allProgramsItems = [
    ...leftColumnItems,
    ...rightColumnItems
  ];

  return (
    <div className={cn('start-menu', className)}>
      {/* User Profile Section */}
      <div className="start-menu__header">
        <UserProfile
          name={user.name}
          avatar={user.avatar}
          avatarAlt={user.avatarAlt}
        />
      </div>

      {/* Main Content */}
      <div className="start-menu__content">
        {/* Left Column - Pinned Items */}
        <div className="start-menu__left-column">
          <StartMenuList>
            {leftColumnItems.map((item, index) => (
              <StartMenuItem
                key={index}
                {...item}
              />
            ))}
          </StartMenuList>
          
          {/* All Programs Button */}
          <div style={{ marginTop: '8px' }}>
            <StartMenuItem
              title="All Programs"
              hasSubmenu={true}
              submenuItems={allProgramsItems}
              className="start-menu-item--all-programs"
            />
          </div>
        </div>

        {/* Right Column - Social Links and Recently Used */}
        <div className="start-menu__right-column">
          <StartMenuList>
            {rightColumnItems.map((item, index) => (
              <StartMenuItem
                key={index}
                {...item}
              />
            ))}
          </StartMenuList>
          
          {/* Recently Used */}
          <div style={{ marginTop: '8px' }}>
            <StartMenuItem
              title="Recently Used"
              hasSubmenu={true}
              submenuItems={recentlyUsedItems}
              className="start-menu-item--recently-used"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="start-menu__footer">
        <StartMenuFooter
          onLogOff={handleLogOff}
          onShutDown={handleShutDown}
        />
      </div>
    </div>
  );
};

export default StartMenu;
