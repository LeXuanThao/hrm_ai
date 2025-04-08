import React, { forwardRef } from 'react';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
  size?: 'sm' | 'md' | 'lg';
}

const getSizeClasses = (size: InputProps['size']) => {
  switch (size) {
    case 'sm':
      return 'px-2 py-1 text-sm';
    case 'lg':
      return 'px-4 py-3 text-lg';
    case 'md':
    default:
      return 'px-3 py-2 text-sm';
  }
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      fullWidth = true,
      disabled = false,
      leftIcon,
      rightIcon,
      containerClassName = '',
      className = '',
      size = 'md',
      id,
      ...rest
    },
    ref
  ) => {
    const inputId = id || `input-${rest.name || Math.random().toString(36).substring(2, 9)}`;
    const sizeClasses = getSizeClasses(size);

    const baseInputClasses = 
      'border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500';
    
    const stateClasses = error 
      ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
      : disabled 
        ? 'bg-gray-100 cursor-not-allowed text-gray-500'
        : '';
    
    const widthClass = fullWidth ? 'w-full' : '';
    const paddingLeftClass = leftIcon ? 'pl-10' : '';
    const paddingRightClass = rightIcon ? 'pr-10' : '';
    
    const inputClasses = `${baseInputClasses} ${stateClasses} ${sizeClasses} ${widthClass} ${paddingLeftClass} ${paddingRightClass} ${className}`;

    return (
      <div className={`${fullWidth ? 'w-full' : ''} ${containerClassName}`}>
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={inputClasses}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...rest}
          />
          
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>
        
        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-xs text-red-600">
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-1 text-xs text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
