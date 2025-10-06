// Export all portfolio query hooks and utilities
export * from './portfolioQueries';
export * from './portfolioQueryUtils';
export { portfolioService } from './portfolioService';

// Re-export commonly used types for convenience
export type {
  PortfolioResponse,
  Project,
  Skill,
  Service,
  WorkTimelineItem,
  ContactConfig,
  SocialProfiles,
  IntroData,
  DataAbout,
  Meta,
} from '@/lib/api/types/portfolio';
