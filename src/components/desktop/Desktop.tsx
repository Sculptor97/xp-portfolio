import React, { useState } from 'react';
import { apps, type App } from '../../apps';
import Shortcut from '@/components/desktop/Shortcut';
import XPWindow from '@/components/window/XPWindow';
import XPIcon from '../XPIcon';

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
        className="desktop absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-700 bg-cover bg-center flex flex-col gap-4 p-4 md:p-6 overflow-hidden"
        style={{
          backgroundImage: 'url(/assets/bliss_wallpaper.png)',
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
            icon={<XPIcon src={app.icon} alt={app.title} />}
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
