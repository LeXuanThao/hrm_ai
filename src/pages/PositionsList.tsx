import React from 'react';
import CommonTable from '../components/CommonTable';

const PositionsList: React.FC = () => {
  const positions = [
    {
      id: 1,
      name: 'Software Engineer',
      department: 'Engineering',
    },
    {
      id: 2,
      name: 'Marketing Manager',
      department: 'Marketing',
    },
    {
      id: 3,
      name: 'HR Specialist',
      department: null,
    },
    // Add more position data as needed
  ];

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Department', accessor: 'department' },
  ];

  return (
    <div>
      <h1>Positions List</h1>
      <CommonTable data={positions} columns={columns} />
    </div>
  );
};

export default PositionsList;
