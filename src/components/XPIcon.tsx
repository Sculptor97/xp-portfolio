import React from 'react';

interface XPIconProps {
  src: string;
  alt: string;
  className?: string;
  isDisabled?: boolean;
  onClick?: () => void;
}

const XPIcon: React.FC<XPIconProps> = ({
  src,
  alt,
  className = '',
  isDisabled = false,
  onClick,
}) => {
  return (
    <div
      className={`w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-blue-600/40 hover:border-2 hover:border-dotted hover:border-white/50 transition-all duration-100 ${
        isDisabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
      onClick={!isDisabled ? onClick : undefined}
    >
      <img src={src} alt={alt} className="w-full h-full object-contain" />
    </div>
  );
};

export default XPIcon;
