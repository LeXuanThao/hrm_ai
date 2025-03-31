import React, { useState } from 'react';

interface DepartmentFormProps {
  id?: number;
  name?: string;
  establishedDate?: string;
  parentDepartment?: string;
  onSave: (department: { id?: number; name: string; establishedDate: string; parentDepartment?: string }) => void;
}

const EditDepartmentForm: React.FC<DepartmentFormProps> = ({ id, name, establishedDate, parentDepartment, onSave }) => {
  const [departmentName, setDepartmentName] = useState(name || '');
  const [departmentEstablishedDate, setDepartmentEstablishedDate] = useState(establishedDate || '');
  const [departmentParent, setDepartmentParent] = useState(parentDepartment || '');

  const handleSave = () => {
    onSave({
      id,
      name: departmentName,
      establishedDate: departmentEstablishedDate,
      parentDepartment: departmentParent,
    });
  };

  return (
    <div className="edit-department-form">
      <h1>{id ? 'Edit Department' : 'Create Department'}</h1>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="establishedDate">Established Date:</label>
          <input
            type="date"
            id="establishedDate"
            value={departmentEstablishedDate}
            onChange={(e) => setDepartmentEstablishedDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="parentDepartment">Parent Department:</label>
          <input
            type="text"
            id="parentDepartment"
            value={departmentParent}
            onChange={(e) => setDepartmentParent(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
  );
};

export default EditDepartmentForm;
