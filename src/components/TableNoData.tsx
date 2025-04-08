import React from 'react';
import { UserGroupIcon } from './Icons';
import Button from './Button';

interface TableNoDataProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  actionPath?: string;
}

const TableNoData: React.FC<TableNoDataProps> = ({
  title = 'No data available',
  message = 'There are no items to display at this time.',
  icon = <UserGroupIcon size={64} className="mx-auto text-gray-400" />,
  actionLabel,
  onAction,
  actionPath
}) => {
  return (
    <div className="text-center py-16 px-4 bg-white rounded-lg shadow-sm">
      {icon}
      <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-gray-500">{message}</p>
      
      {(actionLabel && (onAction || actionPath)) && (
        <div className="mt-6">
          {actionPath ? (
            <Button 
              variant="primary"
              onClick={() => window.location.href = actionPath}
            >
              {actionLabel}
            </Button>
          ) : (
            <Button 
              variant="primary"
              onClick={onAction}
            >
              {actionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default TableNoData;
