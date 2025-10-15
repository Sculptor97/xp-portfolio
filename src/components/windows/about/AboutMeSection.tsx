import React from 'react';
import type { DataAbout } from '@/lib/api/types/portfolio';

interface AboutMeSectionProps {
  dataAbout: DataAbout;
  isLoading?: boolean;
}

const AboutMeSection: React.FC<AboutMeSectionProps> = ({
  dataAbout,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <section className="mb-8">
        <div className="h-8 bg-gray-300 rounded animate-pulse mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
        {dataAbout.title}
      </h2>
      <div className="prose prose-sm max-w-none">
        <p className="text-black text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed whitespace-pre-line">
          {dataAbout.aboutme}
        </p>
      </div>
    </section>
  );
};

export default AboutMeSection;
