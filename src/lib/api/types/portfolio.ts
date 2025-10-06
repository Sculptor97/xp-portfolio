// types/portfolio.ts

/** Root portfolio data structure returned by the API */
export interface PortfolioResponse {
  logotext: string;
  meta: Meta;
  introdata: IntroData;
  dataabout: DataAbout;
  worktimeline: WorkTimelineItem[];
  skills: Skill[];
  services: Service[];
  dataportfolio: Project[];
  contactConfig: ContactConfig;
  socialprofils: SocialProfiles;
}

/** Metadata for the site (title, SEO description) */
export interface Meta {
  title: string;
  description: string;
}

/** Intro section with animated text and image */
export interface IntroData {
  title: string;
  animated: AnimatedText;
  description: string;
  your_img_url: string;
}

export interface AnimatedText {
  first: string;
  second: string;
  third: string;
}

/** About section */
export interface DataAbout {
  title: string;
  aboutme: string;
}

/** Work timeline item (career history) */
export interface WorkTimelineItem {
  jobtitle: string;
  where: string;
  date: string;
}

/** Skill representation (name + proficiency value) */
export interface Skill {
  name: string;
  value: number; // percentage, e.g. 90
}

/** Service offering */
export interface Service {
  title: string;
  description: string;
}

/** Portfolio project */
export interface Project {
  id: string;
  title: string;
  img: string;
  description: string;
  shortDescription: string;
  technologies: string[];
  challenge: string;
  solution: string;
  features: string[];
  deployedLink: string;
  githubLink: string;
  isDeployed: boolean;
  isPublicRepo: boolean;
  created: string; // ISO date string
  gallery: string[];
}

/** Contact configuration (for email and resume links) */
export interface ContactConfig {
  YOUR_EMAIL: string;
  YOUR_FONE: string;
  description: string;
  YOUR_SERVICE_ID: string;
  YOUR_TEMPLATE_ID: string;
  YOUR_USER_ID: string;
  RESUME: string;
}

/** Social profile links */
export interface SocialProfiles {
  github?: string;
  facebook?: string;
  linkedin?: string;
  twitter?: string;
}
