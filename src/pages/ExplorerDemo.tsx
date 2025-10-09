import React, { useState } from 'react';
import {
  XPWindow,
  XPWindowHeader,
  XPWindowHeaderNavItem,
  XPWindowBody,
} from '@/components/window';
import XPIcon from '@/components/XPIcon';
const ExplorerDemo: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('C:\\Documents\\My Portfolio');

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 7000);
  };

  const handleNavigate = (path: string) => {
    setAddress(path);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-white mb-4">
        XP Explorer Header Demo
      </h1>

      {/* Example 1: Basic Usage */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-white">Basic Usage</h2>
        <XPWindow
          title="Basic Usage"
          icon={
            <XPIcon
              src="/assets/vscode.webp"
              alt="VSCode"
              className="w-5 h-5"
            />
          }
          id="basic-usage"
          width={600}
          height={400}
        >
          <XPWindowHeader
            icon="/assets/vscode.webp"
            address={address}
            loading={loading}
          >
            <XPWindowHeaderNavItem
              icon="/assets/arrow.webp"
              label="Refresh"
              onClick={handleRefresh}
              variant="primary"
            />
            <XPWindowHeaderNavItem
              icon="/assets/arrow.webp"
              label="New File"
              onClick={() => console.log('New file clicked')}
            />
          </XPWindowHeader>
          <XPWindowBody>
            <div className="p-4">
              <p className="text-gray-700">
                This is a basic usage example of the XP Window component.
              </p>
            </div>
          </XPWindowBody>
        </XPWindow>
      </div>

      {/* Example 2: File Explorer */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-white">File Explorer</h2>
        <XPWindow
          title="File Explorer"
          icon={
            <XPIcon
              src="/assets/arrow.webp"
              alt="Explorer"
              className="w-5 h-5"
            />
          }
          id="file-explorer"
          width={600}
          height={400}
        >
          <XPWindowHeader icon="/assets/arrow.webp" address="C:\\Documents">
            <XPWindowHeaderNavItem
              icon="/assets/arrow.webp"
              label="New Folder"
              onClick={() => console.log('New folder clicked')}
            />
            <XPWindowHeaderNavItem
              icon="/assets/arrow.webp"
              label="Properties"
              onClick={() => console.log('Properties clicked')}
            />
            <XPWindowHeaderNavItem
              icon="/assets/arrow.webp"
              label="View"
              showDropdown
              onClick={() => console.log('View clicked')}
            />
          </XPWindowHeader>
          <XPWindowBody>
            <div className="p-4">
              <p className="text-gray-700">
                File explorer example with navigation items.
              </p>
            </div>
          </XPWindowBody>
        </XPWindow>
      </div>

      {/* Example 3: Image Viewer */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-black">Image Viewer</h2>
        <XPWindow
          title="Image Viewer"
          icon={
            <XPIcon
              src="/assets/picture_viewer.png"
              alt="Image Viewer"
              className="w-5 h-5"
            />
          }
          id="image-viewer"
          width={600}
          height={400}
        >
          <XPWindowHeader
            icon="/assets/picture_viewer.png"
            address="C:\\Pictures\\vacation.jpg"
          >
            <XPWindowHeaderNavItem
              icon="/assets/arrow.webp"
              label="Previous"
              onClick={() => console.log('Previous image')}
              variant="primary"
            />
            <XPWindowHeaderNavItem
              icon="/assets/arrow.webp"
              label="Next"
              onClick={() => console.log('Next image')}
              variant="primary"
            />
            <XPWindowHeaderNavItem
              icon="/assets/arrow.webp"
              label="Rotate"
              onClick={() => console.log('Rotate image')}
            />
            <XPWindowHeaderNavItem
              icon="/assets/arrow.webp"
              label="Print"
              onClick={() => console.log('Print image')}
            />
          </XPWindowHeader>
          <XPWindowBody>
            <div className="p-4">
              <p className="text-gray-700">
                Image viewer example with media controls.
              </p>
            </div>
          </XPWindowBody>
        </XPWindow>
      </div>

      {/* Example 4: Web Browser */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-white">Web Browser</h2>
        <XPWindow
          title="Web Browser"
          icon={
            <XPIcon
              src="/assets/IE.png"
              alt="Internet Explorer"
              className="w-5 h-5"
            />
          }
          id="web-browser"
          width={600}
          height={400}
        >
          <XPWindowHeader
            icon="/assets/IE.png"
            address="https://www.microsoft.com"
            loading={loading}
          >
            <XPWindowHeaderNavItem
              icon="/assets/arrow.webp"
              label="Home"
              onClick={() => handleNavigate('https://www.microsoft.com')}
              variant="primary"
            />
            <XPWindowHeaderNavItem
              icon="/assets/arrow.webp"
              label="Favorites"
              showDropdown
              onClick={() => console.log('Favorites clicked')}
            />
            <XPWindowHeaderNavItem
              icon="/assets/arrow.webp"
              label="History"
              onClick={() => console.log('History clicked')}
            />
            <XPWindowHeaderNavItem
              icon="/assets/arrow.webp"
              label="Print"
              onClick={() => console.log('Print page')}
            />
          </XPWindowHeader>
          <XPWindowBody>
            <div className="p-4">
              <p className="text-gray-700">
                Web browser example with navigation controls.
              </p>
            </div>
          </XPWindowBody>
        </XPWindow>
      </div>

      {/* Example 5: Media Player */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-white">Media Player</h2>
        <XPWindow
          title="Media Player"
          icon={
            <XPIcon
              src="/assets/WMP.png"
              alt="Windows Media Player"
              className="w-5 h-5"
            />
          }
          id="media-player"
          width={600}
          height={400}
        >
          <XPWindowHeader
            icon="/assets/WMP.png"
            address="C:\\Music\\playlist.wpl"
          >
            <XPWindowHeaderNavItem
              icon="/assets/arrow.webp"
              label="Play"
              onClick={() => console.log('Play')}
              variant="primary"
            />
            <XPWindowHeaderNavItem
              icon="/assets/arrow.webp"
              label="Pause"
              onClick={() => console.log('Pause')}
              disabled
            />
            <XPWindowHeaderNavItem
              icon="/assets/arrow.webp"
              label="Stop"
              onClick={() => console.log('Stop')}
              disabled
            />
            <XPWindowHeaderNavItem
              icon="/assets/arrow.webp"
              label="Volume"
              showDropdown
              onClick={() => console.log('Volume clicked')}
            />
          </XPWindowHeader>
          <XPWindowBody>
            <div className="p-4">
              <p className="text-gray-700">
                Media player example with playback controls.
              </p>
            </div>
          </XPWindowBody>
        </XPWindow>
      </div>

      {/* Example 6: In a Window */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-white">In XP Window</h2>
        <XPWindow
          title="Explorer Demo"
          width={700}
          height={500}
          icon={
            <XPIcon
              src="/assets/arrow.webp"
              alt="Explorer"
              className="w-5 h-5"
            />
          }
          id="explorer-demo"
        >
          <XPWindowHeader icon="/assets/arrow.webp" address="C:\\">
            <XPWindowHeaderNavItem
              icon="/assets/arrow.webp"
              label="Map Network Drive"
              onClick={() => console.log('Map network drive')}
            />
          </XPWindowHeader>
          <XPWindowBody>
            <div className="p-4 bg-white">
              <p className="text-gray-700">
                This is the content area below the XP Explorer header.
              </p>
              <p className="text-gray-600 text-sm mt-2">
                The header is fully composable and can be used in any
                application that needs Windows XP Explorer-style navigation.
              </p>
            </div>
          </XPWindowBody>
        </XPWindow>
      </div>
    </div>
  );
};

export default ExplorerDemo;
