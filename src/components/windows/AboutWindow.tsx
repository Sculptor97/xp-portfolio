import React from 'react';
import { XPWindow, XPWindowHeader, XPWindowHeaderNavItem, XPWindowBody } from '@/components/window';
import XPIcon from '@/components/XPIcon';
import { usePortfolio } from '@/services/portfolioQueries';
import { useAppContext } from '@/hooks/useAppManager';
import { APP_IDS } from '@/apps';
import SocialLinksSection from './about/SocialLinksSection';
import SkillsSection from './about/SkillsSection';
import AboutMeSection from './about/AboutMeSection';
import ServicesSection from './about/ServicesSection';
import WorkTimelineSection from './about/WorkTimelineSection';

interface AboutWindowProps {
  id?: string;
  title?: string;
  icon?: string;
  width?: number;
  height?: number;
  onSocialLinkClick?: (
    url: string,
    platform: string,
    onConfirm: () => void
  ) => void;
}

const AboutWindow: React.FC<AboutWindowProps> = ({
  id = 'about-me',
  title = 'About Me',
  icon = '/assets/Tour_XP.png',
  width = 800,
  height = 700,
  onSocialLinkClick,
}) => {
  const { data: portfolio, isLoading, error } = usePortfolio();
  const { openApp } = useAppContext();

  const handleOpenProjects = () => {
    openApp(APP_IDS.MY_PROJECTS);
  };

  const handleOpenResume = () => {
    openApp(APP_IDS.MY_RESUME);
  };

  return (
    <XPWindow
      title={title}
      icon={<XPIcon src={icon} alt="About" className="w-5 h-5" />}
      id={id}
      width={width}
      height={height}
    >
      <XPWindowHeader icon={icon} address={title} loading={isLoading}>
        <XPWindowHeaderNavItem
          icon="/assets/IE.webp"
          label="My Projects"
          onClick={handleOpenProjects}
          variant="primary"
          disabled={isLoading}
        />
        <XPWindowHeaderNavItem
          icon="/assets/pdf.webp"
          label="My Resume"
          onClick={handleOpenResume}
          variant="secondary"
          disabled={isLoading}
        />
      </XPWindowHeader>

      <XPWindowBody>
        {error ? (
          <div className="p-4 flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-red-600 mb-2">Failed to load portfolio data</p>
              <p className="text-gray-600 text-sm">Please try again later</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row h-full">
            {/* Sidebar - hidden on mobile */}
            <aside className="hidden md:block md:w-64 p-4 bg-gradient-to-b from-[#B3C6DD] to-[#425ADC] border-r border-gray-200 overflow-y-auto">
              <SocialLinksSection
                socialProfiles={portfolio?.socialprofils || {}}
                isLoading={isLoading}
                onSocialLinkClick={onSocialLinkClick || (() => {})}
              />
              <SkillsSection
                skills={portfolio?.skills || []}
                isLoading={isLoading}
              />
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-[#B3C6DD] to-[#425ADC]">
              <AboutMeSection
                dataAbout={portfolio?.dataabout || { title: '', aboutme: '' }}
                isLoading={isLoading}
              />
              <ServicesSection
                services={portfolio?.services || []}
                isLoading={isLoading}
              />
              <WorkTimelineSection
                workTimeline={portfolio?.worktimeline || []}
                isLoading={isLoading}
              />
            </main>
          </div>
        )}
      </XPWindowBody>
    </XPWindow>
  );
};

export default AboutWindow;
