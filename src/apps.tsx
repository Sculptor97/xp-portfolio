import React from 'react';
import AboutMeContent from './pages/about';
import MyProjectsContent from './pages/projects';
import ContactContent from './pages/contact';
import ExplorerDemo from './pages/ExplorerDemo';

// Define the app interface
export interface App {
  id: string;
  title: string;
  icon: string;
  component: React.ComponentType;
  width?: number;
  height?: number;
}

// Export an array of app definitions
export const apps: App[] = [
  {
    id: 'about-me',
    title: 'About Me',
    icon: '/assets/Tour_XP.png',
    component: AboutMeContent,
    width: 500,
    height: 700,
  },
  {
    id: 'my-resume',
    title: 'My Resume',
    icon: '/assets/pdf.svg',
    component: AboutMeContent, // You can create a separate resume component
    width: 500,
  },
  {
    id: 'my-projects',
    title: 'My Projects',
    icon: '/assets/IE.png',
    component: MyProjectsContent,
    width: 600,
  },
  {
    id: 'contact',
    title: 'Contact Me',
    icon: '/assets/outlook_expresss.png',
    component: ContactContent,
    width: 800,
  },
  {
    id: 'explorer-demo',
    title: 'Explorer Demo',
    icon: '/assets/arrow.webp',
    component: ExplorerDemo,
    width: 700,
  },
];
