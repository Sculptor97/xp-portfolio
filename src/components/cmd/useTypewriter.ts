// Custom hook for typewriter animation effect

import { useState, useEffect, useCallback } from 'react';
import type { TypewriterOptions } from './types';

export const useTypewriter = (
  text: string,
  options: TypewriterOptions = {}
) => {
  const { speed = 50, skipAnimation = false, onComplete } = options;
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = useCallback(() => {
    if (skipAnimation) {
      setDisplayedText(text);
      setIsComplete(true);
      setIsAnimating(false);
      onComplete?.();
      return;
    }

    setIsAnimating(true);
    setIsComplete(false);
    setDisplayedText('');

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
        setIsAnimating(false);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, skipAnimation, onComplete]);

  const skip = useCallback(() => {
    setDisplayedText(text);
    setIsComplete(true);
    setIsAnimating(false);
    onComplete?.();
  }, [text, onComplete]);

  useEffect(() => {
    if (text) {
      startAnimation();
    }
  }, [text, startAnimation]);

  return {
    displayedText,
    isComplete,
    isAnimating,
    skip,
    startAnimation,
  };
};
