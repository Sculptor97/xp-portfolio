import XPWindow from '@/components/window/XPWindow';
const ContactContent = () => (
  <XPWindow.Body className="p-4" props={{}}>
    <h2 className="text-xl font-bold mb-4">Contact Me</h2>
    <div className="space-y-3">
      <div>
        <strong>Email:</strong> developer@example.com
      </div>
      <div>
        <strong>LinkedIn:</strong> linkedin.com/in/developer
      </div>
      <div>
        <strong>GitHub:</strong> github.com/developer
      </div>
    </div>
  </XPWindow.Body>
);

export default ContactContent;
