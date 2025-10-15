import React from 'react';
import { apps } from '../../apps';
import Shortcut from '@/components/desktop/Shortcut';
import { useAppContext } from '../../hooks/useAppManager';

const Desktop: React.FC = () => {
  const { openWindows, openApp } = useAppContext();

  // Filter apps to only show shortcuts
  const shortcutApps = apps.filter(app => app.isShortcut);

  return (
    <>
      <div
        className="desktop absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-700 bg-cover bg-center flex flex-col gap-4 p-4 md:p-6 overflow-hidden"
        style={{
          backgroundImage: 'url(/assets/bliss_wallpaper.jpg)',
        }}
      >
        {shortcutApps.map(app => (
          <Shortcut
            key={app.id}
            icon={app.icon}
            title={app.title}
            onDoubleClick={() => openApp(app.id)}
          />
        ))}
      </div>

      {/* Render open windows */}
      {openWindows.map(app => {
        const AppComponent = app.component;
        return <AppComponent key={app.id} {...app} />;
      })}
    </>
  );
};

export default Desktop;
