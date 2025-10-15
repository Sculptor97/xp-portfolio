import React from 'react';
import type { Service } from '@/lib/api/types/portfolio';

interface ServicesSectionProps {
  services: Service[];
  isLoading?: boolean;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <section className="mb-8">
        <div className="h-8 bg-gray-300 rounded animate-pulse mb-4"></div>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="space-y-2">
              <div className="h-5 bg-gray-200 rounded animate-pulse w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (services.length === 0) {
    return null;
  }

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Services</h2>
      <div className="space-y-4">
        {services.map((service, index) => (
          <div key={index} className="border-l-4 border-gray-800 pl-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {service.title}
            </h3>
            <p className="text-gray-600 text-xl leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
