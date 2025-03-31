import React from 'react';

interface DepartmentDetailProps {
  id: number;
  name: string;
  establishedDate: string;
  parentDepartment?: string;
}

const DepartmentDetail: React.FC<DepartmentDetailProps> = ({ id, name, establishedDate, parentDepartment }) => {
  return (
    <div className="department-detail">
      <h1>Department Detail</h1>
      <p><strong>ID:</strong> {id}</p>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Established Date:</strong> {establishedDate}</p>
      {parentDepartment && <p><strong>Parent Department:</strong> {parentDepartment}</p>}
    </div>
  );
};

export default DepartmentDetail;
