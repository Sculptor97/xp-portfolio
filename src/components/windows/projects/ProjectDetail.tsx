import React, { useEffect } from 'react';
import { useProject } from '@/services/portfolioQueries';
import ImageGallery from 'react-image-gallery';
import {
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Github,
} from 'lucide-react';
import type { ProjectDetailProps } from './types';

const ProjectDetail: React.FC<ProjectDetailProps> = ({
  projectId,
  onLoadingChange,
}) => {
  const { data: project, isLoading, error } = useProject(projectId);

  // Notify parent about loading state changes
  useEffect(() => {
    onLoadingChange?.(isLoading);
  }, [isLoading, onLoadingChange]);

  if (isLoading) {
    return (
      <div className="h-full overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Header Skeleton */}
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3"></div>
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"
                ></div>
              ))}
            </div>
          </div>

          {/* Image Skeleton */}
          <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>

          {/* Content Skeleton */}
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full overflow-y-auto">
        <div className="p-6 text-center">
          <div className="text-red-600 dark:text-red-400 mb-4">
            <AlertTriangle className="w-12 h-12 mx-auto mb-2" />
            <p className="text-lg font-semibold">Failed to load project</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Please try again later
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="h-full overflow-y-auto">
        <div className="p-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">Project not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Project Header */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {project.title}
          </h1>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links and Status */}
          <div className="flex flex-wrap gap-4 items-center">
            {project.deployedLink && project.isDeployed && (
              <a
                href={project.deployedLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                View Live Demo
              </a>
            )}

            {project.githubLink && project.isPublicRepo && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors"
              >
                <Github className="w-4 h-4" />
                View Source Code
              </a>
            )}

            {/* Status Indicators */}
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              {project.isDeployed && (
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Deployed
                </span>
              )}
              {project.isPublicRepo && (
                <span className="flex items-center gap-1">
                  <Github className="w-4 h-4" />
                  Public Repository
                </span>
              )}
              <span>
                Created: {new Date(project.created).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Project Image */}
        {project.img && (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            <img
              src={project.img}
              alt={project.title}
              className="w-full max-h-96 object-contain"
            />
          </div>
        )}

        {/* Project Content */}
        <div className="space-y-6">
          {/* Description */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Description
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {project.description}
            </p>
          </section>

          {/* Challenge */}
          {project.challenge && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Challenge
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {project.challenge}
              </p>
            </section>
          )}

          {/* Solution */}
          {project.solution && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Solution
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {project.solution}
              </p>
            </section>
          )}

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Key Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed pt-1">
                        {feature}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Image Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Gallery
              </h2>
              <div className="md:h-[500px] h-auto bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <ImageGallery
                  items={project.gallery.map((image, index) => ({
                    original: image,
                    thumbnail: image,
                    originalAlt: `${project.title} - Screenshot ${index + 1}`,
                    thumbnailAlt: `${project.title} - Screenshot ${index + 1}`,
                  }))}
                  showThumbnails={true}
                  showFullscreenButton={false}
                  showPlayButton={false}
                  showBullets={false}
                  showNav={true}
                  autoPlay={false}
                  slideInterval={3000}
                  slideDuration={450}
                  thumbnailPosition="bottom"
                  useBrowserFullscreen={false}
                />
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
