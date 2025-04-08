import React from 'react';

interface BadgeProps {
  status: string;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ status, className = '' }) => {
  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'on-leave':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const displayText = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  
  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(status)} ${className}`}>
      {displayText}
    </span>
  );
};

export default Badge;
