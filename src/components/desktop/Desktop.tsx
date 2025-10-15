import React from 'react';
import { apps, APP_IDS } from '../../apps';
import Shortcut from '@/components/desktop/Shortcut';
import { useAppContext } from '../../hooks/useAppManager';
import { useConfirmationDialog } from '../../hooks/useConfirmationDialog';
import ConfirmationDialog from '../ConfirmationDialog';

const Desktop: React.FC = () => {
  const { openWindows, openApp } = useAppContext();
  const { dialogState, hideDialog, showLinkConfirmation } =
    useConfirmationDialog();

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
        // Pass showLinkConfirmation to About Me app
        const appProps =
          app.id === APP_IDS.ABOUT_ME
            ? { ...app, onSocialLinkClick: showLinkConfirmation }
            : app;
        return <AppComponent key={app.id} {...appProps} />;
      })}

      {/* Social Link Confirmation Dialog - rendered at top level so it's always available */}
      <ConfirmationDialog
        isOpen={dialogState.isOpen}
        onClose={hideDialog}
        onConfirm={dialogState.onConfirm || (() => {})}
        onCancel={dialogState.onCancel}
        title={dialogState.title}
        message={dialogState.message}
        confirmText={dialogState.confirmText}
        cancelText={dialogState.cancelText}
        icon={dialogState.icon}
        iconAlt={dialogState.iconAlt}
      />
    </>
  );
};

export default Desktop;
