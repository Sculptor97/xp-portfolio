import { useMemo } from 'react';
import type {
  Project,
  Skill,
  Service,
  WorkTimelineItem,
} from '@/lib/api/types/portfolio';

/**
 * Utility functions for filtering and sorting portfolio data
 */

export interface ProjectFilters {
  technologies?: string[];
  isDeployed?: boolean;
  isPublicRepo?: boolean;
  searchTerm?: string;
}

export interface ProjectSortOptions {
  field: 'title' | 'created' | 'technologies';
  direction: 'asc' | 'desc';
}

/**
 * Hook to filter and sort projects
 */
export const useFilteredProjects = (
  projects: Project[] | undefined,
  filters: ProjectFilters = {},
  sortOptions: ProjectSortOptions = { field: 'created', direction: 'desc' }
) => {
  return useMemo(() => {
    if (!projects) return [];

    let filtered = [...projects];

    // Apply filters
    if (filters.technologies && filters.technologies.length > 0) {
      filtered = filtered.filter(project =>
        filters.technologies!.some(tech =>
          project.technologies.some(projectTech =>
            projectTech.toLowerCase().includes(tech.toLowerCase())
          )
        )
      );
    }

    if (filters.isDeployed !== undefined) {
      filtered = filtered.filter(
        project => project.isDeployed === filters.isDeployed
      );
    }

    if (filters.isPublicRepo !== undefined) {
      filtered = filtered.filter(
        project => project.isPublicRepo === filters.isPublicRepo
      );
    }

    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        project =>
          project.title.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower) ||
          project.shortDescription.toLowerCase().includes(searchLower) ||
          project.technologies.some(tech =>
            tech.toLowerCase().includes(searchLower)
          )
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortOptions.field) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'created':
          aValue = new Date(a.created).getTime();
          bValue = new Date(b.created).getTime();
          break;
        case 'technologies':
          aValue = a.technologies.length;
          bValue = b.technologies.length;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortOptions.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOptions.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [projects, filters, sortOptions]);
};

/**
 * Hook to get projects grouped by technology
 */
export const useProjectsByTechnology = (projects: Project[] | undefined) => {
  return useMemo(() => {
    if (!projects) return {};

    const grouped: Record<string, Project[]> = {};

    projects.forEach(project => {
      project.technologies.forEach(tech => {
        if (!grouped[tech]) {
          grouped[tech] = [];
        }
        grouped[tech].push(project);
      });
    });

    return grouped;
  }, [projects]);
};

/**
 * Hook to get skill statistics
 */
export const useSkillStats = (skills: Skill[] | undefined) => {
  return useMemo(() => {
    if (!skills) return { total: 0, average: 0, max: 0, min: 0 };

    const values = skills.map(skill => skill.value);
    const total = values.length;
    const average = values.reduce((sum, value) => sum + value, 0) / total;
    const max = Math.max(...values);
    const min = Math.min(...values);

    return { total, average, max, min };
  }, [skills]);
};

/**
 * Hook to get projects by deployment status
 */
export const useProjectsByStatus = (projects: Project[] | undefined) => {
  return useMemo(() => {
    if (!projects)
      return { deployed: [], notDeployed: [], public: [], private: [] };

    return {
      deployed: projects.filter(p => p.isDeployed),
      notDeployed: projects.filter(p => !p.isDeployed),
      public: projects.filter(p => p.isPublicRepo),
      private: projects.filter(p => !p.isPublicRepo),
    };
  }, [projects]);
};

/**
 * Hook to get work timeline statistics
 */
export const useWorkTimelineStats = (
  timeline: WorkTimelineItem[] | undefined
) => {
  return useMemo(() => {
    if (!timeline) return { total: 0, companies: [], years: [] };

    const companies = [...new Set(timeline.map(item => item.where))];
    const years = [
      ...new Set(timeline.map(item => new Date(item.date).getFullYear())),
    ].sort();

    return {
      total: timeline.length,
      companies,
      years,
    };
  }, [timeline]);
};

/**
 * Hook to get technology usage statistics
 */
export const useTechnologyStats = (projects: Project[] | undefined) => {
  return useMemo(() => {
    if (!projects) return {};

    const techCount: Record<string, number> = {};

    projects.forEach(project => {
      project.technologies.forEach(tech => {
        techCount[tech] = (techCount[tech] || 0) + 1;
      });
    });

    // Sort by usage count
    const sortedTechs = Object.entries(techCount)
      .sort(([, a], [, b]) => b - a)
      .map(([tech, count]) => ({ tech, count }));

    return {
      totalTechnologies: Object.keys(techCount).length,
      mostUsed: sortedTechs[0]?.tech || null,
      leastUsed: sortedTechs[sortedTechs.length - 1]?.tech || null,
      technologyCounts: techCount,
      sortedTechnologies: sortedTechs,
    };
  }, [projects]);
};

/**
 * Hook to search across all portfolio data
 */
export const usePortfolioSearch = (
  searchTerm: string,
  portfolioData: {
    projects?: Project[];
    skills?: Skill[];
    services?: Service[];
    workTimeline?: WorkTimelineItem[];
  }
) => {
  return useMemo(() => {
    if (!searchTerm.trim())
      return { projects: [], skills: [], services: [], workTimeline: [] };

    const term = searchTerm.toLowerCase();
    const results = {
      projects: [] as Project[],
      skills: [] as Skill[],
      services: [] as Service[],
      workTimeline: [] as WorkTimelineItem[],
    };

    // Search projects
    if (portfolioData.projects) {
      results.projects = portfolioData.projects.filter(
        project =>
          project.title.toLowerCase().includes(term) ||
          project.description.toLowerCase().includes(term) ||
          project.shortDescription.toLowerCase().includes(term) ||
          project.technologies.some(tech => tech.toLowerCase().includes(term))
      );
    }

    // Search skills
    if (portfolioData.skills) {
      results.skills = portfolioData.skills.filter(skill =>
        skill.name.toLowerCase().includes(term)
      );
    }

    // Search services
    if (portfolioData.services) {
      results.services = portfolioData.services.filter(
        service =>
          service.title.toLowerCase().includes(term) ||
          service.description.toLowerCase().includes(term)
      );
    }

    // Search work timeline
    if (portfolioData.workTimeline) {
      results.workTimeline = portfolioData.workTimeline.filter(
        item =>
          item.jobtitle.toLowerCase().includes(term) ||
          item.where.toLowerCase().includes(term)
      );
    }

    return results;
  }, [searchTerm, portfolioData]);
};
