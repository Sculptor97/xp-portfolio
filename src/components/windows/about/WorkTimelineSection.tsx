import React from 'react';
import type { WorkTimelineItem } from '@/lib/api/types/portfolio';

interface WorkTimelineSectionProps {
  workTimeline: WorkTimelineItem[];
  isLoading?: boolean;
}

const WorkTimelineSection: React.FC<WorkTimelineSectionProps> = ({
  workTimeline,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <section className="mb-8">
        <div className="h-8 bg-gray-300 rounded animate-pulse mb-6"></div>
        <div className="space-y-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex gap-4">
              <div className="w-4 h-4 bg-gray-300 rounded-full animate-pulse flex-shrink-0 mt-1"></div>
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-gray-200 rounded animate-pulse w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (workTimeline.length === 0) {
    return null;
  }

  return (
    <section className="mb-8">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-6">
        Work Timeline
      </h2>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-blue-300"></div>

        <div className="space-y-6">
          {workTimeline.map((item, index) => (
            <div key={index} className="relative flex gap-4">
              {/* Timeline dot */}
              <div className="relative z-10 w-4 h-4 bg-blue-600 rounded-full flex-shrink-0 mt-1 border-2 border-white shadow-sm"></div>

              {/* Content */}
              <div className="flex-1 pb-6">
                <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-4 shadow-sm">
                  <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-800 mb-1">
                    {item.jobtitle}
                  </h3>
                  <p className="text-blue-600 font-medium mb-2 text-sm md:text-base lg:text-lg">
                    {item.where}
                  </p>
                  <p className="text-xs md:text-sm text-gray-600">
                    {item.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkTimelineSection;
