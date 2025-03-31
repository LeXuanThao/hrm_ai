import React from 'react';

const EmployeeDetail: React.FC = () => {
  const employee = {
    id: 1,
    fullName: 'John Doe',
    gender: 'Male',
    department: 'Engineering',
    position: 'Software Engineer',
    joinDate: '2021-01-15',
  };

  return (
    <div>
      <h1>Employee Detail</h1>
      <p><strong>ID:</strong> {employee.id}</p>
      <p><strong>Full Name:</strong> {employee.fullName}</p>
      <p><strong>Gender:</strong> {employee.gender}</p>
      <p><strong>Department:</strong> {employee.department}</p>
      <p><strong>Position:</strong> {employee.position}</p>
      <p><strong>Join Date:</strong> {new Date(employee.joinDate).toLocaleDateString()}</p>
    </div>
  );
};

export default EmployeeDetail;
