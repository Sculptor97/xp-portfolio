import React from 'react';
import AboutMeContent from './pages/about';
import MyProjectsContent from './pages/projects';
import ContactContent from './pages/contact';

// Define the app interface
export interface App {
  id: string;
  title: string;
  icon: string;
  component: React.ComponentType;
  defaultPosition?: { x: number; y: number };
  width?: number;
}

// Export an array of app definitions
export const apps: App[] = [
  {
    id: 'about-me',
    title: 'About Me',
    icon: '👤',
    component: AboutMeContent,
    defaultPosition: { x: 100, y: 100 },
    width: 500,
  },
  {
    id: 'my-projects',
    title: 'My Projects',
    icon: '📁',
    component: MyProjectsContent,
    defaultPosition: { x: 200, y: 150 },
    width: 600,
  },
  {
    id: 'contact',
    title: 'Contact',
    icon: '📧',
    component: ContactContent,
    defaultPosition: { x: 300, y: 200 },
    width: 400,
  },
];
