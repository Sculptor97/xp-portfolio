// Component for displaying text with typewriter animation

import React, { useEffect } from 'react';
import { useTypewriter } from './useTypewriter';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  skipAnimation?: boolean;
  onComplete?: () => void;
  className?: string;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 100,
  skipAnimation = false,
  onComplete,
  className = '',
}) => {
  const { displayedText, isAnimating, skip } = useTypewriter(text, {
    speed,
    skipAnimation,
    onComplete,
  });

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && isAnimating) {
      skip();
    }
  };

  useEffect(() => {
    if (isAnimating) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isAnimating]);

  return (
    <span className={className}>
      {displayedText}
      {isAnimating && <span className="animate-pulse text-green-400">|</span>}
    </span>
  );
};

export default TypewriterText;
