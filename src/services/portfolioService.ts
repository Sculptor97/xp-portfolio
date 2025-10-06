import ApiRequest from '@/lib/api/axiosClient';
import { endpoints } from '@/lib/api/endpoints';
import type {
  PortfolioResponse,
  Project,
  Skill,
  Service,
  ContactConfig,
  SocialProfiles,
  IntroData,
} from '@/lib/api/types/portfolio';

export const portfolioService = {
  getPortfolio: async () => {
    const response = await ApiRequest<PortfolioResponse>({
      url: endpoints.portfolio,
      method: 'GET',
    });
    return response.data;
  },

  getProjects: async () => {
    const response = await ApiRequest<Project[]>({
      url: endpoints.projects,
      method: 'GET',
    });
    return response.data;
  },

  getProject: async (id: string) => {
    const response = await ApiRequest<Project>({
      url: endpoints.projectID(id),
      method: 'GET',
    });
    return response.data;
  },

  getSkills: async () => {
    const response = await ApiRequest<Skill[]>({
      url: endpoints.skills,
      method: 'GET',
    });
    return response.data;
  },

  getServices: async () => {
    const response = await ApiRequest<Service[]>({
      url: endpoints.services,
      method: 'GET',
    });
    return response.data;
  },

  getContactConfig: async () => {
    const response = await ApiRequest<ContactConfig>({
      url: endpoints.contactConfig,
      method: 'GET',
    });
    return response.data;
  },

  getSocialProfiles: async () => {
    const response = await ApiRequest<SocialProfiles>({
      url: endpoints.socialProfiles,
      method: 'GET',
    });
    return response.data;
  },

  getIntro: async () => {
    const response = await ApiRequest<IntroData>({
      url: endpoints.intro,
      method: 'GET',
    });
    return response.data;
  },
};
