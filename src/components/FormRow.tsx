import React from 'react';

interface FormRowProps {
  label?: string;
  htmlFor?: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

const FormRow: React.FC<FormRowProps> = ({
  label,
  htmlFor,
  required = false,
  helperText,
  error,
  children,
  className = '',
}) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 items-start ${className}`}>
      {label && (
        <div>
          <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          {helperText && !error && (
            <p className="mt-1 text-xs text-gray-500">{helperText}</p>
          )}
          {error && (
            <p className="mt-1 text-xs text-red-600">{error}</p>
          )}
        </div>
      )}
      <div className={`${label ? 'sm:col-span-2' : 'sm:col-span-3'}`}>
        {children}
      </div>
    </div>
  );
};

export default FormRow;
