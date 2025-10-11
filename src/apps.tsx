import React from 'react';
import AboutMeContent from './pages/about';
import MyProjectsContent from './pages/projects';
import ContactContent from './pages/contact';
import PlaceholderApp from './components/windows/PlaceholderApp';
import ImageViewerWindow from './components/windows/ImageViewerWindow';
import CmdWindow from './components/windows/CmdWindow';

// Define the app interface
export interface App {
  id: string;
  title: string;
  icon: string;
  component: React.ComponentType<any>;
  width?: number;
  height?: number;
  isShortcut?: boolean; // Whether to show as desktop shortcut
  isDesktopOnly?: boolean; // Whether app requires desktop environment
  // Additional props that can be passed to the component
  [key: string]: any;
}

// App ID constants for type safety
export const APP_IDS = {
  // Portfolio Apps
  ABOUT_ME: 'about-me',
  MY_PROJECTS: 'my-projects',
  CONTACT: 'contact',
  MY_RESUME: 'my-resume',

  // System Apps
  IMAGE_VIEWER: 'image-viewer',
  MEDIA_PLAYER: 'media-player',
  PAINT: 'paint',
  MUSIC_PLAYER: 'music-player',
  CMD: 'cmd',
  TASK_MANAGER: 'task-manager',
  SYSTEM_INFO: 'system-info',

  // Creative Apps
  AFTER_EFFECTS: 'after-effects',
  ILLUSTRATOR: 'illustrator',
  INDESIGN: 'indesign',
  PHOTOSHOP: 'photoshop',
  PREMIERE: 'premiere',
  BLENDER: 'blender',
  DAVINCI: 'davinci',
  FIGMA: 'figma',
  OBS: 'obs',

  // Development Apps
  VSCODE: 'vscode',
  GITHUB_COPILOT: 'github-copilot',
  WORDPRESS: 'wordpress',
} as const;

