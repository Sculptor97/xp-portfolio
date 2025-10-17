import React, { useEffect } from 'react';
import { useProject } from '@/services/portfolioQueries';
import ImageGalleryComponent from '@/components/ImageGallery';
import { CheckCircle2 } from 'lucide-react';
import type { ProjectDetailProps } from './types';
import type { UnsplashImage } from '@/lib/api/types/unsplash';

const ProjectDetail: React.FC<ProjectDetailProps> = ({
  projectId,
  onLoadingChange,
}) => {
  const { data: project, isLoading, error } = useProject(projectId);

  // Transform project gallery images to UnsplashImage format
  const transformProjectImages = (
    images: string[],
    projectTitle: string
  ): UnsplashImage[] => {
    return images.map((image, index) => ({
      id: `project-${projectId}-${index}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      width: 1920,
      height: 1080,
      color: '#000000',
      blur_hash: 'L00000fQfQfQfQfQfQfQfQfQfQfQ',
      description: `${projectTitle} - Screenshot ${index + 1}`,
      alt_description: `${projectTitle} screenshot ${index + 1}`,
      urls: {
        raw: image,
        full: image,
        regular: image,
        small: image,
        thumb: image,
        small_s3: image,
      },
      links: {
        self: '#',
        html: '#',
        download: image,
        download_location: '#',
      },
      user: {
        id: 'project-gallery',
        updated_at: new Date().toISOString(),
        username: 'project-gallery',
        name: 'Project Gallery',
        first_name: 'Project',
        last_name: 'Gallery',
        twitter_username: null,
        portfolio_url: null,
        bio: null,
        location: null,
        links: {
          self: '#',
          html: '#',
          photos: '#',
          likes: '#',
          portfolio: '#',
          following: '#',
          followers: '#',
        },
        profile_image: {
          small: image,
          medium: image,
          large: image,
        },
        instagram_username: null,
        total_collections: 0,
        total_likes: 0,
        total_photos: images.length,
        accepted_tos: true,
        for_hire: false,
        social: {
          instagram_username: null,
          portfolio_url: null,
          twitter_username: null,
          paypal_email: null,
        },
      },
      exif: {
        make: null,
        model: null,
        name: null,
        exposure_time: null,
        aperture: null,
        focal_length: null,
        iso: null,
      },
      location: {
        name: null,
        city: null,
        country: null,
        position: {
          latitude: null,
          longitude: null,
        },
      },
      views: 0,
      downloads: 0,
      likes: 0,
    }));
  };

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
            <svg
              className="w-12 h-12 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
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
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
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
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
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
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
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
              <div className="h-96 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <ImageGalleryComponent
                  images={transformProjectImages(
                    project.gallery,
                    project.title
                  )}
                  isLoading={false}
                  error={null}
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
