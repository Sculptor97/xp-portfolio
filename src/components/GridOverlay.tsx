// src/components/GridOverlay.tsx
import { useEffect, useState } from 'react';

export default function GridOverlay() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Return null if on root route
  if (pathname === '/') {
    return null;
  }

  return <div id="xp-grid-overlay"></div>;
}
