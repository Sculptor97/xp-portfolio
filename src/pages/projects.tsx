const MyProjectsContent = () => (
  <div className="p-4">
    <h2 className="text-xl font-bold mb-4">My Projects</h2>
    <div className="space-y-4">
      <div className="border-b pb-2">
        <h3 className="font-semibold">Windows XP Portfolio</h3>
        <p className="text-sm text-gray-600">
          A nostalgic portfolio website built with React and TypeScript
        </p>
      </div>
      <div className="border-b pb-2">
        <h3 className="font-semibold">E-commerce Site</h3>
        <p className="text-sm text-gray-600">
          Full-stack e-commerce platform with payment integration
        </p>
      </div>
      <div className="border-b pb-2">
        <h3 className="font-semibold">Data Dashboard</h3>
        <p className="text-sm text-gray-600">
          Real-time analytics dashboard with interactive charts
        </p>
      </div>
    </div>
  </div>
);

export default MyProjectsContent;
