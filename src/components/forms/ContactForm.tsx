import React from 'react';
import { cn } from '@/lib/utils';
import { type ContactConfig } from '@/lib/api/types/portfolio';
import { Spinner } from '../ui/spinner';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormState {
  loading: boolean;
  alertMessage: string;
  variant: 'success' | 'error';
  show: boolean;
}

interface ContactFormProps {
  formData: FormData;
  formState: FormState;
  contactConfig: ContactConfig | undefined;
  configLoading: boolean;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onSubmit: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  formData,
  formState,
  contactConfig,
  configLoading,
  setFormData,
  onSubmit,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="p-6">
      {configLoading ? (
        <div className="flex items-center justify-center py-12">
          <Spinner className="text-brand-primary h-8 w-8" />
        </div>
      ) : (
        <>
          <div className="text-base md:text-4xl font-bold text-gray-800 mb-6">
            Get In Touch
          </div>

          {contactConfig?.description && (
            <p className="text-base md:text-2xl text-gray-600 mb-6">
              {contactConfig.description}
            </p>
          )}

          {/* Alert Message */}
          {formState.show && (
            <div
              className={cn(
                'mb-6 p-4 rounded border',
                formState.variant === 'success'
                  ? 'bg-green-50 border-green-200 text-green-800'
                  : 'bg-red-50 border-red-200 text-red-800'
              )}
            >
              {formState.alertMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-2xl!important font-medium text-gray-700 mb-2"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={formState.loading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={formState.loading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                disabled={formState.loading}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed resize-vertical"
                placeholder="Tell me about your project or just say hello..."
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={
                  formState.loading ||
                  !formData.name ||
                  !formData.email ||
                  !formData.message
                }
                className={cn(
                  'px-6 py-2 rounded-md font-medium transition-colors duration-200 hover:text-black h-8 w-35',
                  formState.loading ||
                    !formData.name ||
                    !formData.email ||
                    !formData.message
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                )}
              >
                {formState.loading ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>

          {/* Contact Information */}
          {contactConfig && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="text-base font-semibold text-gray-800 mb-4">
                Contact Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <strong className="text-gray-700">Email:</strong>
                  <span className="ml-2 text-gray-600">
                    {contactConfig.YOUR_EMAIL}
                  </span>
                </div>
                {contactConfig.YOUR_FONE && (
                  <div>
                    <strong className="text-gray-700">Phone:</strong>
                    <span className="ml-2 text-gray-600">
                      {contactConfig.YOUR_FONE}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ContactForm;
