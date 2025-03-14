
import React from 'react';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  isOnline?: boolean;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt, 
  size = 'md', 
  isOnline, 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`relative ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`${sizeClasses[size]} rounded-full object-cover transition-all duration-500 ease-out
        shadow-md ring-2 ring-white/20`}
        loading="lazy"
        onLoad={(e) => {
          const target = e.target as HTMLImageElement;
          target.classList.add('animate-fade-in');
        }}
      />
      {isOnline !== undefined && (
        <div className={`absolute bottom-0 right-0 rounded-full ${
          isOnline 
            ? 'bg-chat-secondary' 
            : 'bg-chat-gray'
        } ${size === 'sm' ? 'w-2 h-2' : 'w-3 h-3'} ${
          isOnline ? 'pulse-ring' : ''
        }`} />
      )}
    </div>
  );
};

export default Avatar;