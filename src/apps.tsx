import React from 'react';
import AboutMeContent from './pages/about';
import MyProjectsContent from './pages/projects';
import ContactContent from './pages/contact';

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
  ABOUT_ME: 'about-me',
  MY_PROJECTS: 'my-projects',
  CONTACT: 'contact',
  MY_RESUME: 'my-resume',
} as const;

// Export an array of app definitions
export const apps: App[] = [
  {
    id: 'about-me',
    title: 'About Me',
    icon: '/assets/Tour_XP.png',
    component: AboutMeContent,
    width: 500,
    height: 700,
    isShortcut: true,
  },
  {
    id: 'my-resume',
    title: 'My Resume',
    icon: '/assets/pdf.svg',
    component: AboutMeContent, // You can create a separate resume component
    width: 500,
    isShortcut: true,
  },
  {
    id: 'my-projects',
    title: 'My Projects',
    icon: '/assets/IE.png',
    component: MyProjectsContent,
    width: 600,
    isShortcut: true,
  },
  {
    id: 'contact',
    title: 'Contact Me',
    icon: '/assets/outlook_expresss.png',
    component: ContactContent,
    width: 800,
    isShortcut: true,
  },
];
