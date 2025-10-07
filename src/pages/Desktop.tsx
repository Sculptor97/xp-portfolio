import Desktop from '@/components/desktop/Desktop';
import XPTaskBar from '../components/taskbar/XPTaskbar';

function DesktopPage() {
  return (
    <div className="h-screen w-screen relative overflow-hidden">
      {/* Desktop with shortcuts */}
      <Desktop />

      {/* Taskbar at the bottom */}
      <XPTaskBar className="fixed bottom-0 left-0 right-0 z-50">
        <XPTaskBar.StartMenu onClose={() => {}}>
          <div className="start-menu bg-gray-200 border-2 border-gray-300 p-2 min-w-48">
            <div className="text-sm font-semibold mb-2">Programs</div>
            <div className="space-y-1">
              <div className="hover:bg-blue-100 p-1 cursor-pointer">
                About Me
              </div>
              <div className="hover:bg-blue-100 p-1 cursor-pointer">
                My Projects
              </div>
              <div className="hover:bg-blue-100 p-1 cursor-pointer">
                Contact
              </div>
            </div>
          </div>
        </XPTaskBar.StartMenu>

        <XPTaskBar.SystemTray>
          <div>System Tray Items</div>
        </XPTaskBar.SystemTray>
      </XPTaskBar>
    </div>
  );
}

export default DesktopPage;
