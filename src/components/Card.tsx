import React, { ReactNode } from 'react';

interface CardHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  className?: string;
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ 
  title, 
  subtitle, 
  action, 
  className = '' 
}) => {
  return (
    <div className={`px-6 py-4 ${className}`}>
      <div className="flex justify-between items-start">
        <div>
          {typeof title === 'string' ? (
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          ) : (
            title
          )}
          {subtitle && (
            typeof subtitle === 'string' ? (
              <p className="text-sm text-gray-500">{subtitle}</p>
            ) : (
              subtitle
            )
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
    </div>
  );
};

export const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-3 ${className}`}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-2 bg-gray-100 ${className}`}>
      {children}
    </div>
  );
};

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

export default Card;
