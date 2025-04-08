import React from 'react';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  isLoading?: boolean;
}

interface LinkButtonProps extends Omit<ButtonProps, 'type'> {
  to: string;
}

const getVariantClasses = (variant: ButtonVariant): string => {
  switch (variant) {
    case 'primary':
      return 'bg-blue-500 hover:bg-blue-600 text-white';
    case 'secondary':
      return 'bg-gray-500 hover:bg-gray-600 text-white';
    case 'success':
      return 'bg-green-500 hover:bg-green-600 text-white';
    case 'danger':
      return 'bg-red-500 hover:bg-red-600 text-white';
    case 'warning':
      return 'bg-yellow-500 hover:bg-yellow-600 text-white';
    case 'info':
      return 'bg-indigo-500 hover:bg-indigo-600 text-white';
    case 'light':
      return 'bg-gray-100 hover:bg-gray-200 text-gray-800';
    case 'dark':
      return 'bg-gray-800 hover:bg-gray-900 text-white';
    default:
      return 'bg-blue-500 hover:bg-blue-600 text-white';
  }
};

const getSizeClasses = (size: ButtonSize): string => {
  switch (size) {
    case 'sm':
      return 'px-3 py-1 text-sm';
    case 'md':
      return 'px-4 py-2';
    case 'lg':
      return 'px-6 py-3 text-lg';
    default:
      return 'px-4 py-2';
  }
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  fullWidth,
  isLoading,
  className = '',
  disabled,
  ...restProps
}) => {
  const baseClasses = 'flex items-center justify-center rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';
  const variantClasses = getVariantClasses(variant);
  const sizeClasses = getSizeClasses(size);
  const widthClass = fullWidth ? 'w-full' : '';
  
  const combinedClassName = `${baseClasses} ${variantClasses} ${sizeClasses} ${widthClass} ${className}`;
  
  return (
    <button 
      className={combinedClassName}
      disabled={isLoading || disabled}
      {...restProps}
    >
      {isLoading ? (
        <span className="mr-2">
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      ) : icon && iconPosition === 'left' ? (
        <span className="mr-2 flex items-center">{icon}</span>
      ) : null}
      
      {children}
      
      {!isLoading && icon && iconPosition === 'right' && (
        <span className="ml-2 flex items-center">{icon}</span>
      )}
    </button>
  );
};

export const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  to,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  fullWidth,
  className = '',
  ...restProps
}) => {
  const baseClasses = 'flex items-center justify-center rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';
  const variantClasses = getVariantClasses(variant);
  const sizeClasses = getSizeClasses(size);
  const widthClass = fullWidth ? 'w-full' : '';
  
  const combinedClassName = `${baseClasses} ${variantClasses} ${sizeClasses} ${widthClass} ${className}`;
  
  return (
    <Link 
      to={to}
      className={combinedClassName}
      {...restProps}
    >
      {icon && iconPosition === 'left' && (
        <span className="mr-2 flex items-center">{icon}</span>
      )}
      
      {children}
      
      {icon && iconPosition === 'right' && (
        <span className="ml-2 flex items-center">{icon}</span>
      )}
    </Link>
  );
};

export default Button;
