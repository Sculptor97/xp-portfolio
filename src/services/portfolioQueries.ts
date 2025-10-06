import { useQuery, useQueryClient } from '@tanstack/react-query';
import { portfolioService } from './portfolioService';

// Query keys for consistent cache management
export const portfolioKeys = {
  all: ['portfolio'] as const,
  portfolio: () => [...portfolioKeys.all, 'data'] as const,
  projects: () => [...portfolioKeys.all, 'projects'] as const,
  project: (id: string) => [...portfolioKeys.projects(), id] as const,
  skills: () => [...portfolioKeys.all, 'skills'] as const,
  services: () => [...portfolioKeys.all, 'services'] as const,
  workTimeline: () => [...portfolioKeys.all, 'workTimeline'] as const,
  contactConfig: () => [...portfolioKeys.all, 'contactConfig'] as const,
  socialProfiles: () => [...portfolioKeys.all, 'socialProfiles'] as const,
  intro: () => [...portfolioKeys.all, 'intro'] as const,
};

/**
 * Hook to fetch the complete portfolio data
 */
export const usePortfolio = () => {
  return useQuery({
    queryKey: portfolioKeys.portfolio(),
    queryFn: portfolioService.getPortfolio,
    staleTime: 10 * 60 * 1000, // 10 minutes - portfolio data doesn't change often
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

/**
 * Hook to fetch only the projects from portfolio data
 */
export const useProjects = () => {
  return useQuery({
    queryKey: portfolioKeys.projects(),
    queryFn: portfolioService.getProjects,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

/**
 * Hook to fetch a specific project by ID
 */
export const useProject = (projectId: string) => {
  return useQuery({
    queryKey: portfolioKeys.project(projectId),
    queryFn: () => portfolioService.getProject(projectId),
    enabled: !!projectId,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

/**
 * Hook to fetch skills from portfolio data
 */
export const useSkills = () => {
  return useQuery({
    queryKey: portfolioKeys.skills(),
    queryFn: portfolioService.getSkills,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

/**
 * Hook to fetch services from portfolio data
 */
export const useServices = () => {
  return useQuery({
    queryKey: portfolioKeys.services(),
    queryFn: portfolioService.getServices,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

/**
 * Hook to fetch work timeline from portfolio data
 * Note: This still uses the full portfolio endpoint as there's no dedicated work timeline endpoint
 */
export const useWorkTimeline = () => {
  return useQuery({
    queryKey: portfolioKeys.workTimeline(),
    queryFn: async () => {
      const portfolio = await portfolioService.getPortfolio();
      return portfolio.worktimeline;
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

/**
 * Hook to fetch contact configuration from portfolio data
 */
export const useContactConfig = () => {
  return useQuery({
    queryKey: portfolioKeys.contactConfig(),
    queryFn: portfolioService.getContactConfig,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

/**
 * Hook to fetch social profiles from portfolio data
 */
export const useSocialProfiles = () => {
  return useQuery({
    queryKey: portfolioKeys.socialProfiles(),
    queryFn: portfolioService.getSocialProfiles,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

/**
 * Hook to fetch intro data from portfolio data
 */
export const useIntroData = () => {
  return useQuery({
    queryKey: portfolioKeys.intro(),
    queryFn: portfolioService.getIntro,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

/**
 * Hook to fetch about data from portfolio data
 * Note: This still uses the full portfolio endpoint as there's no dedicated about endpoint
 */
export const useAboutData = () => {
  return useQuery({
    queryKey: [...portfolioKeys.all, 'aboutData'],
    queryFn: async () => {
      const portfolio = await portfolioService.getPortfolio();
      return portfolio.dataabout;
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

/**
 * Hook to fetch meta data from portfolio data
 * Note: This still uses the full portfolio endpoint as there's no dedicated meta endpoint
 */
export const useMetaData = () => {
  return useQuery({
    queryKey: [...portfolioKeys.all, 'metaData'],
    queryFn: async () => {
      const portfolio = await portfolioService.getPortfolio();
      return portfolio.meta;
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

/**
 * Hook to fetch logo text from portfolio data
 * Note: This still uses the full portfolio endpoint as there's no dedicated logo endpoint
 */
export const useLogoText = () => {
  return useQuery({
    queryKey: [...portfolioKeys.all, 'logoText'],
    queryFn: async () => {
      const portfolio = await portfolioService.getPortfolio();
      return portfolio.logotext;
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

/**
 * Utility hook to invalidate all portfolio queries
 * Useful for refreshing data after updates
 */
export const useInvalidatePortfolio = () => {
  const queryClient = useQueryClient();

  return {
    invalidateAll: () =>
      queryClient.invalidateQueries({ queryKey: portfolioKeys.all }),
    invalidatePortfolio: () =>
      queryClient.invalidateQueries({ queryKey: portfolioKeys.portfolio() }),
    invalidateProjects: () =>
      queryClient.invalidateQueries({ queryKey: portfolioKeys.projects() }),
    invalidateSkills: () =>
      queryClient.invalidateQueries({ queryKey: portfolioKeys.skills() }),
    invalidateServices: () =>
      queryClient.invalidateQueries({ queryKey: portfolioKeys.services() }),
  };
};

/**
 * Utility hook to prefetch portfolio data
 * Useful for preloading data before navigation
 */
export const usePrefetchPortfolio = () => {
  const queryClient = useQueryClient();

  return {
    prefetchPortfolio: () =>
      queryClient.prefetchQuery({
        queryKey: portfolioKeys.portfolio(),
        queryFn: portfolioService.getPortfolio,
        staleTime: 10 * 60 * 1000,
      }),
    prefetchProjects: () =>
      queryClient.prefetchQuery({
        queryKey: portfolioKeys.projects(),
        queryFn: portfolioService.getProjects,
        staleTime: 10 * 60 * 1000,
      }),
    prefetchSkills: () =>
      queryClient.prefetchQuery({
        queryKey: portfolioKeys.skills(),
        queryFn: portfolioService.getSkills,
        staleTime: 10 * 60 * 1000,
      }),
    prefetchServices: () =>
      queryClient.prefetchQuery({
        queryKey: portfolioKeys.services(),
        queryFn: portfolioService.getServices,
        staleTime: 10 * 60 * 1000,
      }),
    prefetchContactConfig: () =>
      queryClient.prefetchQuery({
        queryKey: portfolioKeys.contactConfig(),
        queryFn: portfolioService.getContactConfig,
        staleTime: 10 * 60 * 1000,
      }),
    prefetchSocialProfiles: () =>
      queryClient.prefetchQuery({
        queryKey: portfolioKeys.socialProfiles(),
        queryFn: portfolioService.getSocialProfiles,
        staleTime: 10 * 60 * 1000,
      }),
    prefetchIntro: () =>
      queryClient.prefetchQuery({
        queryKey: portfolioKeys.intro(),
        queryFn: portfolioService.getIntro,
        staleTime: 10 * 60 * 1000,
      }),
  };
};