// Export an array of app definitions
export const apps: App[] = [
  // Portfolio Apps
  {
    id: APP_IDS.ABOUT_ME,
    title: 'About Me',
    icon: '/assets/Tour_XP.png',
    component: AboutMeContent,
    width: 500,
    height: 600,
    isShortcut: true,
  },
  {
    id: APP_IDS.MY_PROJECTS,
    title: 'My Projects',
    icon: '/assets/IE.png',
    component: MyProjectsContent,
    width: 600,
    isShortcut: true,
  },
  {
    id: APP_IDS.CONTACT,
    title: 'Contact Me',
    icon: '/assets/outlook_expresss.png',
    component: ContactContent,
    width: 800,
    isShortcut: true,
  },
  {
    id: APP_IDS.MY_RESUME,
    title: 'My Resume',
    icon: '/assets/pdf.svg',
    component: PlaceholderApp,
    width: 500,
    isShortcut: true,
  },

  // System Apps
  {
    id: APP_IDS.IMAGE_VIEWER,
    title: 'Image Viewer',
    icon: '/assets/picture_viewer.png',
    component: ImageViewerWindow,
    width: 800,
    height: 600,
  },
  {
    id: APP_IDS.MEDIA_PLAYER,
    title: 'Media Player',
    icon: '/assets/WMP.png',
    component: () => (
      <PlaceholderApp
        title="Media Player"
        description="Play your favorite videos and music"
        icon="/assets/WMP.png"
      />
    ),
    width: 800,
    height: 600,
    isDesktopOnly: true,
  },
  {
    id: APP_IDS.PAINT,
    title: 'Paint',
    icon: '/assets/Paint.png',
    component: () => (
      <PlaceholderApp
        title="Paint"
        description="Create and edit images"
        icon="/assets/Paint.png"
      />
    ),
    width: 800,
    height: 600,
    isDesktopOnly: true,
  },
  {
    id: APP_IDS.MUSIC_PLAYER,
    title: 'Music Player',
    icon: '/assets/mp3_player.png',
    component: () => (
      <PlaceholderApp
        title="Music Player"
        description="Play your music collection"
        icon="/assets/mp3_player.png"
      />
    ),
    width: 400,
    height: 300,
    isDesktopOnly: true,
  },
  {
    id: APP_IDS.CMD,
    title: 'Command Prompt',
    icon: '/assets/cmd.webp',
    component: CmdWindow,
    width: 800,
    height: 600,
    isDesktopOnly: true,
    isShortcut: true,
  },
  {
    id: APP_IDS.TASK_MANAGER,
    title: 'Task Manager',
    icon: '/assets/task_manager.png',
    component: () => (
      <PlaceholderApp
        title="Task Manager"
        description="Monitor system performance and processes"
        icon="/assets/task_manager.png"
      />
    ),
    width: 700,
    height: 500,
    isDesktopOnly: true,
  },
  {
    id: APP_IDS.SYSTEM_INFO,
    title: 'System Information',
    icon: '/assets/sysInfo.png',
    component: () => (
      <PlaceholderApp
        title="System Information"
        description="View detailed system information"
        icon="/assets/sysInfo.png"
      />
    ),
    width: 600,
    height: 500,
    isDesktopOnly: true,
  },

  // Creative Apps
  // {
  //   id: APP_IDS.AFTER_EFFECTS,
  //   title: 'Adobe After Effects',
  //   icon: '/assets/after-effects.webp',
  //   component: () => <PlaceholderApp title="Adobe After Effects" description="Professional motion graphics and visual effects" icon="/assets/after-effects.webp" />,
  //   width: 1200,
  //   height: 800,
  //   isDesktopOnly: true,
  // },
  // {
  //   id: APP_IDS.ILLUSTRATOR,
  //   title: 'Adobe Illustrator',
  //   icon: '/assets/illustrator.webp',
  //   component: () => <PlaceholderApp title="Adobe Illustrator" description="Vector graphics and illustration software" icon="/assets/illustrator.webp" />,
  //   width: 1200,
  //   height: 800,
  //   isDesktopOnly: true,
  // },
  // {
  //   id: APP_IDS.INDESIGN,
  //   title: 'Adobe InDesign',
  //   icon: '/assets/IE.png', // Using IE icon as placeholder since no InDesign icon available
  //   component: () => <PlaceholderApp title="Adobe InDesign" description="Professional page layout and design software" icon="/assets/IE.png" />,
  //   width: 1200,
  //   height: 800,
  //   isDesktopOnly: true,
  // },
  // {
  //   id: APP_IDS.PHOTOSHOP,
  //   title: 'Adobe Photoshop',
  //   icon: '/assets/photoshop.webp',
  //   component: () => <PlaceholderApp title="Adobe Photoshop" description="Professional image editing and manipulation" icon="/assets/photoshop.webp" />,
  //   width: 1200,
  //   height: 800,
  //   isDesktopOnly: true,
  // },
  // {
  //   id: APP_IDS.PREMIERE,
  //   title: 'Adobe Premiere Pro',
  //   icon: '/assets/premiere.webp',
  //   component: () => <PlaceholderApp title="Adobe Premiere Pro" description="Professional video editing software" icon="/assets/premiere.webp" />,
  //   width: 1200,
  //   height: 800,
  //   isDesktopOnly: true,
  // },
  // {
  //   id: APP_IDS.BLENDER,
  //   title: 'Blender',
  //   icon: '/assets/blender.webp',
  //   component: () => <PlaceholderApp title="Blender" description="Free and open-source 3D creation suite" icon="/assets/blender.webp" />,
  //   width: 1200,
  //   height: 800,
  //   isDesktopOnly: true,
  // },
  // {
  //   id: APP_IDS.DAVINCI,
  //   title: 'DaVinci Resolve',
  //   icon: '/assets/davinci.webp',
  //   component: () => <PlaceholderApp title="DaVinci Resolve" description="Professional video editing and color correction" icon="/assets/davinci.webp" />,
  //   width: 1200,
  //   height: 800,
  //   isDesktopOnly: true,
  // },
  // {
  //   id: APP_IDS.FIGMA,
  //   title: 'Figma',
  //   icon: '/assets/figma.webp',
  //   component: () => <PlaceholderApp title="Figma" description="Collaborative interface design tool" icon="/assets/figma.webp" />,
  //   width: 1000,
  //   height: 700,
  //   isDesktopOnly: true,
  // },
  // {
  //   id: APP_IDS.OBS,
  //   title: 'OBS Studio',
  //   icon: '/assets/obs.webp',
  //   component: () => <PlaceholderApp title="OBS Studio" description="Free and open-source streaming and recording software" icon="/assets/obs.webp" />,
  //   width: 1000,
  //   height: 700,
  //   isDesktopOnly: true,
  // },

  // // Development Apps
  // {
  //   id: APP_IDS.VSCODE,
  //   title: 'Visual Studio Code',
  //   icon: '/assets/vscode.webp',
  //   component: () => <PlaceholderApp title="Visual Studio Code" description="Free source-code editor made by Microsoft" icon="/assets/vscode.webp" />,
  //   width: 1000,
  //   height: 700,
  //   isDesktopOnly: true,
  // },
  // {
  //   id: APP_IDS.GITHUB_COPILOT,
  //   title: 'GitHub Copilot',
  //   icon: '/assets/copilot.webp',
  //   component: () => <PlaceholderApp title="GitHub Copilot" description="AI pair programmer that helps you write code faster" icon="/assets/copilot.webp" />,
  //   width: 800,
  //   height: 600,
  //   isDesktopOnly: true,
  // },
  // {
  //   id: APP_IDS.WORDPRESS,
  //   title: 'WordPress',
  //   icon: '/assets/wordpress.webp',
  //   component: () => <PlaceholderApp title="WordPress" description="Content management system for websites" icon="/assets/wordpress.webp" />,
  //   width: 1000,
  //   height: 700,
  //   isDesktopOnly: true,
  // },
];
