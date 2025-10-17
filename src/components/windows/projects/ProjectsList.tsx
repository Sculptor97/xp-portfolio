import React, { useState, useMemo, useEffect } from 'react';
import { useDebounceValue } from 'usehooks-ts';
import { useProjects, useSocialProfiles } from '@/services/portfolioQueries';
import {
  useFilteredProjects,
  type ProjectFilters,
  type ProjectSortOptions,
} from '@/services/portfolioQueryUtils';
import { Input } from '@/components/ui/input';
import {
  Linkedin,
  Facebook,
  Twitter,
  Github,
  FolderOpen,
  Search,
  AlertTriangle,
  Archive,
} from 'lucide-react';
import type { ProjectsListProps } from './types';
import ProjectCard from './ProjectCard';

const ProjectsList: React.FC<ProjectsListProps> = ({
  onProjectClick,
  onLoadingChange,
  onSocialLinkClick,
}) => {
  const { data: projects, isLoading, error } = useProjects();
  const { data: socialProfiles } = useSocialProfiles();

  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounceValue(searchTerm, 300);

  // Filter state
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    []
  );
  const [deploymentFilter, setDeploymentFilter] = useState<
    'all' | 'deployed' | 'not-deployed'
  >('all');
  const [repoFilter, setRepoFilter] = useState<'all' | 'public' | 'private'>(
    'all'
  );

  // Sort state - using default sort
  const sortOptions: ProjectSortOptions = {
    field: 'created',
    direction: 'desc',
  };

  // Build filters object
  const filters: ProjectFilters = useMemo(
    () => ({
      searchTerm: debouncedSearchTerm,
      technologies:
        selectedTechnologies.length > 0 ? selectedTechnologies : undefined,
      isDeployed:
        deploymentFilter === 'all'
          ? undefined
          : deploymentFilter === 'deployed',
      isPublicRepo: repoFilter === 'all' ? undefined : repoFilter === 'public',
    }),
    [debouncedSearchTerm, selectedTechnologies, deploymentFilter, repoFilter]
  );

  // Get filtered and sorted projects
  const filteredProjects = useFilteredProjects(projects, filters, sortOptions);

  // Get unique technologies for filter
  const uniqueTechnologies = useMemo(() => {
    if (!projects) return [];
    const techs = new Set<string>();
    projects.forEach(project => {
      project.technologies.forEach(tech => techs.add(tech));
    });
    return Array.from(techs).sort();
  }, [projects]);

  const handleTechnologyToggle = (tech: string) => {
    setSelectedTechnologies(prev =>
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTechnologies([]);
    setDeploymentFilter('all');
    setRepoFilter('all');
  };

  // Social links handler
  const handleSocialClick = (url: string | undefined, platform: string) => {
    if (!url) return;
    if (onSocialLinkClick) {
      onSocialLinkClick(url, platform, () => {
        window.open(url, '_blank');
      });
    } else {
      window.open(url, '_blank');
    }
  };

  // Icon mapping
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'facebook':
        return <Facebook className="w-5 h-5" />;
      case 'twitter':
        return <Twitter className="w-5 h-5" />;
      case 'github':
        return <Github className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getSocialColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return 'hover:text-blue-600';
      case 'facebook':
        return 'hover:text-blue-600';
      case 'twitter':
        return 'hover:text-blue-600';
      case 'github':
        return 'hover:text-gray-900 dark:hover:text-white';
      default:
        return 'hover:text-gray-700';
    }
  };

  // Notify parent about loading state changes
  useEffect(() => {
    onLoadingChange?.(isLoading);
  }, [isLoading, onLoadingChange]);

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="text-red-600 dark:text-red-400 mb-4">
          <AlertTriangle className="w-12 h-12 mx-auto mb-2" />
          <p className="text-lg font-semibold">Failed to load projects</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Please try again later
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full">
      {/* Sidebar - fixed height, scrollable */}
      <aside className="hidden md:block w-48 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 overflow-y-auto">
        <div className="p-4 space-y-2">
          {/* Filter buttons */}
          <button
            onClick={() => {
              setDeploymentFilter('all');
              setRepoFilter('all');
            }}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
              deploymentFilter === 'all' && repoFilter === 'all'
                ? 'border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                : 'border-l-4 border-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            All
          </button>

          <button
            onClick={() => setDeploymentFilter('deployed')}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
              deploymentFilter === 'deployed'
                ? 'border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                : 'border-l-4 border-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Deployed
          </button>

          <button
            onClick={() => setDeploymentFilter('not-deployed')}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
              deploymentFilter === 'not-deployed'
                ? 'border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                : 'border-l-4 border-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Not Deployed
          </button>

          <button
            onClick={() => setRepoFilter('public')}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
              repoFilter === 'public'
                ? 'border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                : 'border-l-4 border-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Public Repo
          </button>

          <button
            onClick={() => setRepoFilter('private')}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
              repoFilter === 'private'
                ? 'border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                : 'border-l-4 border-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Private Repo
          </button>

          <button
            onClick={clearFilters}
            className="w-full text-left px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* STICKY HEADER - does not scroll */}
        <div className="flex-shrink-0 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="p-4 md:p-6">
            {/* Title + Social Icons */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <FolderOpen className="w-7 h-7 text-gray-600 dark:text-gray-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  MyProjects
                </h2>
              </div>
              <div className="flex gap-4">
                {socialProfiles &&
                  Object.entries(socialProfiles)
                    .filter(
                      ([platform, url]) =>
                        url &&
                        ['linkedin', 'facebook', 'twitter', 'github'].includes(
                          platform.toLowerCase()
                        )
                    )
                    .map(([platform, url]) => (
                      <button
                        key={platform}
                        onClick={() => handleSocialClick(url, platform)}
                        className={`text-gray-600 dark:text-gray-400 transition-colors ${getSocialColor(platform)}`}
                        aria-label={platform}
                      >
                        {getSocialIcon(platform)}
                      </button>
                    ))}
              </div>
            </div>

            {/* Search Bar */}
            <div className="mb-4 hidden md:block">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10 text-gray-900 dark:text-white"
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Tech Pills - horizontal scroll */}
            <div className="hidden md:flex gap-2 overflow-x-auto pb-2">
              {uniqueTechnologies.slice(0, 8).map(tech => (
                <div
                  key={tech}
                  onClick={() => handleTechnologyToggle(tech)}
                  className={`px-3 py-1 text-sm rounded-full cursor-pointer transition-colors whitespace-nowrap ${
                    selectedTechnologies.includes(tech)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {tech}
                </div>
              ))}
              {uniqueTechnologies.length > 8 && (
                <div className="px-3 py-1 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  +{uniqueTechnologies.length - 8} more
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SCROLLABLE PROJECT GRID */}
        <div className="flex-1 overflow-y-auto pt-0 px-4 pb-4 md:p-6">
          {/* Project count */}
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {isLoading
              ? 'Loading...'
              : `Showing ${filteredProjects.length} of ${projects?.length || 0} projects`}
          </div>

          {/* Project grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-xl mb-3"></div>
                  <div className="flex gap-2">
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <Archive className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No projects found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {searchTerm ||
                selectedTechnologies.length > 0 ||
                deploymentFilter !== 'all' ||
                repoFilter !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'No projects available at the moment'}
              </p>
              {(searchTerm ||
                selectedTechnologies.length > 0 ||
                deploymentFilter !== 'all' ||
                repoFilter !== 'all') && (
                <div
                  onClick={clearFilters}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors cursor-pointer"
                >
                  Clear all filters
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={onProjectClick}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProjectsList;
