import React from 'react';
import CommonTable from '../components/CommonTable';

const EmployeesList: React.FC = () => {
  const employees = [
    {
      id: 1,
      fullName: 'John Doe',
      gender: 'Male',
      department: 'Engineering',
      position: 'Software Engineer',
      joinDate: '2021-01-15',
    },
    {
      id: 2,
      fullName: 'Jane Smith',
      gender: 'Female',
      department: 'Marketing',
      position: 'Marketing Manager',
      joinDate: '2020-03-22',
    },
    // Add more employee data as needed
  ];

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Full Name', accessor: 'fullName' },
    { header: 'Gender', accessor: 'gender' },
    { header: 'Department', accessor: 'department' },
    { header: 'Position', accessor: 'position' },
    { header: 'Join Date', accessor: 'joinDate' },
  ];

  return (
    <div>
      <h1>Employees List</h1>
      <CommonTable data={employees} columns={columns} />
    </div>
  );
};

export default EmployeesList;
