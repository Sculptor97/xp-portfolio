import type { Project } from '@/lib/api/types/portfolio';

export type ViewType = 'list' | 'detail';

export interface ViewState {
  type: ViewType;
  projectId?: string;
}

export interface ProjectsListProps {
  onProjectClick: (projectId: string) => void;
  onLoadingChange?: (isLoading: boolean) => void;
  onSocialLinkClick?: (
    url: string,
    platform: string,
    onConfirm: () => void
  ) => void;
}

export interface ProjectDetailProps {
  projectId: string;
  onLoadingChange?: (isLoading: boolean) => void;
}

export interface ProjectCardProps {
  project: Project;
  onClick: (projectId: string) => void;
}
