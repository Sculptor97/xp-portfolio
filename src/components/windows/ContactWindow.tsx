import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  XPWindow,
  XPWindowHeader,
  XPWindowHeaderNavItem,
  XPWindowBody,
  XPWindowFooter,
} from '@/components/window';
import XPIcon from '@/components/XPIcon';
import ContactForm from '@/components/forms/ContactForm';
import { useContactConfig } from '@/services/portfolioQueries';

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

interface ContactWindowProps {
  id?: string;
  title?: string;
  icon?: string;
  width?: number;
  height?: number;
}

const ContactWindow: React.FC<ContactWindowProps> = ({
  id = 'contact',
  title = 'Contact Me',
  icon = '/assets/outlook_expresss.webp',
  width = 800,
  height = 600,
}) => {
  const { data: contactConfig, isLoading: configLoading } = useContactConfig();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [formState, setFormState] = useState<FormState>({
    loading: false,
    alertMessage: '',
    variant: 'success',
    show: false,
  });

  const submitForm = () => {
    if (!contactConfig) {
      setFormState({
        loading: false,
        alertMessage: 'Contact configuration not available',
        variant: 'error',
        show: true,
      });
      return;
    }

    setFormState(prev => ({ ...prev, loading: true, show: false }));

    const templateParams = {
      from_name: formData.email,
      user_name: formData.name,
      to_name: contactConfig.YOUR_EMAIL,
      message: formData.message,
    };

    emailjs
      .send(
        contactConfig.YOUR_SERVICE_ID,
        contactConfig.YOUR_TEMPLATE_ID,
        templateParams,
        contactConfig.YOUR_USER_ID
      )
      .then(
        result => {
          console.log(result.text);
          setFormState({
            loading: false,
            alertMessage: 'SUCCESS! Thank you for your message',
            variant: 'success',
            show: true,
          });
          // Clear form on success
          setFormData({
            name: '',
            email: '',
            message: '',
          });
        },
        error => {
          console.log(error.text);
          setFormState({
            loading: false,
            alertMessage: `Failed to send! ${error.text}`,
            variant: 'error',
            show: true,
          });
        }
      );
  };

  const handleNewMessage = () => {
    setFormData({
      name: '',
      email: '',
      message: '',
    });
    setFormState({
      loading: false,
      alertMessage: '',
      variant: 'success',
      show: false,
    });
  };

  const isFormValid = formData.name && formData.email && formData.message;
  const hasFormData = formData.name || formData.email || formData.message;

  return (
    <XPWindow
      title={title}
      icon={<XPIcon src={icon} alt="Contact" className="w-5 h-5" />}
      id={id}
      width={width}
      height={height}
    >
      <XPWindowHeader icon={icon} address={title} loading={configLoading}>
        <XPWindowHeaderNavItem
          icon="/assets/send.webp"
          label="Send Message"
          onClick={submitForm}
          variant="primary"
          disabled={formState.loading || !isFormValid}
        />
        <XPWindowHeaderNavItem
          icon="/assets/new.webp"
          label="New Message"
          onClick={handleNewMessage}
          variant="secondary"
          disabled={formState.loading || !hasFormData}
        />
      </XPWindowHeader>

      <XPWindowBody>
        <ContactForm
          formData={formData}
          formState={formState}
          contactConfig={contactConfig}
          configLoading={configLoading}
          setFormData={setFormData}
          onSubmit={submitForm}
        />
      </XPWindowBody>
      <XPWindowFooter>
        <div className="px-2">Contact Legha-gha</div>
      </XPWindowFooter>
    </XPWindow>
  );
};

export default ContactWindow;
