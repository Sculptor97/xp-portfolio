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
  onNavigate,
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
      icon: '/assets/IE.png',
      iconAlt: 'My Projects',
      title: 'My Projects',
      subtitle: 'View my work',
      onClick: () => handleNavigation('/projects'),
    },
    {
      icon: '/assets/outlook_expresss.png',
      iconAlt: 'Contact Me',
      title: 'Contact Me',
      subtitle: 'Send me a message',
      onClick: () => handleNavigation('/contact'),
    },
    {
      icon: '/assets/profile.gif',
      iconAlt: 'About Me',
      title: 'About Me',
      onClick: () => handleNavigation('/about'),
    },
    {
      icon: '/assets/picture_viewer.png',
      iconAlt: 'Image Viewer',
      title: 'Image Viewer',
      onClick: () => handleNavigation('/gallery'),
    },
    {
      icon: '/assets/WMP.png',
      iconAlt: 'Media Player',
      title: 'Media Player',
      onClick: () => handleNavigation('/media'),
    },
    {
      icon: '/assets/Paint.png',
      iconAlt: 'Paint',
      title: 'Paint',
      onClick: () => handleNavigation('/paint'),
    },
    {
      icon: '/assets/mp3_player.png',
      iconAlt: 'Music Player',
      title: 'Music Player',
      onClick: () => handleNavigation('/music'),
    },
  ];

  const rightColumnItems = [
    {
      icon: '/assets/instagram.webp',
      iconAlt: 'Instagram',
      title: 'Instagram',
      onClick: () => window.open('https://instagram.com', '_blank'),
    },
    {
      icon: '/assets/github.webp',
      iconAlt: 'Github',
      title: 'Github',
      onClick: () => window.open('https://github.com', '_blank'),
    },
    {
      icon: '/assets/linkedin.webp',
      iconAlt: 'LinkedIn',
      title: 'LinkedIn',
      onClick: () => window.open('https://linkedin.com', '_blank'),
    },
    {
      icon: '/assets/cmd.webp',
      iconAlt: 'CMD',
      title: 'CMD',
      onClick: () => console.log('CMD'),
    },
  ];

  const recentlyUsedItems = [
    {
      icon: '/assets/cmd.webp',
      iconAlt: 'Command Prompt',
      title: 'C:\\ Command Prompt',
      onClick: () => handleNavigation('/terminal'),
      disabled: true,
    },
    {
      icon: '/assets/pdf.svg',
      iconAlt: 'My Resume',
      title: 'My Resume',
      onClick: () => handleNavigation('/resume'),
      disabled: true,
    },
    {
      icon: '/assets/after-effects.webp',
      iconAlt: 'Adobe After Effects',
      title: 'Ae Adobe After Effects',
      onClick: () => handleNavigation('/after-effects'),
      disabled: true,
    },
    {
      icon: '/assets/illustrator.webp',
      iconAlt: 'Adobe Illustrator',
      title: 'Ai Adobe Illustrator',
      onClick: () => handleNavigation('/illustrator'),
      disabled: true,
    },
    {
      icon: '/assets/IE.png',
      iconAlt: 'Adobe InDesign',
      title: 'Id Adobe InDesign',
      onClick: () => handleNavigation('/indesign'),
      disabled: true,
    },
    {
      icon: '/assets/photoshop.webp',
      iconAlt: 'Adobe Photoshop',
      title: 'Ps Adobe Photoshop',
      onClick: () => handleNavigation('/photoshop'),
      disabled: true,
    },
    {
      icon: '/assets/premiere.webp',
      iconAlt: 'Adobe Premiere Pro',
      title: 'Pr Adobe Premiere Pro',
      onClick: () => handleNavigation('/premiere'),
      disabled: true,
    },
    {
      icon: '/assets/blender.webp',
      iconAlt: 'Blender',
      title: 'Blender',
      onClick: () => handleNavigation('/blender'),
      disabled: true,
    },
    {
      icon: '/assets/davinci.webp',
      iconAlt: 'DaVinci Resolve',
      title: 'Davinci Resolve',
      onClick: () => handleNavigation('/davinci'),
      disabled: true,
    },
    {
      icon: '/assets/figma.webp',
      iconAlt: 'Figma',
      title: 'Figma',
      onClick: () => handleNavigation('/figma'),
      disabled: true,
    },
    {
      icon: '/assets/copilot.webp',
      iconAlt: 'GitHub Copilot',
      title: 'GitHub Copilot',
      onClick: () => handleNavigation('/copilot'),
      disabled: true,
    },
    {
      icon: '/assets/obs.webp',
      iconAlt: 'OBS Studio',
      title: 'OBS Studio',
      onClick: () => handleNavigation('/obs'),
      disabled: true,
    },
    {
      icon: '/assets/vscode.webp',
      iconAlt: 'VS Code',
      title: 'VS Code',
      onClick: () => handleNavigation('/vscode'),
      disabled: true,
    },
    {
      icon: '/assets/wordpress.webp',
      iconAlt: 'WordPress',
      title: 'Wordpress',
      onClick: () => handleNavigation('/wordpress'),
      disabled: true,
    },
  ];

  const allProgramsItems = [...leftColumnItems, ...rightColumnItems];

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
              <StartMenuItem key={index} {...item} />
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
              <StartMenuItem key={index} {...item} />
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
        <StartMenuFooter onLogOff={handleLogOff} onShutDown={handleShutDown} />
      </div>
    </div>
  );
};

export default StartMenu;
