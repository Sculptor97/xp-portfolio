import React, { useState } from 'react';
import { apps, type App } from '../../apps';
import Shortcut from '@/components/desktop/Shortcut';
import XPWindow from '@/components/window/XPWindow';

const Desktop: React.FC = () => {
  const [openWindows, setOpenWindows] = useState<App[]>([]);

  const openWindow = (app: App) => {
    // Check if window is already open
    if (!openWindows.find(w => w.id === app.id)) {
      setOpenWindows(prev => [...prev, app]);
    }
  };

 
  return (
    <>
      <div
        className="desktop"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: '28px', // Leave space for taskbar
          background: 'linear-gradient(135deg, #0078d4 0%, #106ebe 100%)',
          backgroundImage: 'url(/src/assets/bliss_wallpaper.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
          gridAutoRows: 'minmax(80px, auto)',
          gap: '10px',
          padding: '20px',
          overflow: 'hidden',
        }}
      >
        {apps.map(app => (
          <Shortcut
            key={app.id}
            icon={app.icon}
            title={app.title}
            onDoubleClick={() => openWindow(app)}
          />
        ))}
      </div>

      {/* Render open windows */}
      {openWindows.map(app => {
        const AppComponent = app.component;
        return (
          <XPWindow
            key={app.id}
            title={app.title}
            width={app.width || 500}
            icon={<span>{app.icon}</span>}
            id={app.id}
          >
            <AppComponent />
          </XPWindow>
        );
      })}
    </>
  );
};

export default Desktop;
