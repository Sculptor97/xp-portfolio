import XPWindow from '@/components/window/XPWindow';

// Define the content for each window
const AboutMeContent = () => (
  <XPWindow.Body className="p-4">
    <h2 className="text-xl font-bold mb-4">About Me</h2>
    <p className="text-gray-700">
      I'm a passionate developer creating cool things for the web! I specialize
      in React, TypeScript, and modern web technologies.
    </p>
    <div className="mt-4">
      <h3 className="font-semibold mb-2">Skills:</h3>
      <ul className="list-disc list-inside text-gray-600">
        <li>React & TypeScript</li>
        <li>Node.js & Express</li>
        <li>Database Design</li>
        <li>UI/UX Design</li>
      </ul>
    </div>
  </XPWindow.Body>
);

export default AboutMeContent;
