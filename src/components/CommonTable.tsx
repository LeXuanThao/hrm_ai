import React from 'react';

interface Column {
  header: string;
  accessor: string;
}

interface CommonTableProps {
  data: any[];
  columns: Column[];
}

const CommonTable: React.FC<CommonTableProps> = ({ data, columns }) => {
  return (
    <table className="common-table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.accessor}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column) => (
              <td key={column.accessor}>{row[column.accessor]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CommonTable;
