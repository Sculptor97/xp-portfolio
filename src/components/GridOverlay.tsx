// src/components/GridOverlay.tsx
import { useEffect } from 'react';

export default function GridOverlay() {
  useEffect(() => {
    const overlay = document.getElementById('xp-grid-overlay');

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      if (overlay) {
        overlay.style.backgroundPosition = `${x}px ${y}px`;
      }
    };

    const handleScroll = () => {
      const scrollY = window.scrollY * 0.2;
      if (overlay) {
        overlay.style.backgroundPositionY = `${scrollY}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <div id="xp-grid-overlay"></div>;
}
