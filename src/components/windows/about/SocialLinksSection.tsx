import React, { useCallback } from 'react';
import { ChevronsDown, ChevronsUp } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import type { SocialProfiles } from '@/lib/api/types/portfolio';
import XPIcon from '@/components/XPIcon';

interface SocialLinksSectionProps {
  socialProfiles: SocialProfiles;
  isLoading?: boolean;
  onSocialLinkClick: (
    url: string,
    platform: string,
    onConfirm: () => void
  ) => void;
}

const SocialLinksSection: React.FC<SocialLinksSectionProps> = ({
  socialProfiles,
  isLoading = false,
  onSocialLinkClick,
}) => {
  const [isOpen, setIsOpen] = React.useState(true);

  const handleSocialLink = useCallback(
    (url: string, platform: string) => {
      onSocialLinkClick(url, platform, () => {
        window.open(url, '_blank');
      });
    },
    [onSocialLinkClick]
  );

  // Same icon mapping as StartMenu
  const iconMap: Record<string, string> = {
    facebook: '/assets/facebook.svg',
    x: '/assets/x_logo.svg',
    twitter: '/assets/x_logo.svg',
    github: '/assets/github.webp',
    linkedin: '/assets/linkedin.webp',
    instagram: '/assets/instagram.webp',
    youtube: '/assets/youtube.webp',
  };

  if (isLoading) {
    return (
      <div className="mb-4">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="p-3 social-links-trigger">
            <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="p-3 space-y-2 bg-gradient-to-b from-white to-gray-50">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="h-8 bg-gray-200 rounded animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const socialEntries = Object.entries(socialProfiles).filter(([, url]) => url);

  if (socialEntries.length === 0) {
    return null;
  }

  return (
    <div className="mb-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
          <CollapsibleTrigger className="collapsible-trigger-custom social-links-trigger">
            <span className="font-medium text-sm text-gray-800">
              Social Links
            </span>
            {isOpen ? (
              <ChevronsUp className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronsDown className="w-4 h-4 text-gray-600" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-3 space-y-1 bg-gradient-to-b from-white to-gray-50">
              {socialEntries.map(([platform, url]) => {
                const icon =
                  iconMap[platform.toLowerCase()] || '/assets/cmd.webp';
                return (
                  <div
                    key={platform}
                    role="button"
                    className="flex items-center gap-3 p-2 hover:bg-blue-50 cursor-pointer rounded transition-colors"
                    onClick={() => handleSocialLink(url!, platform)}
                  >
                    <XPIcon
                      src={icon}
                      alt={platform}
                      className="w-5 h-5 flex-shrink-0"
                    />
                    <span className="text-sm capitalize text-gray-700">
                      {platform === 'x' ? 'X (Twitter)' : platform}
                    </span>
                  </div>
                );
              })}
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
};

export default SocialLinksSection;
