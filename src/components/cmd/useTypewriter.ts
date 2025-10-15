// Custom hook for typewriter animation effect

import { useState, useEffect, useCallback, useRef } from 'react';
import type { TypewriterOptions } from './types';

export const useTypewriter = (
  text: string,
  options: TypewriterOptions = {}
) => {
  const { speed = 50, skipAnimation = false, onComplete } = options;
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const onCompleteRef = useRef(onComplete);

  // Update the ref when onComplete changes, but don't restart animation
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const startAnimation = useCallback(() => {
    if (skipAnimation) {
      setDisplayedText(text);
      setIsComplete(true);
      setIsAnimating(false);
      onCompleteRef.current?.();
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
        onCompleteRef.current?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, skipAnimation]);

  const skip = useCallback(() => {
    setDisplayedText(text);
    setIsComplete(true);
    setIsAnimating(false);
    onCompleteRef.current?.();
  }, [text]);

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
