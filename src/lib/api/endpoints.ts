export const endpoints = {
  portfolio: '/portfolio/portfolio',
  projects: '/portfolio/projects',
  projectID: (id: string) => `/portfolio/projects/${id}`,
  skills: '/portfolio/skills',
  services: '/portfolio/services',
  contactConfig: '/portfolio/contact',
  socialProfiles: '/portfolio/social',
  intro: '/portfolio/intro',
  unsplash: 'https://api.unsplash.com/photos/random',
};
