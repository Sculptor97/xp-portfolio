import React, { useState } from 'react';
import XPExplorerHeader from '@/components/XPExplorerHeader';
import XPWindow from '@/components/window/XPWindow';
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
        <XPExplorerHeader
          icon="/assets/vscode.webp"
          address={address}
          loading={loading}
        >
          <XPExplorerHeader.NavItem
            icon="/assets/arrow.webp"
            label="Refresh"
            onClick={handleRefresh}
            variant="primary"
          />
          <XPExplorerHeader.NavItem
            icon="/assets/arrow.webp"
            label="New File"
            onClick={() => console.log('New file clicked')}
          />
        </XPExplorerHeader>
      </div>

      {/* Example 2: File Explorer */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-white">File Explorer</h2>
        <XPExplorerHeader icon="/assets/arrow.webp" address="C:\\Documents">
          <XPExplorerHeader.NavItem
            icon="/assets/arrow.webp"
            label="New Folder"
            onClick={() => console.log('New folder clicked')}
          />
          <XPExplorerHeader.NavItem
            icon="/assets/arrow.webp"
            label="Properties"
            onClick={() => console.log('Properties clicked')}
          />
          <XPExplorerHeader.NavItem
            icon="/assets/arrow.webp"
            label="View"
            showDropdown
            onClick={() => console.log('View clicked')}
          />
        </XPExplorerHeader>
      </div>

      {/* Example 3: Image Viewer */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-black">Image Viewer</h2>
        <XPExplorerHeader
          icon="/assets/picture_viewer.png"
          address="C:\\Pictures\\vacation.jpg"
        >
          <XPExplorerHeader.NavItem
            icon="/assets/arrow.webp"
            label="Previous"
            onClick={() => console.log('Previous image')}
            variant="primary"
          />
          <XPExplorerHeader.NavItem
            icon="/assets/arrow.webp"
            label="Next"
            onClick={() => console.log('Next image')}
            variant="primary"
          />
          <XPExplorerHeader.NavItem
            icon="/assets/arrow.webp"
            label="Rotate"
            onClick={() => console.log('Rotate image')}
          />
          <XPExplorerHeader.NavItem
            icon="/assets/arrow.webp"
            label="Print"
            onClick={() => console.log('Print image')}
          />
        </XPExplorerHeader>
      </div>

      {/* Example 4: Web Browser */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-white">Web Browser</h2>
        <XPExplorerHeader
          icon="/assets/IE.png"
          address="https://www.microsoft.com"
          loading={loading}
        >
          <XPExplorerHeader.NavItem
            icon="/assets/arrow.webp"
            label="Home"
            onClick={() => handleNavigate('https://www.microsoft.com')}
            variant="primary"
          />
          <XPExplorerHeader.NavItem
            icon="/assets/arrow.webp"
            label="Favorites"
            showDropdown
            onClick={() => console.log('Favorites clicked')}
          />
          <XPExplorerHeader.NavItem
            icon="/assets/arrow.webp"
            label="History"
            onClick={() => console.log('History clicked')}
          />
          <XPExplorerHeader.NavItem
            icon="/assets/arrow.webp"
            label="Print"
            onClick={() => console.log('Print page')}
          />
        </XPExplorerHeader>
      </div>

      {/* Example 5: Media Player */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-white">Media Player</h2>
        <XPExplorerHeader
          icon="/assets/WMP.png"
          address="C:\\Music\\playlist.wpl"
        >
          <XPExplorerHeader.NavItem
            icon="/assets/arrow.webp"
            label="Play"
            onClick={() => console.log('Play')}
            variant="primary"
          />
          <XPExplorerHeader.NavItem
            icon="/assets/arrow.webp"
            label="Pause"
            onClick={() => console.log('Pause')}
            disabled
          />
          <XPExplorerHeader.NavItem
            icon="/assets/arrow.webp"
            label="Stop"
            onClick={() => console.log('Stop')}
            disabled
          />
          <XPExplorerHeader.NavItem
            icon="/assets/arrow.webp"
            label="Volume"
            showDropdown
            onClick={() => console.log('Volume clicked')}
          />
        </XPExplorerHeader>
      </div>

      {/* Example 6: In a Window */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-white">In XP Window</h2>
        <XPWindow
          title="Explorer Demo"
          width={700}
          icon={
            <XPIcon
              src="/assets/arrow.webp"
              alt="Explorer"
              className="w-5 h-5"
            />
          }
          id="explorer-demo"
        >
          <XPWindow.Body>
            <XPExplorerHeader icon="/assets/arrow.webp" address="C:\\">
              <XPExplorerHeader.NavItem
                icon="/assets/arrow.webp"
                label="Map Network Drive"
                onClick={() => console.log('Map network drive')}
              />
            </XPExplorerHeader>
            <div className="p-4 bg-white">
              <p className="text-gray-700">
                This is the content area below the XP Explorer header.
              </p>
              <p className="text-gray-600 text-sm mt-2">
                The header is fully composable and can be used in any application
                that needs Windows XP Explorer-style navigation.
              </p>
            </div>
          </XPWindow.Body>
        </XPWindow>
      </div>
    </div>
  );
};

export default ExplorerDemo;
