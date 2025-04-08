import React from 'react';
import TableNoData from './TableNoData';

interface Column<T> {
  header: React.ReactNode;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyField: keyof T;
  onRowClick?: (item: T) => void;
  className?: string;
  noDataProps?: React.ComponentProps<typeof TableNoData>;
  isLoading?: boolean;
}

function Table<T>({ 
  columns, 
  data, 
  keyField, 
  onRowClick, 
  className = '', 
  noDataProps,
  isLoading = false
}: TableProps<T>) {
  if (isLoading) {
    return null; // Don't render anything when loading - parent should handle loading state
  }

  if (!data.length) {
    return <TableNoData {...noDataProps} />;
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th 
                key={index} 
                scope="col" 
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.className || ''}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr 
              key={String(item[keyField])} 
              className={`hover:bg-gray-50 ${onRowClick ? 'cursor-pointer' : ''}`}
              onClick={onRowClick ? () => onRowClick(item) : undefined}
            >
              {columns.map((column, index) => (
                <td key={index} className="px-6 py-4 whitespace-nowrap">
                  {typeof column.accessor === 'function' 
                    ? column.accessor(item)
                    : (item[column.accessor] as React.ReactNode)
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
