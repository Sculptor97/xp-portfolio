import React, { useCallback } from 'react';
import cn from 'classnames';
import UserProfile from './UserProfile';
import StartMenuList from './StartMenuList';
import StartMenuItem from './StartMenuItem';
import StartMenuFooter from './StartMenuFooter';
import ConfirmationDialog from '../ConfirmationDialog';
import LogOffDialog from '../LogOffDialog';
import { useConfirmationDialog } from '../../hooks/useConfirmationDialog';
import { useLogOffDialog } from '../../hooks/useLogOffDialog';
import { useAuth } from '../../hooks/useAuth';
import { useSocialProfiles } from '../../services/portfolioQueries';
import { useAppContext } from '../../hooks/useAppManager';
import { APP_IDS } from '../../apps';
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
}

const StartMenu: React.FC<StartMenuProps> = ({
  onClose,
  className,
  user = { name: 'Legha-gha' },
  onLogOff,
}) => {
  const { dialogState, showLinkConfirmation, hideDialog } =
    useConfirmationDialog();

  const {
    dialogState: logOffDialogState,
    showLogOffDialog,
    showShutdownDialog,
    hideDialog: hideLogOffDialog,
  } = useLogOffDialog();

  const { logout, restart } = useAuth();
  const { data: socialProfiles, isLoading: socialProfilesLoading } =
    useSocialProfiles();
  const {
    openApp,
    showDesktopOnlyAlert,
    desktopOnlyDialogState,
    hideDesktopOnlyDialog,
  } = useAppContext();

  const handleSocialLink = useCallback(
    (url: string, platform: string) => {
      showLinkConfirmation(url, platform, () => {
        window.open(url, '_blank');
      });
    },
    [showLinkConfirmation]
  );

  const handleAppClick = useCallback(
    (appId: string) => {
      openApp(appId);
      if (onClose) {
        onClose();
      }
    },
    [openApp, onClose]
  );

  const handleDesktopOnlyAppClick = useCallback(
    (appId: string) => {
      showDesktopOnlyAlert(appId);
    },
    [showDesktopOnlyAlert]
  );

  const handleLogOff = () => {
    showLogOffDialog(
      () => {
        // Use the restart method from useAuth
        restart();
        if (onClose) {
          onClose();
        }
      },
      () => {
        // Use the logout method from useAuth
        logout();
        if (onLogOff) {
          onLogOff();
        }
        if (onClose) {
          onClose();
        }
      }
    );
  };

  const handleShutDown = () => {
    showShutdownDialog(
      () => {
        // Use the restart method from useAuth
        restart();
        if (onClose) {
          onClose();
        }
      },
      () => {
        // Shutdown functionality - disabled in our app
        console.log('Shutdown requested but disabled');
      }
    );
  };

  // Define menu items based on the images
  const leftColumnItems = [
    {
      icon: '/assets/IE.png',
      iconAlt: 'My Projects',
      title: 'My Projects',
      subtitle: 'View my work',
      onClick: () => handleAppClick(APP_IDS.MY_PROJECTS),
    },
    {
      icon: '/assets/outlook_expresss.png',
      iconAlt: 'Contact Me',
      title: 'Contact Me',
      subtitle: 'Send me a message',
      onClick: () => handleAppClick(APP_IDS.CONTACT),
    },
    {
      icon: '/assets/Tour_XP.png',
      iconAlt: 'About Me',
      title: 'About Me',
      onClick: () => handleAppClick(APP_IDS.ABOUT_ME),
    },
    {
      icon: '/assets/pdf.svg',
      iconAlt: 'My Resume',
      title: 'My Resume',
      subtitle: 'Download my resume',
      onClick: () => handleAppClick(APP_IDS.MY_RESUME),
    },
    {
      icon: '/assets/picture_viewer.png',
      iconAlt: 'Image Viewer',
      title: 'Image Viewer',
      onClick: () => handleDesktopOnlyAppClick(APP_IDS.IMAGE_VIEWER),
    },
    {
      icon: '/assets/WMP.png',
      iconAlt: 'Media Player',
      title: 'Media Player',
      onClick: () => handleDesktopOnlyAppClick(APP_IDS.MEDIA_PLAYER),
    },
    {
      icon: '/assets/Paint.png',
      iconAlt: 'Paint',
      title: 'Paint',
      onClick: () => handleDesktopOnlyAppClick(APP_IDS.PAINT),
    },
    {
      icon: '/assets/mp3_player.png',
      iconAlt: 'Music Player',
      title: 'Music Player',
      onClick: () => handleDesktopOnlyAppClick(APP_IDS.MUSIC_PLAYER),
    },
  ];

  // Create right column items from API data
  const rightColumnItems = React.useMemo(() => {
    const items = [];

    // Show loading state while fetching social profiles
    if (socialProfilesLoading) {
      items.push({
        icon: '', // No icon for loading state
        iconAlt: 'Loading',
        title: 'Loading...',
        onClick: () => {}, // No action during loading
        isLoading: true,
      });
    } else if (socialProfiles) {
      // Map platform names to icons and create items
      const iconMap: Record<string, string> = {
        facebook: '/assets/facebook.svg',
        x: '/assets/x_logo.svg',
        twitter: '/assets/x_logo.svg',
        github: '/assets/github.webp',
        linkedin: '/assets/linkedin.webp',
        instagram: '/assets/instagram.webp',
        youtube: '/assets/youtube.webp',
      };

      // Iterate through social profiles object
      Object.entries(socialProfiles).forEach(([platform, url]) => {
        if (url) {
          // Only add if URL exists
          const icon = iconMap[platform.toLowerCase()] || '/assets/cmd.webp';

          items.push({
            icon,
            iconAlt: platform,
            title: platform.charAt(0).toUpperCase() + platform.slice(1),
            onClick: () => handleSocialLink(url, platform),
          });
        }
      });
    }

    // Add CMD as a fallback/default item (only if not loading)
    if (!socialProfilesLoading) {
      items.push({
        icon: '/assets/cmd.webp',
        iconAlt: 'CMD',
        title: 'CMD',
        onClick: () => console.log('CMD'),
      });
    }

    return items;
  }, [socialProfiles, socialProfilesLoading, handleSocialLink]);

  const recentlyUsedItems = [
    {
      icon: '/assets/cmd.webp',
      iconAlt: 'Command Prompt',
      title: 'C:\\ Command Prompt',
      onClick: () => handleDesktopOnlyAppClick(APP_IDS.CMD),
    },
    {
      icon: '/assets/task_manager.png',
      iconAlt: 'Task Manager',
      title: 'Task Manager',
      onClick: () => handleDesktopOnlyAppClick(APP_IDS.TASK_MANAGER),
    },
    {
      icon: '/assets/sysInfo.png',
      iconAlt: 'System Information',
      title: 'System Information',
      onClick: () => handleDesktopOnlyAppClick(APP_IDS.SYSTEM_INFO),
    },
    {
      icon: '/assets/after-effects.webp',
      iconAlt: 'Adobe After Effects',
      title: 'Ae Adobe After Effects',
      onClick: () => handleDesktopOnlyAppClick(APP_IDS.AFTER_EFFECTS),
    },
    {
      icon: '/assets/illustrator.webp',
      iconAlt: 'Adobe Illustrator',
      title: 'Ai Adobe Illustrator',
      onClick: () => handleDesktopOnlyAppClick(APP_IDS.ILLUSTRATOR),
    },
    {
      icon: '/assets/IE.png',
      iconAlt: 'Adobe InDesign',
      title: 'Id Adobe InDesign',
      onClick: () => handleDesktopOnlyAppClick(APP_IDS.INDESIGN),
    },
    {
      icon: '/assets/photoshop.webp',
      iconAlt: 'Adobe Photoshop',
      title: 'Ps Adobe Photoshop',
      onClick: () => handleDesktopOnlyAppClick(APP_IDS.PHOTOSHOP),
    },
    {
      icon: '/assets/premiere.webp',
      iconAlt: 'Adobe Premiere Pro',
      title: 'Pr Adobe Premiere Pro',
      onClick: () => handleDesktopOnlyAppClick(APP_IDS.PREMIERE),
    },
    {
      icon: '/assets/blender.webp',
      iconAlt: 'Blender',
      title: 'Blender',
      onClick: () => handleDesktopOnlyAppClick(APP_IDS.BLENDER),
    },
    {
      icon: '/assets/davinci.webp',
      iconAlt: 'DaVinci Resolve',
      title: 'Davinci Resolve',
      onClick: () => handleDesktopOnlyAppClick(APP_IDS.DAVINCI),
    },
    {
      icon: '/assets/figma.webp',
      iconAlt: 'Figma',
      title: 'Figma',
      onClick: () => handleDesktopOnlyAppClick(APP_IDS.FIGMA),
    },
    {
      icon: '/assets/copilot.webp',
      iconAlt: 'GitHub Copilot',
      title: 'GitHub Copilot',
      onClick: () => handleDesktopOnlyAppClick(APP_IDS.GITHUB_COPILOT),
    },
    {
      icon: '/assets/obs.webp',
      iconAlt: 'OBS Studio',
      title: 'OBS Studio',
      onClick: () => handleDesktopOnlyAppClick(APP_IDS.OBS),
    },
    {
      icon: '/assets/vscode.webp',
      iconAlt: 'VS Code',
      title: 'VS Code',
      onClick: () => handleDesktopOnlyAppClick(APP_IDS.VSCODE),
    },
    {
      icon: '/assets/wordpress.webp',
      iconAlt: 'WordPress',
      title: 'Wordpress',
      onClick: () => handleDesktopOnlyAppClick(APP_IDS.WORDPRESS),
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

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={dialogState.isOpen}
        onClose={hideDialog}
        onConfirm={dialogState.onConfirm || (() => {})}
        onCancel={dialogState.onCancel}
        title={dialogState.title}
        message={dialogState.message}
        confirmText={dialogState.confirmText}
        cancelText={dialogState.cancelText}
        icon={dialogState.icon}
        iconAlt={dialogState.iconAlt}
      />

      {/* Log Off Dialog */}
      <LogOffDialog
        isOpen={logOffDialogState.isOpen}
        onClose={hideLogOffDialog}
        onRestart={logOffDialogState.onRestart || (() => {})}
        onLogOff={logOffDialogState.onLogOff || (() => {})}
        onShutdown={logOffDialogState.onShutdown}
        type={logOffDialogState.type}
        title={
          logOffDialogState.type === 'logoff'
            ? `Log Off ${user.name} XP`
            : `Shut Down ${user.name} XP`
        }
      />

      {/* Desktop Only Alert Dialog */}
      <ConfirmationDialog
        isOpen={desktopOnlyDialogState.isOpen}
        onClose={hideDesktopOnlyDialog}
        title={desktopOnlyDialogState.title}
        message={desktopOnlyDialogState.message}
        icon={desktopOnlyDialogState.icon}
        singleButton={true}
      />
    </div>
  );
};

export default StartMenu;
