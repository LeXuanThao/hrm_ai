import React, { useState } from 'react';

interface PositionFormProps {
  id?: number;
  name?: string;
  department?: string;
  onSave: (position: { id?: number; name: string; department?: string }) => void;
}

const EditPositionForm: React.FC<PositionFormProps> = ({ id, name, department, onSave }) => {
  const [positionName, setPositionName] = useState(name || '');
  const [positionDepartment, setPositionDepartment] = useState(department || '');

  const handleSave = () => {
    onSave({
      id,
      name: positionName,
      department: positionDepartment,
    });
  };

  return (
    <div className="edit-position-form">
      <h1>{id ? 'Edit Position' : 'Create Position'}</h1>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={positionName}
            onChange={(e) => setPositionName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="department">Department:</label>
          <input
            type="text"
            id="department"
            value={positionDepartment}
            onChange={(e) => setPositionDepartment(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
  );
};

export default EditPositionForm;
