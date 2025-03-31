import React from 'react';
import CommonTable from '../components/CommonTable';

const DepartmentsList: React.FC = () => {
  const departments = [
    {
      id: 1,
      name: 'Engineering',
      establishedDate: '2010-05-15',
      parentDepartment: null,
    },
    {
      id: 2,
      name: 'Marketing',
      establishedDate: '2012-08-22',
      parentDepartment: 'Sales',
    },
    // Add more department data as needed
  ];

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Established Date', accessor: 'establishedDate' },
    { header: 'Parent Department', accessor: 'parentDepartment' },
  ];

  return (
    <div>
      <h1>Departments List</h1>
      <CommonTable data={departments} columns={columns} />
    </div>
  );
};

export default DepartmentsList;
