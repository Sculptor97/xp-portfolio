import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import type { Skill } from '@/lib/api/types/portfolio';

interface SkillsSectionProps {
  skills: Skill[];
  isLoading?: boolean;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  isLoading = false,
}) => {
  const [isOpen, setIsOpen] = React.useState(true);

  if (isLoading) {
    return (
      <div className="mb-4">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="p-3 skills-trigger">
            <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="p-3 space-y-2 bg-gradient-to-b from-white to-gray-50">
            {[1, 2, 3, 4, 5].map(i => (
              <div
                key={i}
                className="h-6 bg-gray-200 rounded animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (skills.length === 0) {
    return null;
  }

  return (
    <div className="mb-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="bg-white shadow-sm overflow-hidden">
          <CollapsibleTrigger className="collapsible-trigger-custom skills-trigger border-b border-gray-200">
            <span className="font-medium text-sm text-gray-800">Skills</span>
            {isOpen ? (
              <ChevronUp className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-3 space-y-3 bg-gradient-to-b from-transparent to-gray-50">
              {skills.map(skill => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      {skill.name}
                    </span>
                    <span className="text-xs text-gray-600 font-medium">
                      {skill.value}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-transparent to-[#B3C6DD] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${skill.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
};

export default SkillsSection;
